"use client";

import { useEffect, useState } from "react";

export function useWebGL(): boolean {
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
    setWebglSupported(!!gl);
  }, []);

  return webglSupported;
}