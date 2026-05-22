"use client";

import { useEffect, useRef } from "react";

type SceneSetup = (ctx: {
  THREE: typeof import("three");
  canvas: HTMLCanvasElement;
  renderer: import("three").WebGLRenderer;
  scene: import("three").Scene;
  size: { w: number; h: number };
}) => {
  camera: import("three").Camera;
  update: (t: number, progress: number) => void;
  dispose?: () => void;
};

/** Shared lazy-loaded Three.js scene wrapper used by every line-art diagram. */
export function useThreeScene(setup: SceneSetup) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let stopped = false;
    let cleanup: (() => void) | null = null;

    (async () => {
      const THREE = await import("three");
      if (stopped) return;
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      const scene = new THREE.Scene();

      const measure = () => ({ w: canvas.clientWidth, h: canvas.clientHeight });
      let size = measure();
      renderer.setSize(size.w, size.h, false);

      const built = setup({ THREE, canvas, renderer, scene, size });
      const { camera, update } = built;

      const resize = () => {
        size = measure();
        renderer.setSize(size.w, size.h, false);
        if ((camera as any).isPerspectiveCamera) {
          const c = camera as import("three").PerspectiveCamera;
          c.aspect = size.w / Math.max(size.h, 1);
          c.updateProjectionMatrix();
        }
      };
      window.addEventListener("resize", resize);

      let visible = true;
      const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0.01 });
      io.observe(wrap);

      const computeProgress = () => {
        const r = wrap.getBoundingClientRect();
        const vh = window.innerHeight;
        // 0 when section just enters bottom, 1 when it leaves top
        const p = 1 - (r.bottom) / (vh + r.height);
        return Math.min(1, Math.max(0, p));
      };

      const start = performance.now();
      let raf = 0;
      const tick = () => {
        if (visible && !reduced) {
          const t = (performance.now() - start) / 1000;
          update(t, computeProgress());
          renderer.render(scene, camera);
        }
        raf = requestAnimationFrame(tick);
      };
      if (reduced) {
        update(0, 0);
        renderer.render(scene, camera);
      } else {
        raf = requestAnimationFrame(tick);
      }

      cleanup = () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("resize", resize);
        io.disconnect();
        built.dispose?.();
        scene.traverse((obj: any) => {
          obj.geometry?.dispose?.();
          if (Array.isArray(obj.material)) obj.material.forEach((m: any) => m.dispose?.());
          else obj.material?.dispose?.();
        });
        renderer.dispose();
      };
    })().catch(() => {});

    return () => { stopped = true; cleanup?.(); };
  }, [setup]);

  return { canvasRef, wrapRef };
}
