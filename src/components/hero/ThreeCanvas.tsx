"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import {
  PerspectiveGrid,
  NeuralNetwork,
  FloatingGlyphs,
  HUDElements,
} from "@/components/three/Canvas";

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

/* ——————————————————————————————————————————————
   ThreeCanvas React Component
   —————————————————————————————————————————————— */

interface ThreeCanvasProps {
  className?: string;
  reducedMotion?: boolean;
  isMobile?: boolean;
  onReady?: (scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer) => void;
}

export function ThreeCanvas({
  className = "",
  reducedMotion = false,
  isMobile = false,
  onReady,
}: ThreeCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const elementsRef = useRef<SceneElements | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const timeRef = useRef(0);
  const lastTimeRef = useRef(0);
  const [webglError, setWebglError] = useState<Error | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const resize = useCallback(() => {
    if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
    const { clientWidth, clientHeight } = containerRef.current;
    cameraRef.current.aspect = clientWidth / clientHeight;
    cameraRef.current.updateProjectionMatrix();
    rendererRef.current.setSize(clientWidth, clientHeight);
    rendererRef.current.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }, []);

  const animate = useCallback(() => {
    const now = performance.now();
    const delta = (now - lastTimeRef.current) * 0.001;
    lastTimeRef.current = now;
    timeRef.current = now * 0.001;

    if (!sceneRef.current || !cameraRef.current || !rendererRef.current || !elementsRef.current) return;

    const elements = elementsRef.current;
    elements.grid.update(delta, timeRef.current);
    elements.neuralNetwork.update(delta, timeRef.current);
    elements.floatingGlyphs.update(delta, timeRef.current);
    elements.hud.update(delta, timeRef.current);

    rendererRef.current.render(sceneRef.current, cameraRef.current);
    animationIdRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setIsInitialized(true);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
    if (!gl) {
      setWebglError(new Error("WebGL not supported"));
      setIsInitialized(true);
      return;
    }

    try {
      const scene = new THREE.Scene();
      sceneRef.current = scene;

      const { clientWidth, clientHeight } = container;
      const camera = new THREE.PerspectiveCamera(60, clientWidth / clientHeight, 0.1, 300);
      camera.position.set(0, 0.8, 22);
      camera.lookAt(0, 0, 0);
      cameraRef.current = camera;

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setSize(clientWidth, clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 0.9;
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      container.appendChild(renderer.domElement);
      rendererRef.current = renderer;

      const elements = createSceneElements(reducedMotion, isMobile);
      elementsRef.current = elements;

      scene.add(elements.grid.getMesh());
      scene.add(elements.neuralNetwork.getGroup());
      scene.add(elements.floatingGlyphs.getGroup());
      scene.add(elements.hud.getGroup());

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
      scene.add(ambientLight);

      if (onReady) onReady(scene, camera, renderer);

      lastTimeRef.current = performance.now();
      animationIdRef.current = requestAnimationFrame(animate);

      window.addEventListener("resize", resize);
      setIsInitialized(true);
    } catch (error) {
      setWebglError(error instanceof Error ? error : new Error("Failed to initialize WebGL"));
      setIsInitialized(true);
    }

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      window.removeEventListener("resize", resize);

      if (elementsRef.current) {
        disposeSceneElements(elementsRef.current);
        elementsRef.current = null;
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
        rendererRef.current.domElement.remove();
        rendererRef.current = null;
      }
      sceneRef.current = null;
      cameraRef.current = null;
    };
  }, [reducedMotion, isMobile, animate, onReady, resize]);

  if (webglError || reducedMotion) {
    return (
      <div
        ref={containerRef}
        className={`${className} canvas-fallback`}
        style={{ width: "100%", height: "100%" }}
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className={`${className} canvas-container`}
      style={{ width: "100%", height: "100%" }}
      aria-hidden="true"
    />
  );
}

/* ——————————————————————————————————————————————
   Fallback Hero Visual (Static SVG/CSS)
   —————————————————————————————————————————————— */

export function HeroFallbackVisual() {
  return (
    <div className="hero-fallback-visual" aria-hidden="true">
      <div className="fallback-grid" />
      <div className="fallback-neural" />
   </div>
  );
}