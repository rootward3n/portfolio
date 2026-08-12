"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { HeroFallbackVisual } from "./ThreeCanvas";

const ThreeCanvas = dynamic(() => import("./ThreeCanvas").then((mod) => mod.ThreeCanvas), {
  ssr: false,
  loading: () => <HeroFallbackVisual />,
});

interface HeroVisualProps {
  reducedMotion: boolean;
  isMobile: boolean;
}

export function HeroVisual({ reducedMotion, isMobile }: HeroVisualProps) {
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    if (reducedMotion) {
      setWebglSupported(false);
      return;
    }
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
    setWebglSupported(!!gl);
  }, [reducedMotion]);

  return (
    <div className="hero-visual" aria-hidden="true">
      {webglSupported && !reducedMotion ? (
        <ThreeCanvas reducedMotion={reducedMotion} isMobile={isMobile} />
      ) : (
        <HeroFallbackVisual />
      )}
      <div className="hero-overlay" />
    </div>
  );
}