import * as THREE from "three";

/* ——————————————————————————————————————————————
   COLOR PALETTE (matches CSS variables)
   —————————————————————————————————————————————— */
export const THREE_COLORS = {
  primary: 0xa3ff00,
  primaryDim: 0x7fcc00,
  secondary: 0x22cc44,
  tertiary: 0x00d4aa,
  tertiaryDim: 0x00a888,
  warning: 0xffd60a,
  bgPrimary: 0x0a0a0a,
  bgElevated: 0x141414,
  fgPrimary: 0xffffff,
  fgMuted: 0x6b6b6b,
  borderSubtle: 0xa3ff00,
  borderDefault: 0xa3ff00,
  borderEmphasis: 0xa3ff00,
};

/* ——————————————————————————————————————————————
   MATERIAL FACTORIES
   —————————————————————————————————————————————— */
export function createLineMaterial(
  color: number = THREE_COLORS.primary,
  opacity: number = 0.4,
  linewidth: number = 1
): THREE.LineBasicMaterial {
  return new THREE.LineBasicMaterial({
    color,
    transparent: true,
    opacity,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    linewidth,
  });
}

export function createGlowMaterial(
  color: number = THREE_COLORS.primary,
  opacity: number = 0.15
): THREE.MeshBasicMaterial {
  return new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
}

export function createParticleMaterial(
  color: number = THREE_COLORS.primary,
  size: number = 1.5,
  opacity: number = 0.6
): THREE.PointsMaterial {
  return new THREE.PointsMaterial({
    color,
    size,
    transparent: true,
    opacity,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    sizeAttenuation: true,
  });
}

export function createMeshMaterial(
  color: number = THREE_COLORS.primary,
  wireframe: boolean = true,
  opacity: number = 0.25
): THREE.MeshBasicMaterial {
  return new THREE.MeshBasicMaterial({
    color,
    wireframe,
    transparent: true,
    opacity,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
}

/* ——————————————————————————————————————————————
   SHADERS
   —————————————————————————————————————————————— */

// Grid floor shader with subtle animation
export const gridFloorShader = {
  uniforms: {
    uTime: { value: 0 },
    uGridSize: { value: 60 },
    uLineWidth: { value: 0.02 },
    uPrimaryColor: { value: new THREE.Color(THREE_COLORS.primary) },
    uSecondaryColor: { value: new THREE.Color(THREE_COLORS.secondary) },
    uOpacity: { value: 0.2 },
  },
  vertexShader: `
    varying vec3 vWorldPosition;
    void main() {
      vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform float uGridSize;
    uniform float uLineWidth;
    uniform vec3 uPrimaryColor;
    uniform vec3 uSecondaryColor;
    uniform float uOpacity;
    varying vec3 vWorldPosition;
    void main() {
      vec3 pos = vWorldPosition;
      float grid = max(
        abs(mod(pos.x + uLineWidth * 0.5, uGridSize) - uLineWidth * 0.5),
        abs(mod(pos.z + uLineWidth * 0.5, uGridSize) - uLineWidth * 0.5)
      );
      float line = 1.0 - smoothstep(0.0, uLineWidth, grid);
      
      // Subtle pulse animation
      float pulse = 0.5 + 0.5 * sin(uTime * 0.5 + pos.x * 0.01 + pos.z * 0.01);
      
      vec3 color = mix(uSecondaryColor, uPrimaryColor, pulse * 0.5 + 0.3);
      float alpha = line * uOpacity * pulse;
      
      gl_FragColor = vec4(color, alpha);
    }
  `,
};

// Neural network connection shader
export const neuralConnectionShader = {
  uniforms: {
    uTime: { value: 0 },
    uPrimaryColor: { value: new THREE.Color(THREE_COLORS.primary) },
    uSecondaryColor: { value: new THREE.Color(THREE_COLORS.secondary) },
    uSpeed: { value: 1.5 },
  },
  vertexShader: `
    attribute float aProgress;
    varying float vProgress;
    void main() {
      vProgress = aProgress;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform vec3 uPrimaryColor;
    uniform vec3 uSecondaryColor;
    uniform float uSpeed;
    varying float vProgress;
    void main() {
      float flow = fract(vProgress + uTime * uSpeed);
      float intensity = smoothstep(0.0, 0.1, flow) * (1.0 - smoothstep(0.9, 1.0, flow));
      vec3 color = mix(uPrimaryColor, uSecondaryColor, flow);
      gl_FragColor = vec4(color, intensity * 0.8);
    }
  `,
};

// Particle shader with glow
export const particleShader = {
  uniforms: {
    uTime: { value: 0 },
    uPrimaryColor: { value: new THREE.Color(THREE_COLORS.primary) },
    uSecondaryColor: { value: new THREE.Color(THREE_COLORS.secondary) },
    uPixelRatio: { value: 1 },
  },
  vertexShader: `
    attribute float aSize;
    attribute float aPhase;
    attribute vec3 aColor;
    varying float vAlpha;
    varying vec3 vColor;
    uniform float uTime;
    uniform float uPixelRatio;
    void main() {
      vec3 pos = position;
      // Subtle floating motion
      pos.y += sin(uTime * 0.5 + aPhase) * 0.5;
      pos.x += cos(uTime * 0.3 + aPhase) * 0.3;
      pos.z += sin(uTime * 0.4 + aPhase) * 0.3;
      
      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      gl_PointSize = aSize * uPixelRatio * (300.0 / -mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
      
      vAlpha = 0.4 + 0.6 * sin(uTime * 2.0 + aPhase);
      vColor = aColor;
    }
  `,
  fragmentShader: `
    varying float vAlpha;
    varying vec3 vColor;
    void main() {
      float dist = length(gl_PointCoord - 0.5);
      float alpha = smoothstep(0.5, 0.0, dist) * vAlpha;
      if (alpha < 0.01) discard;
      gl_FragColor = vec4(vColor, alpha);
    }
  `,
};

/* ——————————————————————————————————————————————
   GEOMETRY HELPERS
   —————————————————————————————————————————————— */

export function createPlaneGeometry(width: number = 100, height: number = 100): THREE.PlaneGeometry {
  return new THREE.PlaneGeometry(width, height, 1, 1);
}

/* ——————————————————————————————————————————————
   UTILITY FUNCTIONS
   —————————————————————————————————————————————— */

export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function mapRange(value: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
  return outMin + ((value - inMin) / (inMax - inMin)) * (outMax - outMin);
}

export function randomInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function randomVector3(
  xRange: [number, number],
  yRange: [number, number],
  zRange: [number, number]
): THREE.Vector3 {
  return new THREE.Vector3(
    randomInRange(xRange[0], xRange[1]),
    randomInRange(yRange[0], yRange[1]),
    randomInRange(zRange[0], zRange[1])
  );
}

/* ——————————————————————————————————————————————
   POST-PROCESSING HELPERS (for future use)
   —————————————————————————————————————————————— */

export const bloomParams = {
  strength: 1.2,
  radius: 0.4,
  threshold: 0.85,
};

export const chromaticAberrationShader = {
  uniforms: {
    tDiffuse: { value: null },
    uTime: { value: 0 },
    uIntensity: { value: 0.0015 },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float uTime;
    uniform float uIntensity;
    varying vec2 vUv;
    void main() {
      vec2 dir = vUv - vec2(0.5);
      float d = length(dir);
      float offset = uIntensity * d;
      float flicker = 1.0 + 0.015 * sin(uTime * 25.0) * sin(uTime * 6.7);
      vec4 cr = texture2D(tDiffuse, vUv + dir * offset);
      vec4 cg = texture2D(tDiffuse, vUv);
      vec4 cb = texture2D(tDiffuse, vUv - dir * offset * 0.5);
      gl_FragColor = vec4(cr.r, cg.g * 1.03, cb.b * 0.7, 1.0) * flicker;
      gl_FragColor.rgb = mix(gl_FragColor.rgb, gl_FragColor.rgb * vec3(1.1, 0.9, 0.6), 0.2);
    }
  `,
};