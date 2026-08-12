import * as THREE from "three";
import {
  createLineMaterial,
  THREE_COLORS,
  gridFloorShader,
  particleShader,
  neuralConnectionShader,
  lerp,
  randomVector3,
  randomInRange,
  clamp,
} from "@/lib/three-utils";

/* ——————————————————————————————————————————————
   PERSPECTIVE GRID (Cyber Floor)
   —————————————————————————————————————————————— */

export class PerspectiveGrid {
  private mesh: THREE.Mesh;
  private time: number = 0;
  private enabled: boolean = true;

  constructor() {
    const geometry = new THREE.PlaneGeometry(300, 300, 1, 1);
    const material = new THREE.ShaderMaterial({
      ...gridFloorShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
    });
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.rotation.x = -Math.PI / 2;
    this.mesh.position.y = -2;
    this.mesh.renderOrder = -1;
  }

  getMesh(): THREE.Mesh {
    return this.mesh;
  }

  update(delta: number, time: number): void {
    if (!this.enabled) return;
    this.time = time;
    (this.mesh.material as THREE.ShaderMaterial).uniforms.uTime.value = time;
  }

  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
    this.mesh.visible = enabled;
  }

  dispose(): void {
    this.mesh.geometry.dispose();
    (this.mesh.material as THREE.Material).dispose();
  }
}

/* ——————————————————————————————————————————————
   NEURAL NETWORK (Nodes + Connections)
   —————————————————————————————————————————————— */

interface NeuralNode {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  target: THREE.Vector3;
  size: number;
  color: THREE.Color;
  phase: number;
}

interface NeuralConnection {
  start: number;
  end: number;
  progress: number;
  speed: number;
  active: boolean;
}

export class NeuralNetwork {
  private nodes: NeuralNode[] = [];
  private connections: NeuralConnection[] = [];
  private nodeMesh: THREE.Points | null = null;
  private connectionLines: THREE.LineSegments | null = null;
  private nodeGeometry: THREE.BufferGeometry | null = null;
  private connectionGeometry: THREE.BufferGeometry | null = null;
  private time: number = 0;
  private enabled: boolean = true;
  private nodeCount: number = 120;
  private connectionCount: number = 180;
  private bounds: THREE.Box3 = new THREE.Box3(
    new THREE.Vector3(-16, -8, -16),
    new THREE.Vector3(16, 8, 16)
  );

  constructor(nodeCount: number = 120) {
    this.nodeCount = nodeCount;
    this.connectionCount = Math.min(180, nodeCount * 1.5);
    this.initialize();
  }

  private initialize(): void {
    for (let i = 0; i < this.nodeCount; i++) {
      const position = randomVector3(
        [this.bounds.min.x, this.bounds.max.x],
        [this.bounds.min.y, this.bounds.max.y],
        [this.bounds.min.z, this.bounds.max.z]
      );

      this.nodes.push({
        position: position.clone(),
        velocity: new THREE.Vector3(),
        target: position.clone(),
        size: randomInRange(0.5, 2.5),
        color: new THREE.Color(
          Math.random() > 0.6 ? THREE_COLORS.secondary : THREE_COLORS.primary
        ),
        phase: randomInRange(0, Math.PI * 2),
      });
    }

    const maxDistance = 8;
    for (let i = 0; i < this.nodeCount; i++) {
      const distances: { index: number; dist: number }[] = [];
      for (let j = 0; j < this.nodeCount; j++) {
        if (i === j) continue;
        const dist = this.nodes[i].position.distanceTo(this.nodes[j].position);
        if (dist < maxDistance) {
          distances.push({ index: j, dist });
        }
      }
      distances.sort((a, b) => a.dist - b.dist);

      const connectionsToMake = Math.min(3, distances.length);
      for (let k = 0; k < connectionsToMake; k++) {
        if (this.connections.length >= this.connectionCount) break;
        const targetIndex = distances[k].index;
        const exists = this.connections.some(
          (c) => (c.start === i && c.end === targetIndex) || (c.start === targetIndex && c.end === i)
        );
        if (!exists) {
          this.connections.push({
            start: i,
            end: targetIndex,
            progress: randomInRange(0, 1),
            speed: randomInRange(0.3, 1.2),
            active: Math.random() > 0.3,
          });
        }
      }
    }

    while (this.connections.length < this.connectionCount) {
      const start = Math.floor(randomInRange(0, this.nodeCount));
      const end = Math.floor(randomInRange(0, this.nodeCount));
      if (start === end) continue;
      const exists = this.connections.some(
        (c) => (c.start === start && c.end === end) || (c.start === end && c.end === start)
      );
      if (!exists) {
        this.connections.push({
          start,
          end,
          progress: randomInRange(0, 1),
          speed: randomInRange(0.2, 0.8),
          active: Math.random() > 0.5,
        });
      }
    }

    this.createMeshes();
  }

  private createMeshes(): void {
    this.nodeGeometry = new THREE.BufferGeometry();
    const nodePositions = new Float32Array(this.nodeCount * 3);
    const nodeSizes = new Float32Array(this.nodeCount);
    const nodeColors = new Float32Array(this.nodeCount * 3);
    const nodePhases = new Float32Array(this.nodeCount);

    this.nodes.forEach((node, i) => {
      nodePositions[i * 3] = node.position.x;
      nodePositions[i * 3 + 1] = node.position.y;
      nodePositions[i * 3 + 2] = node.position.z;
      nodeSizes[i] = node.size;
      nodeColors[i * 3] = node.color.r;
      nodeColors[i * 3 + 1] = node.color.g;
      nodeColors[i * 3 + 2] = node.color.b;
      nodePhases[i] = node.phase;
    });

    this.nodeGeometry.setAttribute("position", new THREE.BufferAttribute(nodePositions, 3));
    this.nodeGeometry.setAttribute("aSize", new THREE.BufferAttribute(nodeSizes, 1));
    this.nodeGeometry.setAttribute("aColor", new THREE.BufferAttribute(nodeColors, 3));
    this.nodeGeometry.setAttribute("aPhase", new THREE.BufferAttribute(nodePhases, 1));

    const nodeMaterial = new THREE.ShaderMaterial({
      ...particleShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    this.nodeMesh = new THREE.Points(this.nodeGeometry, nodeMaterial);
    this.nodeMesh.renderOrder = 1;

    this.connectionGeometry = new THREE.BufferGeometry();
    const connectionPositions = new Float32Array(this.connectionCount * 6);
    const connectionProgress = new Float32Array(this.connectionCount * 2);

    this.connections.forEach((conn, i) => {
      const startNode = this.nodes[conn.start];
      const endNode = this.nodes[conn.end];
      connectionPositions[i * 6] = startNode.position.x;
      connectionPositions[i * 6 + 1] = startNode.position.y;
      connectionPositions[i * 6 + 2] = startNode.position.z;
      connectionPositions[i * 6 + 3] = endNode.position.x;
      connectionPositions[i * 6 + 4] = endNode.position.y;
      connectionPositions[i * 6 + 5] = endNode.position.z;
      connectionProgress[i * 2] = conn.progress;
      connectionProgress[i * 2 + 1] = conn.progress;
    });

    this.connectionGeometry.setAttribute("position", new THREE.BufferAttribute(connectionPositions, 3));
    this.connectionGeometry.setAttribute("aProgress", new THREE.BufferAttribute(connectionProgress, 1));

    const connectionMaterial = new THREE.ShaderMaterial({
      ...neuralConnectionShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    this.connectionLines = new THREE.LineSegments(this.connectionGeometry, connectionMaterial);
    this.connectionLines.renderOrder = 0;
  }

  getGroup(): THREE.Group {
    const group = new THREE.Group();
    if (this.connectionLines) group.add(this.connectionLines);
    if (this.nodeMesh) group.add(this.nodeMesh);
    return group;
  }

  update(delta: number, time: number): void {
    if (!this.enabled) return;
    this.time = time;

    if (this.nodeMesh && this.nodeGeometry) {
      const positions = this.nodeGeometry.attributes.position.array as Float32Array;
      this.nodes.forEach((node, i) => {
        node.velocity.lerp(node.target.clone().sub(node.position).multiplyScalar(0.001), 0.05);
        node.position.add(node.velocity);

        if (node.position.x < this.bounds.min.x || node.position.x > this.bounds.max.x) {
          node.velocity.x *= -1;
          node.target.x = clamp(node.position.x, this.bounds.min.x, this.bounds.max.x);
        }
        if (node.position.y < this.bounds.min.y || node.position.y > this.bounds.max.y) {
          node.velocity.y *= -1;
          node.target.y = clamp(node.position.y, this.bounds.min.y, this.bounds.max.y);
        }
        if (node.position.z < this.bounds.min.z || node.position.z > this.bounds.max.z) {
          node.velocity.z *= -1;
          node.target.z = clamp(node.position.z, this.bounds.min.z, this.bounds.max.z);
        }

        if (Math.random() < 0.001) {
          node.target.set(
            randomInRange(this.bounds.min.x, this.bounds.max.x),
            randomInRange(this.bounds.min.y, this.bounds.max.y),
            randomInRange(this.bounds.min.z, this.bounds.max.z)
          );
        }

        positions[i * 3] = node.position.x;
        positions[i * 3 + 1] = node.position.y;
        positions[i * 3 + 2] = node.position.z;
      });
      this.nodeGeometry.attributes.position.needsUpdate = true;
    }

    if (this.connectionLines && this.connectionGeometry) {
      const progressAttr = this.connectionGeometry.attributes.aProgress as THREE.BufferAttribute;
      const progressArray = progressAttr.array as Float32Array;
      this.connections.forEach((conn, i) => {
        if (conn.active) {
          conn.progress += conn.speed * delta * 0.5;
          if (conn.progress > 1) conn.progress = 0;
        }
        progressArray[i * 2] = conn.progress;
        progressArray[i * 2 + 1] = conn.progress;
      });
      progressAttr.needsUpdate = true;

      (this.connectionLines.material as THREE.ShaderMaterial).uniforms.uTime.value = time;
    }

    if (this.nodeMesh) {
      (this.nodeMesh.material as THREE.ShaderMaterial).uniforms.uTime.value = time;
    }
  }

  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
    if (this.nodeMesh) this.nodeMesh.visible = enabled;
    if (this.connectionLines) this.connectionLines.visible = enabled;
  }

  setNodeCount(count: number): void {
    this.nodeCount = count;
    this.dispose();
    this.initialize();
  }

  dispose(): void {
    if (this.nodeGeometry) this.nodeGeometry.dispose();
    if (this.nodeMesh) {
      (this.nodeMesh.material as THREE.Material).dispose();
      this.nodeMesh = null;
    }
    if (this.connectionGeometry) this.connectionGeometry.dispose();
    if (this.connectionLines) {
      (this.connectionLines.material as THREE.Material).dispose();
      this.connectionLines = null;
    }
    this.nodes = [];
    this.connections = [];
  }
}

/* ——————————————————————————————————————————————
   HUD ELEMENTS (Corner Brackets, Scan Lines)
   —————————————————————————————————————————————— */

export class HUDElements {
  private group: THREE.Group;
  private corners: THREE.LineSegments[] = [];
  private scanLine: THREE.Mesh | null = null;
  private enabled: boolean = true;
  private time: number = 0;

  constructor() {
    this.group = new THREE.Group();
    this.createCorners();
    this.createScanLine();
  }

  private createCorners(): void {
    const size = 6;
    const length = 1.5;
    const positions = [
      { x: -size, y: size, z: -size, rot: [0, 0, 0] },
      { x: size, y: size, z: -size, rot: [0, Math.PI / 2, 0] },
      { x: -size, y: -size, z: -size, rot: [0, -Math.PI / 2, 0] },
      { x: size, y: -size, z: -size, rot: [0, Math.PI, 0] },
    ];

    positions.forEach((pos) => {
      const geometry = new THREE.BufferGeometry();
      const verts = new Float32Array([
        0, 0, 0,
        length, 0, 0,
        0, 0, 0,
        0, -length, 0,
      ]);
      geometry.setAttribute("position", new THREE.BufferAttribute(verts, 3));

      const material = createLineMaterial(THREE_COLORS.primary, 0.6, 2);
      const corner = new THREE.LineSegments(geometry, material);
      corner.position.set(pos.x, pos.y, pos.z);
      corner.rotation.set(pos.rot[0], pos.rot[1], pos.rot[2]);
      this.group.add(corner);
      this.corners.push(corner);
    });
  }

  private createScanLine(): void {
    const geometry = new THREE.PlaneGeometry(16, 0.5);
    const material = new THREE.MeshBasicMaterial({
      color: THREE_COLORS.primary,
      transparent: true,
      opacity: 0.08,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    this.scanLine = new THREE.Mesh(geometry, material);
    this.scanLine.position.z = -5;
    this.group.add(this.scanLine);
  }

  getGroup(): THREE.Group {
    return this.group;
  }

  update(delta: number, time: number): void {
    if (!this.enabled) return;
    this.time = time;

    if (this.scanLine) {
      this.scanLine.position.y = Math.sin(time * 0.8) * 6.5;
      (this.scanLine.material as THREE.MeshBasicMaterial).opacity = 0.04 + 0.04 * Math.sin(time * 2);
    }

    this.corners.forEach((corner, i) => {
      const material = corner.material as THREE.LineBasicMaterial;
      material.opacity = 0.4 + 0.2 * Math.sin(time * 1.5 + i);
    });
  }

  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
    this.group.visible = enabled;
  }

  dispose(): void {
    this.corners.forEach((corner) => {
      corner.geometry.dispose();
      (corner.material as THREE.Material).dispose();
    });
    if (this.scanLine) {
      this.scanLine.geometry.dispose();
      (this.scanLine.material as THREE.Material).dispose();
    }
  }
}

/* ——————————————————————————————————————————————
   FLOATING GLYPHS (Terminal symbols drifting)
   —————————————————————————————————————————————— */

export class FloatingGlyphs {
  private group!: THREE.Group;
  private mesh!: THREE.Points;
  private geometry!: THREE.BufferGeometry;
  private material!: THREE.ShaderMaterial;
  private glyphCount: number = 40;
  private bounds: THREE.Box3 = new THREE.Box3(
    new THREE.Vector3(-12, -6, -12),
    new THREE.Vector3(12, 6, 12)
  );
  private enabled: boolean = true;
  private time: number = 0;

  // Glyph pool: terminal symbols
  private static readonly GLYPHS = "._-&#@+{}[]<>/\\|^~=*%$#@!";

  constructor() {
    this.group = new THREE.Group();
    this.initialize();
  }

  private initialize(): void {
    this.geometry = new THREE.BufferGeometry();

    const positions = new Float32Array(this.glyphCount * 3);
    const scales = new Float32Array(this.glyphCount);
    const rotations = new Float32Array(this.glyphCount);
    const glyphIndices = new Float32Array(this.glyphCount);
    const phases = new Float32Array(this.glyphCount);
    const speeds = new Float32Array(this.glyphCount);
    const opacities = new Float32Array(this.glyphCount);

    for (let i = 0; i < this.glyphCount; i++) {
      // Random position within bounds
      positions[i * 3] = Math.random() * (this.bounds.max.x - this.bounds.min.x) + this.bounds.min.x;
      positions[i * 3 + 1] = Math.random() * (this.bounds.max.y - this.bounds.min.y) + this.bounds.min.y;
      positions[i * 3 + 2] = Math.random() * (this.bounds.max.z - this.bounds.min.z) + this.bounds.min.z;

      // Random scale
      scales[i] = Math.random() * 0.4 + 0.3;

      // Random initial rotation
      rotations[i] = Math.random() * Math.PI * 2;

      // Random glyph index
      glyphIndices[i] = Math.floor(Math.random() * FloatingGlyphs.GLYPHS.length);

      // Random phase for floating animation
      phases[i] = Math.random() * Math.PI * 2;

      // Random vertical speed
      speeds[i] = Math.random() * 0.005 + 0.002;

      // Random base opacity
      opacities[i] = Math.random() * 0.3 + 0.15;
    }

    this.geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    this.geometry.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));
    this.geometry.setAttribute("aRotation", new THREE.BufferAttribute(rotations, 1));
    this.geometry.setAttribute("aGlyphIndex", new THREE.BufferAttribute(glyphIndices, 1));
    this.geometry.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));
    this.geometry.setAttribute("aSpeed", new THREE.BufferAttribute(speeds, 1));
    this.geometry.setAttribute("aOpacity", new THREE.BufferAttribute(opacities, 1));

    this.material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uPrimaryColor: { value: new THREE.Color(THREE_COLORS.primary) },
        uSecondaryColor: { value: new THREE.Color(THREE_COLORS.secondary) },
        uTertiaryColor: { value: new THREE.Color(THREE_COLORS.tertiary) },
        uGlyphTexture: { value: null }, // Would use a texture atlas for actual glyphs
      },
      vertexShader: `
        attribute float aScale;
        attribute float aRotation;
        attribute float aGlyphIndex;
        attribute float aPhase;
        attribute float aSpeed;
        attribute float aOpacity;
        varying float vGlyphIndex;
        varying float vRotation;
        varying float vOpacity;
        uniform float uTime;
        void main() {
          vec3 pos = position;
          // Slow vertical drift with slight horizontal sway
          pos.y += sin(uTime * aSpeed * 100.0 + aPhase) * 0.5;
          pos.x += cos(uTime * aSpeed * 80.0 + aPhase) * 0.3;
          pos.z += sin(uTime * aSpeed * 90.0 + aPhase) * 0.2;
          
          // Boundary wrap
          if (pos.y > 6.0) pos.y = -6.0;
          if (pos.y < -6.0) pos.y = 6.0;
          
          vGlyphIndex = aGlyphIndex;
          vRotation = aRotation + uTime * 0.1;
          vOpacity = aOpacity * (0.5 + 0.5 * sin(uTime * 2.0 + aPhase));
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = aScale * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 uPrimaryColor;
        uniform vec3 uSecondaryColor;
        uniform vec3 uTertiaryColor;
        varying float vGlyphIndex;
        varying float vRotation;
        varying float vOpacity;
        void main() {
          // Simple circle point for now - in production would sample from glyph texture atlas
          vec2 center = gl_PointCoord - 0.5;
          float dist = length(center);
          float alpha = smoothstep(0.5, 0.0, dist) * vOpacity;
          
          if (alpha < 0.01) discard;
          
          // Color based on glyph index (mod 3 for trio)
          float idx = mod(vGlyphIndex, 3.0);
          vec3 color = mix(uPrimaryColor, uSecondaryColor, step(1.0, idx));
          color = mix(color, uTertiaryColor, step(2.0, idx));
          
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    this.mesh = new THREE.Points(this.geometry, this.material);
    this.mesh.renderOrder = 3;
    this.group.add(this.mesh);
  }

  getGroup(): THREE.Group {
    return this.group;
  }

  update(delta: number, time: number): void {
    if (!this.enabled) return;
    this.time = time;
    this.material.uniforms.uTime.value = time;
  }

  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
    this.group.visible = enabled;
  }

  dispose(): void {
    this.geometry.dispose();
    this.material.dispose();
  }
}

/* ——————————————————————————————————————————————
   SCENE MANAGER (Orchestrates all 3D elements)
   —————————————————————————————————————————————— */

export interface SceneElements {
  grid: PerspectiveGrid;
  neuralNetwork: NeuralNetwork;
  floatingGlyphs: FloatingGlyphs;
  hud: HUDElements;
}

export function createSceneElements(reducedMotion: boolean = false, isMobile: boolean = false): SceneElements {
  const neuralCount = isMobile ? 60 : 120;

  return {
    grid: new PerspectiveGrid(),
    neuralNetwork: new NeuralNetwork(neuralCount),
    floatingGlyphs: new FloatingGlyphs(),
    hud: new HUDElements(),
  };
}

export function disposeSceneElements(elements: SceneElements): void {
  elements.grid.dispose();
  elements.neuralNetwork.dispose();
  elements.floatingGlyphs.dispose();
  elements.hud.dispose();
}