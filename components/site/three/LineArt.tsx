"use client";

import { useCallback } from "react";
import { useThreeScene } from "./useThreeScene";

const LINE = 0xb4dcff;
const ACCENT = 0xf4d03f;

/* ───────────────────────── 01 · HeroKnot ───────────────────────── */
export function HeroKnot() {
  const setup = useCallback((ctx: any) => {
    const { THREE, scene, size } = ctx;
    const camera = new THREE.PerspectiveCamera(38, size.w / Math.max(size.h, 1), 0.1, 100);
    camera.position.set(0, 0, 6);

    const knotGeo = new THREE.TorusKnotGeometry(1.6, 0.42, 220, 24, 2, 3);
    const edges = new THREE.EdgesGeometry(knotGeo, 18);
    const mat = new THREE.LineBasicMaterial({ color: LINE, transparent: true, opacity: 0.55 });
    const knot = new THREE.LineSegments(edges, mat);
    scene.add(knot);

    const knot2 = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.TorusKnotGeometry(1.62, 0.05, 200, 8, 2, 3), 1),
      new THREE.LineBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.9 })
    );
    scene.add(knot2);

    return {
      camera,
      update: (t: number, p: number) => {
        knot.rotation.x = t * 0.12;
        knot.rotation.y = t * 0.18;
        knot2.rotation.x = t * 0.12;
        knot2.rotation.y = t * 0.18;
        camera.position.z = 6 - p * 1.2;
      },
    };
  }, []);
  const { canvasRef, wrapRef } = useThreeScene(setup);
  return (
    <div ref={wrapRef} aria-hidden className="three-wrap">
      <canvas ref={canvasRef} />
    </div>
  );
}

/* ───────────────────────── 02 · WireGlobe ───────────────────────── */
export function WireGlobe() {
  const setup = useCallback((ctx: any) => {
    const { THREE, scene, size } = ctx;
    const camera = new THREE.PerspectiveCamera(35, size.w / Math.max(size.h, 1), 0.1, 100);
    camera.position.set(0, 0, 7);

    const group = new THREE.Group();
    scene.add(group);

    const sphere = new THREE.LineSegments(
      new THREE.WireframeGeometry(new THREE.SphereGeometry(2.2, 28, 18)),
      new THREE.LineBasicMaterial({ color: LINE, transparent: true, opacity: 0.18 })
    );
    group.add(sphere);

    // Animated arcs between random surface points
    const arcs: any[] = [];
    const arcMat = new THREE.LineBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.95 });
    const rand = () => {
      const u = Math.random(), v = Math.random();
      const th = 2 * Math.PI * u, ph = Math.acos(2 * v - 1);
      return new THREE.Vector3(
        2.2 * Math.sin(ph) * Math.cos(th),
        2.2 * Math.sin(ph) * Math.sin(th),
        2.2 * Math.cos(ph)
      );
    };
    for (let i = 0; i < 14; i++) {
      const a = rand(), b = rand();
      const mid = a.clone().add(b).multiplyScalar(0.5).setLength(3.4);
      const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
      const pts = curve.getPoints(40);
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const line = new THREE.Line(geo, arcMat.clone());
      (line.material as any).opacity = 0;
      (line as any).userData = { phase: Math.random() * Math.PI * 2, speed: 0.4 + Math.random() * 0.7 };
      group.add(line);
      arcs.push(line);
    }

    return {
      camera,
      update: (t: number) => {
        group.rotation.y = t * 0.05;
        group.rotation.x = Math.sin(t * 0.07) * 0.15;
        arcs.forEach((l) => {
          const u = (Math.sin(t * l.userData.speed + l.userData.phase) + 1) / 2;
          (l.material as any).opacity = u * 0.9;
        });
      },
    };
  }, []);
  const { canvasRef, wrapRef } = useThreeScene(setup);
  return <div ref={wrapRef} aria-hidden className="three-wrap"><canvas ref={canvasRef} /></div>;
}

/* ───────────────────────── 03 · StackedLattice ───────────────────────── */
export function StackedLattice() {
  const setup = useCallback((ctx: any) => {
    const { THREE, scene, size } = ctx;
    const camera = new THREE.PerspectiveCamera(32, size.w / Math.max(size.h, 1), 0.1, 100);
    camera.position.set(3.6, 2.4, 5.2);
    camera.lookAt(0, 0, 0);

    const group = new THREE.Group();
    scene.add(group);
    const planes: any[] = [];
    const colors = [LINE, LINE, ACCENT];
    [-1.4, 0, 1.4].forEach((y, i) => {
      const grid = new THREE.LineSegments(
        new THREE.EdgesGeometry(new THREE.PlaneGeometry(4, 4, 8, 8)),
        new THREE.LineBasicMaterial({ color: colors[i], transparent: true, opacity: i === 2 ? 0.85 : 0.35 })
      );
      grid.rotation.x = -Math.PI / 2;
      grid.position.y = y;
      group.add(grid);
      planes.push(grid);
    });

    return {
      camera,
      update: (t: number, p: number) => {
        group.rotation.y = t * 0.08;
        planes.forEach((pl, i) => {
          pl.position.y = (-1.4 + i * 1.4) + Math.sin(t * 0.5 + i) * 0.08 + p * (i - 1) * 0.4;
        });
      },
    };
  }, []);
  const { canvasRef, wrapRef } = useThreeScene(setup);
  return <div ref={wrapRef} aria-hidden className="three-wrap"><canvas ref={canvasRef} /></div>;
}

/* ───────────────────────── 04 · PodOrbit ───────────────────────── */
export function PodOrbit() {
  const setup = useCallback((ctx: any) => {
    const { THREE, scene, size } = ctx;
    const camera = new THREE.PerspectiveCamera(36, size.w / Math.max(size.h, 1), 0.1, 100);
    camera.position.set(0, 0, 6);

    const core = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(0.7, 0)),
      new THREE.LineBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.95 })
    );
    scene.add(core);

    const nodes: any[] = [];
    const lineMat = new THREE.LineBasicMaterial({ color: LINE, transparent: true, opacity: 0.45 });
    for (let i = 0; i < 5; i++) {
      const node = new THREE.LineSegments(
        new THREE.EdgesGeometry(new THREE.OctahedronGeometry(0.22, 0)),
        new THREE.LineBasicMaterial({ color: LINE, transparent: true, opacity: 0.9 })
      );
      scene.add(node);
      const line = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3()]),
        lineMat.clone()
      );
      scene.add(line);
      nodes.push({ node, line, angle: (i / 5) * Math.PI * 2, tilt: (i - 2) * 0.25 });
    }

    return {
      camera,
      update: (t: number) => {
        core.rotation.y = t * 0.3;
        core.rotation.x = t * 0.2;
        nodes.forEach((n) => {
          const a = n.angle + t * 0.35;
          const r = 2.4;
          const x = Math.cos(a) * r;
          const z = Math.sin(a) * r * 0.6;
          const y = Math.sin(a * 1.3 + n.tilt) * 0.6;
          n.node.position.set(x, y, z);
          n.node.rotation.y = t;
          (n.line.geometry as any).setFromPoints([new THREE.Vector3(0, 0, 0), n.node.position]);
        });
      },
    };
  }, []);
  const { canvasRef, wrapRef } = useThreeScene(setup);
  return <div ref={wrapRef} aria-hidden className="three-wrap"><canvas ref={canvasRef} /></div>;
}

/* ───────────────────────── 05 · CitationGraph ───────────────────────── */
export function CitationGraph() {
  const setup = useCallback((ctx: any) => {
    const { THREE, scene, size } = ctx;
    const camera = new THREE.PerspectiveCamera(40, size.w / Math.max(size.h, 1), 0.1, 100);
    camera.position.set(0, 0, 5.5);

    const N = 26;
    const positions: any[] = [];
    for (let i = 0; i < N; i++) {
      positions.push(new THREE.Vector3((Math.random() - 0.5) * 5.5, (Math.random() - 0.5) * 3.2, (Math.random() - 0.5) * 2.5));
    }
    // central "you" node
    const center = new THREE.Vector3(0, 0, 0);
    positions[0] = center;

    const group = new THREE.Group();
    scene.add(group);

    // node dots
    positions.forEach((p, i) => {
      const dot = new THREE.LineSegments(
        new THREE.EdgesGeometry(new THREE.OctahedronGeometry(i === 0 ? 0.18 : 0.06, 0)),
        new THREE.LineBasicMaterial({ color: i === 0 ? ACCENT : LINE, transparent: true, opacity: i === 0 ? 1 : 0.7 })
      );
      dot.position.copy(p);
      group.add(dot);
    });

    // edges from center to nearest ~8 nodes
    const dists = positions
      .map((p, i) => ({ i, d: p.distanceTo(center) }))
      .filter((x) => x.i !== 0)
      .sort((a, b) => a.d - b.d)
      .slice(0, 12);

    const edges: any[] = [];
    dists.forEach(({ i }, idx) => {
      const geo = new THREE.BufferGeometry().setFromPoints([center, positions[i]]);
      const mat = new THREE.LineBasicMaterial({ color: ACCENT, transparent: true, opacity: 0 });
      const line = new THREE.Line(geo, mat);
      group.add(line);
      edges.push({ line, phase: idx * 0.4 });
    });

    return {
      camera,
      update: (t: number) => {
        group.rotation.y = Math.sin(t * 0.08) * 0.3;
        group.rotation.x = Math.sin(t * 0.05) * 0.12;
        edges.forEach((e) => {
          const u = (Math.sin(t * 0.9 - e.phase) + 1) / 2;
          (e.line.material as any).opacity = Math.pow(u, 2) * 0.95;
        });
      },
    };
  }, []);
  const { canvasRef, wrapRef } = useThreeScene(setup);
  return <div ref={wrapRef} aria-hidden className="three-wrap"><canvas ref={canvasRef} /></div>;
}

/* ───────────────────────── 06 · RingTunnel ───────────────────────── */
export function RingTunnel() {
  const setup = useCallback((ctx: any) => {
    const { THREE, scene, size } = ctx;
    const camera = new THREE.PerspectiveCamera(55, size.w / Math.max(size.h, 1), 0.1, 100);
    camera.position.set(0, 0, 5);

    const rings: any[] = [];
    const COUNT = 26;
    for (let i = 0; i < COUNT; i++) {
      const r = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(
          new Array(64).fill(0).map((_, j) => {
            const a = (j / 64) * Math.PI * 2;
            return new THREE.Vector3(Math.cos(a) * 2.2, Math.sin(a) * 2.2, 0);
          }).concat([new THREE.Vector3(2.2, 0, 0)])
        ),
        new THREE.LineBasicMaterial({ color: i === 0 ? ACCENT : LINE, transparent: true, opacity: 0.6 })
      );
      r.position.z = -i * 1.4;
      scene.add(r);
      rings.push(r);
    }

    return {
      camera,
      update: (t: number, p: number) => {
        rings.forEach((r, i) => {
          let z = (-i * 1.4 + ((t * 1.2) % 1.4) + p * 6) % (COUNT * 1.4);
          if (z > 4) z -= COUNT * 1.4;
          r.position.z = z;
          const fade = 1 - Math.min(1, Math.abs(z) / 18);
          (r.material as any).opacity = fade * (i === 0 ? 1 : 0.55);
          r.rotation.z = t * 0.05 + i * 0.04;
        });
      },
    };
  }, []);
  const { canvasRef, wrapRef } = useThreeScene(setup);
  return <div ref={wrapRef} aria-hidden className="three-wrap"><canvas ref={canvasRef} /></div>;
}

/* ───────────────────────── 07 · GridLoad — energy / charging network ───── */
export function GridLoad() {
  const setup = useCallback((ctx: any) => {
    const { THREE, scene, size } = ctx;
    const camera = new THREE.PerspectiveCamera(38, size.w / Math.max(size.h, 1), 0.1, 100);
    camera.position.set(0, 0.5, 6.2);
    camera.lookAt(0, 0, 0);

    const group = new THREE.Group();
    scene.add(group);

    // grid of charging nodes
    const COLS = 9, ROWS = 5;
    const dots: any[] = [];
    for (let i = 0; i < COLS; i++) {
      for (let j = 0; j < ROWS; j++) {
        const x = (i - (COLS - 1) / 2) * 0.62;
        const y = (j - (ROWS - 1) / 2) * 0.58;
        const isHot = (i + j) % 7 === 0;
        const dot = new THREE.LineSegments(
          new THREE.EdgesGeometry(new THREE.OctahedronGeometry(isHot ? 0.13 : 0.06, 0)),
          new THREE.LineBasicMaterial({ color: isHot ? ACCENT : LINE, transparent: true, opacity: isHot ? 0.95 : 0.4 })
        );
        dot.position.set(x, y, 0);
        group.add(dot);
        dots.push({ dot, base: isHot ? 0.95 : 0.4, phase: (i + j) * 0.3, hot: isHot });
      }
    }

    // a horizontal load wave
    const waveGeo = new THREE.BufferGeometry();
    const wavePts: any[] = [];
    for (let k = 0; k <= 80; k++) wavePts.push(new THREE.Vector3((k / 80 - 0.5) * 6, 0, 0));
    waveGeo.setFromPoints(wavePts);
    const wave = new THREE.Line(waveGeo, new THREE.LineBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.7 }));
    group.add(wave);

    return {
      camera,
      update: (t: number, p: number) => {
        group.rotation.y = Math.sin(t * 0.1) * 0.18;
        group.rotation.x = -0.15 + p * 0.12;
        dots.forEach(({ dot, base, phase, hot }) => {
          const u = (Math.sin(t * 1.2 + phase) + 1) / 2;
          (dot.material as any).opacity = hot ? 0.5 + u * 0.5 : base + u * 0.2;
        });
        const pts = (wave.geometry as any).attributes.position;
        for (let k = 0; k <= 80; k++) {
          const x = (k / 80 - 0.5) * 6;
          pts.setY(k, Math.sin(k * 0.25 + t * 2 + p * 4) * 0.35);
        }
        pts.needsUpdate = true;
      },
    };
  }, []);
  const { canvasRef, wrapRef } = useThreeScene(setup);
  return <div ref={wrapRef} aria-hidden className="three-wrap"><canvas ref={canvasRef} /></div>;
}

/* ───────────────────────── 08 · SwitchFlow — aviation behavioural switch ─ */
export function SwitchFlow() {
  const setup = useCallback((ctx: any) => {
    const { THREE, scene, size } = ctx;
    const camera = new THREE.PerspectiveCamera(40, size.w / Math.max(size.h, 1), 0.1, 100);
    camera.position.set(0, 0, 6);

    const group = new THREE.Group();
    scene.add(group);

    // two converging hubs
    const hubL = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(0.5, 0)),
      new THREE.LineBasicMaterial({ color: LINE, transparent: true, opacity: 0.55 })
    );
    hubL.position.set(-2.4, 0, 0);
    group.add(hubL);

    const hubR = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(0.5, 0)),
      new THREE.LineBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.95 })
    );
    hubR.position.set(2.4, 0, 0);
    group.add(hubR);

    // streams of particles arcing from L to R
    const streams: any[] = [];
    for (let i = 0; i < 22; i++) {
      const a = new THREE.Vector3(-2.4, (Math.random() - 0.5) * 0.6, (Math.random() - 0.5) * 0.6);
      const b = new THREE.Vector3(2.4, (Math.random() - 0.5) * 0.6, (Math.random() - 0.5) * 0.6);
      const mid = new THREE.Vector3((a.x + b.x) / 2, 1.4 + Math.random() * 0.8, 0);
      const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
      const pts = curve.getPoints(36);
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const line = new THREE.Line(geo, new THREE.LineBasicMaterial({ color: ACCENT, transparent: true, opacity: 0 }));
      group.add(line);
      streams.push({ line, phase: i * 0.18 });
    }

    return {
      camera,
      update: (t: number, p: number) => {
        group.rotation.y = Math.sin(t * 0.1) * 0.25 + p * 0.3;
        hubL.rotation.y = t * 0.25;
        hubR.rotation.y = -t * 0.3;
        streams.forEach(({ line, phase }) => {
          const u = (Math.sin(t * 0.8 - phase) + 1) / 2;
          (line.material as any).opacity = Math.pow(u, 2) * 0.85;
        });
      },
    };
  }, []);
  const { canvasRef, wrapRef } = useThreeScene(setup);
  return <div ref={wrapRef} aria-hidden className="three-wrap"><canvas ref={canvasRef} /></div>;
}

/* ───────────────────────── 09 · RouteWeave — travel itineraries ───────── */
export function RouteWeave() {
  const setup = useCallback((ctx: any) => {
    const { THREE, scene, size } = ctx;
    const camera = new THREE.PerspectiveCamera(40, size.w / Math.max(size.h, 1), 0.1, 100);
    camera.position.set(0, 0.4, 6);

    const group = new THREE.Group();
    scene.add(group);

    // 7 hub nodes scattered
    const hubs: any[] = [];
    for (let i = 0; i < 7; i++) {
      const ang = (i / 7) * Math.PI * 2;
      const r = 2.4;
      const p = new THREE.Vector3(Math.cos(ang) * r, Math.sin(ang * 1.3) * 0.9, Math.sin(ang) * r * 0.5);
      const node = new THREE.LineSegments(
        new THREE.EdgesGeometry(new THREE.OctahedronGeometry(0.13, 0)),
        new THREE.LineBasicMaterial({ color: i === 0 ? ACCENT : LINE, transparent: true, opacity: 0.85 })
      );
      node.position.copy(p);
      group.add(node);
      hubs.push(p);
    }

    // weave: every hub to every next hub
    const threads: any[] = [];
    for (let i = 0; i < hubs.length; i++) {
      for (let j = i + 1; j < hubs.length; j++) {
        const a = hubs[i], b = hubs[j];
        const mid = a.clone().add(b).multiplyScalar(0.5).add(new THREE.Vector3(0, 0.4, 0));
        const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
        const geo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(28));
        const mat = new THREE.LineBasicMaterial({ color: LINE, transparent: true, opacity: 0.12 });
        const line = new THREE.Line(geo, mat);
        group.add(line);
        threads.push({ line, phase: (i + j) * 0.4 });
      }
    }

    return {
      camera,
      update: (t: number, p: number) => {
        group.rotation.y = t * 0.06 + p * 0.4;
        group.rotation.x = Math.sin(t * 0.05) * 0.18;
        threads.forEach(({ line, phase }) => {
          const u = (Math.sin(t * 0.5 + phase) + 1) / 2;
          (line.material as any).opacity = 0.08 + Math.pow(u, 3) * 0.6;
          if (Math.sin(t * 0.5 + phase) > 0.6) (line.material as any).color.setHex(ACCENT);
          else (line.material as any).color.setHex(LINE);
        });
      },
    };
  }, []);
  const { canvasRef, wrapRef } = useThreeScene(setup);
  return <div ref={wrapRef} aria-hidden className="three-wrap"><canvas ref={canvasRef} /></div>;
}

/* ───────────────────────── 10 · AirsideGrid — airport vehicle ops ─────── */
export function AirsideGrid() {
  const setup = useCallback((ctx: any) => {
    const { THREE, scene, size } = ctx;
    const camera = new THREE.PerspectiveCamera(40, size.w / Math.max(size.h, 1), 0.1, 100);
    camera.position.set(2.2, 3.2, 4.2);
    camera.lookAt(0, 0, 0);

    const group = new THREE.Group();
    scene.add(group);

    // tarmac plane
    const plane = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.PlaneGeometry(5.5, 5.5, 12, 12)),
      new THREE.LineBasicMaterial({ color: LINE, transparent: true, opacity: 0.18 })
    );
    plane.rotation.x = -Math.PI / 2;
    group.add(plane);

    // geofence ring
    const ringPts: any[] = [];
    for (let i = 0; i <= 64; i++) {
      const a = (i / 64) * Math.PI * 2;
      ringPts.push(new THREE.Vector3(Math.cos(a) * 2.2, 0.01, Math.sin(a) * 2.2));
    }
    const ring = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(ringPts),
      new THREE.LineBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.6 })
    );
    group.add(ring);

    // moving vehicles (small octahedra orbiting at varied radii)
    const vehicles: any[] = [];
    for (let i = 0; i < 9; i++) {
      const v = new THREE.LineSegments(
        new THREE.EdgesGeometry(new THREE.OctahedronGeometry(0.09, 0)),
        new THREE.LineBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.95 })
      );
      group.add(v);
      // trailing line
      const trailGeo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3()]);
      const trail = new THREE.Line(trailGeo, new THREE.LineBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.35 }));
      group.add(trail);
      vehicles.push({ v, trail, r: 0.8 + Math.random() * 1.4, off: Math.random() * Math.PI * 2, speed: 0.3 + Math.random() * 0.4 });
    }

    return {
      camera,
      update: (t: number, p: number) => {
        group.rotation.y = t * 0.05 + p * 0.2;
        vehicles.forEach(({ v, trail, r, off, speed }) => {
          const a = off + t * speed;
          const x = Math.cos(a) * r;
          const z = Math.sin(a) * r;
          v.position.set(x, 0.05, z);
          const x2 = Math.cos(a - 0.3) * r;
          const z2 = Math.sin(a - 0.3) * r;
          (trail.geometry as any).setFromPoints([new THREE.Vector3(x2, 0.02, z2), new THREE.Vector3(x, 0.02, z)]);
        });
      },
    };
  }, []);
  const { canvasRef, wrapRef } = useThreeScene(setup);
  return <div ref={wrapRef} aria-hidden className="three-wrap"><canvas ref={canvasRef} /></div>;
}

/* ───────────────────────── 11 · ItineraryMesh — partner network ───────── */
export function ItineraryMesh() {
  const setup = useCallback((ctx: any) => {
    const { THREE, scene, size } = ctx;
    const camera = new THREE.PerspectiveCamera(42, size.w / Math.max(size.h, 1), 0.1, 100);
    camera.position.set(0, 0, 5.5);

    const group = new THREE.Group();
    scene.add(group);

    // central traveller node
    const me = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(0.22, 0)),
      new THREE.LineBasicMaterial({ color: ACCENT, transparent: true, opacity: 1 })
    );
    group.add(me);

    // 3 concentric rings of partner nodes
    const partners: any[] = [];
    [1.3, 2.1, 2.9].forEach((r, ringI) => {
      const count = 8 + ringI * 4;
      for (let i = 0; i < count; i++) {
        const a = (i / count) * Math.PI * 2 + ringI * 0.2;
        const node = new THREE.LineSegments(
          new THREE.EdgesGeometry(new THREE.OctahedronGeometry(0.05, 0)),
          new THREE.LineBasicMaterial({ color: LINE, transparent: true, opacity: 0.55 })
        );
        const pos = new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r * 0.7, 0);
        node.position.copy(pos);
        group.add(node);

        const lineGeo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), pos]);
        const line = new THREE.Line(lineGeo, new THREE.LineBasicMaterial({ color: ACCENT, transparent: true, opacity: 0 }));
        group.add(line);
        partners.push({ node, line, phase: (ringI * 7 + i) * 0.25, ringI });
      }
    });

    return {
      camera,
      update: (t: number, p: number) => {
        group.rotation.z = t * 0.04;
        me.rotation.y = t * 0.5;
        partners.forEach(({ line, phase, ringI }) => {
          const u = (Math.sin(t * 0.7 - phase + ringI) + 1) / 2;
          (line.material as any).opacity = Math.pow(u, 3) * 0.7 * (1 - ringI * 0.2);
        });
      },
    };
  }, []);
  const { canvasRef, wrapRef } = useThreeScene(setup);
  return <div ref={wrapRef} aria-hidden className="three-wrap"><canvas ref={canvasRef} /></div>;
}

/* ───────────────────────── 12 · OccupancyRing — hospitality fill ──────── */
export function OccupancyRing() {
  const setup = useCallback((ctx: any) => {
    const { THREE, scene, size } = ctx;
    const camera = new THREE.PerspectiveCamera(38, size.w / Math.max(size.h, 1), 0.1, 100);
    camera.position.set(0, 0, 5.5);

    const group = new THREE.Group();
    scene.add(group);

    // concentric rings, each broken into segments that "fill" over time
    const layers: any[] = [];
    [1.0, 1.5, 2.0, 2.5].forEach((r, li) => {
      const segs = 24;
      const fill = 0.4 + li * 0.12;
      const filled = Math.floor(segs * fill);
      for (let i = 0; i < segs; i++) {
        const a0 = (i / segs) * Math.PI * 2;
        const a1 = ((i + 0.85) / segs) * Math.PI * 2;
        const pts: any[] = [];
        for (let k = 0; k <= 8; k++) {
          const a = a0 + (a1 - a0) * (k / 8);
          pts.push(new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r, 0));
        }
        const isFilled = i < filled;
        const seg = new THREE.Line(
          new THREE.BufferGeometry().setFromPoints(pts),
          new THREE.LineBasicMaterial({ color: isFilled ? ACCENT : LINE, transparent: true, opacity: isFilled ? 0.85 : 0.2 })
        );
        group.add(seg);
        layers.push({ seg, isFilled, phase: (i + li) * 0.15, li });
      }
    });

    return {
      camera,
      update: (t: number, p: number) => {
        group.rotation.z = t * 0.04;
        layers.forEach(({ seg, isFilled, phase, li }) => {
          if (isFilled) {
            (seg.material as any).opacity = 0.55 + Math.sin(t * 1.5 - phase) * 0.3;
          } else {
            (seg.material as any).opacity = 0.15 + p * 0.4 * (1 - li * 0.15);
          }
        });
      },
    };
  }, []);
  const { canvasRef, wrapRef } = useThreeScene(setup);
  return <div ref={wrapRef} aria-hidden className="three-wrap"><canvas ref={canvasRef} /></div>;
}

/* ───────────────────────── 13 · CommunityLattice — co-living network ──── */
export function CommunityLattice() {
  const setup = useCallback((ctx: any) => {
    const { THREE, scene, size } = ctx;
    const camera = new THREE.PerspectiveCamera(38, size.w / Math.max(size.h, 1), 0.1, 100);
    camera.position.set(3, 2.6, 4);
    camera.lookAt(0, 0, 0);

    const group = new THREE.Group();
    scene.add(group);

    // hex-ish lattice of resident nodes
    const dots: any[] = [];
    const COLS = 7, ROWS = 5;
    for (let i = 0; i < COLS; i++) {
      for (let j = 0; j < ROWS; j++) {
        const x = (i - (COLS - 1) / 2) * 0.65 + (j % 2 ? 0.32 : 0);
        const z = (j - (ROWS - 1) / 2) * 0.55;
        const isHub = (i === 3 && j === 2) || (i === 1 && j === 1) || (i === 5 && j === 3);
        const dot = new THREE.LineSegments(
          new THREE.EdgesGeometry(new THREE.OctahedronGeometry(isHub ? 0.13 : 0.06, 0)),
          new THREE.LineBasicMaterial({ color: isHub ? ACCENT : LINE, transparent: true, opacity: isHub ? 0.95 : 0.45 })
        );
        dot.position.set(x, 0, z);
        group.add(dot);
        dots.push({ pos: dot.position.clone(), hub: isHub });
      }
    }
    // connecting lines between adjacent dots
    for (let i = 0; i < dots.length; i++) {
      for (let j = i + 1; j < dots.length; j++) {
        if (dots[i].pos.distanceTo(dots[j].pos) < 0.78) {
          const line = new THREE.Line(
            new THREE.BufferGeometry().setFromPoints([dots[i].pos, dots[j].pos]),
            new THREE.LineBasicMaterial({ color: LINE, transparent: true, opacity: 0.2 })
          );
          group.add(line);
        }
      }
    }

    return {
      camera,
      update: (t: number, p: number) => {
        group.rotation.y = t * 0.08 + p * 0.3;
      },
    };
  }, []);
  const { canvasRef, wrapRef } = useThreeScene(setup);
  return <div ref={wrapRef} aria-hidden className="three-wrap"><canvas ref={canvasRef} /></div>;
}

/* ───────────────────────── 14 · BlockStack — proptech inventory ───────── */
export function BlockStack() {
  const setup = useCallback((ctx: any) => {
    const { THREE, scene, size } = ctx;
    const camera = new THREE.PerspectiveCamera(40, size.w / Math.max(size.h, 1), 0.1, 100);
    camera.position.set(3.5, 2.4, 4.6);
    camera.lookAt(0, 0.3, 0);

    const group = new THREE.Group();
    scene.add(group);

    const blocks: any[] = [];
    const grid = 4;
    for (let i = 0; i < grid; i++) {
      for (let j = 0; j < grid; j++) {
        const h = 0.4 + Math.random() * 1.4;
        const isAccent = (i + j) % 5 === 0;
        const box = new THREE.LineSegments(
          new THREE.EdgesGeometry(new THREE.BoxGeometry(0.55, h, 0.55)),
          new THREE.LineBasicMaterial({ color: isAccent ? ACCENT : LINE, transparent: true, opacity: isAccent ? 0.95 : 0.4 })
        );
        box.position.set((i - (grid - 1) / 2) * 0.75, h / 2 - 0.2, (j - (grid - 1) / 2) * 0.75);
        group.add(box);
        blocks.push({ box, baseH: h, isAccent });
      }
    }
    return {
      camera,
      update: (t: number, p: number) => {
        group.rotation.y = t * 0.06;
        blocks.forEach(({ box, baseH }, k) => {
          const sy = 1 + Math.sin(t * 0.7 + k * 0.4) * 0.08 + p * 0.2;
          box.scale.y = sy;
          box.position.y = (baseH * sy) / 2 - 0.2;
        });
      },
    };
  }, []);
  const { canvasRef, wrapRef } = useThreeScene(setup);
  return <div ref={wrapRef} aria-hidden className="three-wrap"><canvas ref={canvasRef} /></div>;
}

/* ───────────────────────── 15 · SchemaScaffold — AI visibility ────────── */
export function SchemaScaffold() {
  const setup = useCallback((ctx: any) => {
    const { THREE, scene, size } = ctx;
    const camera = new THREE.PerspectiveCamera(40, size.w / Math.max(size.h, 1), 0.1, 100);
    camera.position.set(0, 0, 6);

    const group = new THREE.Group();
    scene.add(group);

    // 4 nested wireframe boxes representing layered schema
    const layers: any[] = [];
    [0.9, 1.5, 2.2, 3.0].forEach((s, i) => {
      const box = new THREE.LineSegments(
        new THREE.EdgesGeometry(new THREE.BoxGeometry(s, s, s)),
        new THREE.LineBasicMaterial({ color: i === 0 ? ACCENT : LINE, transparent: true, opacity: i === 0 ? 0.95 : 0.3 - i * 0.05 })
      );
      group.add(box);
      layers.push({ box, base: s });
    });

    return {
      camera,
      update: (t: number, p: number) => {
        layers.forEach(({ box, base }, i) => {
          box.rotation.x = t * (0.1 + i * 0.04);
          box.rotation.y = t * (0.15 + i * 0.03);
          const s = base * (1 + Math.sin(t * 0.4 + i) * 0.04 + p * 0.1);
          box.scale.set(s / base, s / base, s / base);
        });
      },
    };
  }, []);
  const { canvasRef, wrapRef } = useThreeScene(setup);
  return <div ref={wrapRef} aria-hidden className="three-wrap"><canvas ref={canvasRef} /></div>;
}

/* ───────────────────────── 16 · AgentMesh — agentic systems ───────────── */
export function AgentMesh() {
  const setup = useCallback((ctx: any) => {
    const { THREE, scene, size } = ctx;
    const camera = new THREE.PerspectiveCamera(38, size.w / Math.max(size.h, 1), 0.1, 100);
    camera.position.set(0, 0, 6);

    const group = new THREE.Group();
    scene.add(group);

    // central core
    const core = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(0.55, 1)),
      new THREE.LineBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.9 })
    );
    group.add(core);

    // satellite agents on multiple orbital planes
    const agents: any[] = [];
    for (let i = 0; i < 8; i++) {
      const tilt = (i / 8) * Math.PI;
      const radius = 2.2 + (i % 3) * 0.3;
      const node = new THREE.LineSegments(
        new THREE.EdgesGeometry(new THREE.TetrahedronGeometry(0.16, 0)),
        new THREE.LineBasicMaterial({ color: LINE, transparent: true, opacity: 0.9 })
      );
      group.add(node);
      const lineGeo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3()]);
      const line = new THREE.Line(lineGeo, new THREE.LineBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.3 }));
      group.add(line);
      agents.push({ node, line, tilt, radius, phase: i * 0.7, speed: 0.25 + (i % 3) * 0.1 });
    }

    return {
      camera,
      update: (t: number, p: number) => {
        core.rotation.x = t * 0.2;
        core.rotation.y = t * 0.3;
        agents.forEach(({ node, line, tilt, radius, phase, speed }) => {
          const a = phase + t * speed;
          const x = Math.cos(a) * radius * Math.cos(tilt);
          const y = Math.sin(a) * radius;
          const z = Math.cos(a) * radius * Math.sin(tilt);
          node.position.set(x, y, z);
          node.rotation.y = t;
          (line.geometry as any).setFromPoints([new THREE.Vector3(0, 0, 0), node.position]);
          (line.material as any).opacity = 0.2 + p * 0.5;
        });
      },
    };
  }, []);
  const { canvasRef, wrapRef } = useThreeScene(setup);
  return <div ref={wrapRef} aria-hidden className="three-wrap"><canvas ref={canvasRef} /></div>;
}

/* ───────────────────────── 17 · CitationPulse ───────────────────────── */
/** Concentric arcs (search/answer rings) with a brand node that lights up as p advances. */
export function CitationPulse() {
  const setup = useCallback((ctx: any) => {
    const { THREE, scene, size } = ctx;
    const camera = new THREE.PerspectiveCamera(35, size.w / Math.max(size.h, 1), 0.1, 100);
    camera.position.set(0, 0, 7);

    const group = new THREE.Group();
    scene.add(group);

    const rings: any[] = [];
    for (let r = 1; r <= 5; r++) {
      const radius = 0.7 * r;
      const geo = new THREE.RingGeometry(radius - 0.004, radius + 0.004, 128);
      const mat = new THREE.MeshBasicMaterial({ color: LINE, transparent: true, opacity: 0.18, side: THREE.DoubleSide });
      const ring = new THREE.Mesh(geo, mat);
      group.add(ring);
      rings.push(ring);
    }

    // brand node (center) + answer nodes on outer ring
    const core = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(0.18, 0)),
      new THREE.LineBasicMaterial({ color: ACCENT, transparent: true, opacity: 1 })
    );
    group.add(core);

    const nodes: any[] = [];
    const lines: any[] = [];
    for (let i = 0; i < 9; i++) {
      const a = (i / 9) * Math.PI * 2;
      const radius = 0.7 * 5;
      const pos = new THREE.Vector3(Math.cos(a) * radius, Math.sin(a) * radius, 0);
      const node = new THREE.LineSegments(
        new THREE.EdgesGeometry(new THREE.TetrahedronGeometry(0.11, 0)),
        new THREE.LineBasicMaterial({ color: LINE, transparent: true, opacity: 0.7 })
      );
      node.position.copy(pos);
      group.add(node);
      nodes.push(node);
      const lg = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), pos]);
      const line = new THREE.Line(lg, new THREE.LineBasicMaterial({ color: ACCENT, transparent: true, opacity: 0 }));
      group.add(line);
      lines.push(line);
    }

    return {
      camera,
      update: (t: number, p: number) => {
        group.rotation.z = t * 0.04;
        rings.forEach((r: any, i: number) => {
          r.material.opacity = 0.12 + Math.max(0, Math.sin(t * 0.6 + i * 0.4)) * 0.18 + p * 0.1;
        });
        // citations light up continuously with time + scroll boost
        const progress = Math.min(1, (Math.sin(t * 0.25) + 1) / 2 * 0.4 + p * 0.7);
        const lit = Math.floor(progress * nodes.length);
        nodes.forEach((n: any, i: number) => {
          const isLit = i <= lit;
          const pulse = Math.sin(t * 1.2 + i * 0.5) * 0.2;
          n.material.opacity = isLit ? 0.8 + pulse : 0.35;
          n.material.color.setHex(isLit ? ACCENT : LINE);
        });
        lines.forEach((l: any, i: number) => {
          const isLit = i <= lit;
          const pulse = Math.sin(t * 1.5 + i * 0.3) * 0.15;
          l.material.opacity = isLit ? 0.45 + pulse : 0;
        });
      },
    };
  }, []);
  const { canvasRef, wrapRef } = useThreeScene(setup);
  return <div ref={wrapRef} aria-hidden className="three-wrap"><canvas ref={canvasRef} /></div>;
}

/* ───────────────────────── 18 · BrandSignalGraph ───────────────────────── */
/** Radial authority map: citation signals pulse outward from central brand node. */
export function BrandSignalGraph() {
  const setup = useCallback((ctx: any) => {
    const { THREE, scene, size } = ctx;
    const camera = new THREE.PerspectiveCamera(35, size.w / Math.max(size.h, 1), 0.1, 100);
    camera.position.set(0, 0, 7);

    const group = new THREE.Group();
    scene.add(group);

    // Central brand node — prominent
    const core = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(0.28, 1)),
      new THREE.LineBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.95 })
    );
    group.add(core);

    // Concentric authority rings (signal waves)
    const waves: any[] = [];
    for (let i = 1; i <= 6; i++) {
      const radius = 0.5 * i;
      const pts: any[] = [];
      const segments = 64;
      for (let j = 0; j <= segments; j++) {
        const a = (j / segments) * Math.PI * 2;
        pts.push(new THREE.Vector3(Math.cos(a) * radius, Math.sin(a) * radius, 0));
      }
      const ring = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(pts),
        new THREE.LineBasicMaterial({ color: ACCENT, transparent: true, opacity: 0 })
      );
      group.add(ring);
      waves.push({ ring, radius, phase: i * 0.8 });
    }

    // Competitor nodes that fade as authority grows
    const competitors: any[] = [];
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2 + 0.3;
      const r = 2.8 + Math.random() * 0.6;
      const pos = new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r, 0);
      const node = new THREE.LineSegments(
        new THREE.EdgesGeometry(new THREE.OctahedronGeometry(0.12, 0)),
        new THREE.LineBasicMaterial({ color: LINE, transparent: true, opacity: 0.6 })
      );
      node.position.copy(pos);
      group.add(node);
      competitors.push({ node, baseOpacity: 0.6 });
    }

    // Signal rays from center outward
    const rays: any[] = [];
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      const end = new THREE.Vector3(Math.cos(a) * 3.2, Math.sin(a) * 3.2, 0);
      const geo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), end]);
      const ray = new THREE.Line(geo, new THREE.LineBasicMaterial({ color: ACCENT, transparent: true, opacity: 0 }));
      group.add(ray);
      rays.push({ ray, phase: i * 0.5 });
    }

    return {
      camera,
      update: (t: number, p: number) => {
        group.rotation.z = t * 0.02;
        core.rotation.y = t * 0.4;
        core.rotation.x = t * 0.2;

        // Waves pulse outward continuously
        waves.forEach(({ ring, phase }) => {
          const wave = Math.sin(t * 0.8 - phase);
          ring.material.opacity = Math.max(0, wave) * 0.5 + p * 0.2;
        });

        // Rays pulse
        rays.forEach(({ ray, phase }) => {
          const pulse = Math.sin(t * 1.2 - phase);
          ray.material.opacity = Math.max(0, pulse) * 0.35 + p * 0.15;
        });

        // Competitors fade as p increases (your authority displaces them)
        competitors.forEach(({ node }) => {
          node.material.opacity = Math.max(0.1, 0.6 - p * 0.5);
        });
      },
    };
  }, []);
  const { canvasRef, wrapRef } = useThreeScene(setup);
  return <div ref={wrapRef} aria-hidden className="three-wrap"><canvas ref={canvasRef} /></div>;
}

/* ───────────────────────── 19 · AgentLoop ───────────────────────── */
/** 4-node feedback loop: prompt → tool → action → measurement → prompt. Pulse traverses with p. */
export function AgentLoop() {
  const setup = useCallback((ctx: any) => {
    const { THREE, scene, size } = ctx;
    const camera = new THREE.PerspectiveCamera(35, size.w / Math.max(size.h, 1), 0.1, 100);
    camera.position.set(0, 0, 7);

    const group = new THREE.Group();
    scene.add(group);

    const radius = 2.0;
    const nodes: any[] = [];
    const labels = 4;
    const positions: any[] = [];
    for (let i = 0; i < labels; i++) {
      const a = (i / labels) * Math.PI * 2 - Math.PI / 2;
      const pos = new THREE.Vector3(Math.cos(a) * radius, Math.sin(a) * radius, 0);
      positions.push(pos);
      const node = new THREE.LineSegments(
        new THREE.EdgesGeometry(new THREE.BoxGeometry(0.55, 0.55, 0.55)),
        new THREE.LineBasicMaterial({ color: LINE, transparent: true, opacity: 0.7 })
      );
      node.position.copy(pos);
      group.add(node);
      nodes.push(node);
    }

    // connecting arcs
    const arcs: any[] = [];
    for (let i = 0; i < labels; i++) {
      const from = positions[i];
      const to = positions[(i + 1) % labels];
      const mid = new THREE.Vector3().addVectors(from, to).multiplyScalar(0.5).multiplyScalar(0.6);
      const curve = new THREE.QuadraticBezierCurve3(from, mid, to);
      const pts = curve.getPoints(40);
      const g = new THREE.BufferGeometry().setFromPoints(pts);
      const m = new THREE.LineBasicMaterial({ color: LINE, transparent: true, opacity: 0.3 });
      arcs.push(new THREE.Line(g, m));
      group.add(arcs[arcs.length - 1]);
    }

    // travelling pulse
    const pulse = new THREE.Mesh(
      new THREE.SphereGeometry(0.1, 12, 12),
      new THREE.MeshBasicMaterial({ color: ACCENT })
    );
    group.add(pulse);

    return {
      camera,
      update: (t: number, p: number) => {
        group.rotation.z = Math.sin(t * 0.1) * 0.05;
        nodes.forEach((n: any) => { n.rotation.x = t * 0.3; n.rotation.y = t * 0.4; });
        const phase = (t * 0.25 + p * 2) % 1;
        const seg = Math.floor(phase * labels);
        const local = (phase * labels) - seg;
        const from = positions[seg];
        const to = positions[(seg + 1) % labels];
        const mid = new THREE.Vector3().addVectors(from, to).multiplyScalar(0.5).multiplyScalar(0.6);
        const curve = new THREE.QuadraticBezierCurve3(from, mid, to);
        pulse.position.copy(curve.getPoint(local));
        nodes.forEach((n: any, i: number) => {
          const active = i === seg || i === (seg + 1) % labels;
          n.material.opacity = active ? 1 : 0.45;
          n.material.color.setHex(active ? ACCENT : LINE);
        });
      },
    };
  }, []);
  const { canvasRef, wrapRef } = useThreeScene(setup);
  return <div ref={wrapRef} aria-hidden className="three-wrap"><canvas ref={canvasRef} /></div>;
}

/* ───────────────────────── 20 · VitalsMesh ───────────────────────── */
/** EKG-style trace weaving through a citation lattice. For healthcare. */
export function VitalsMesh() {
  const setup = useCallback((ctx: any) => {
    const { THREE, scene, size } = ctx;
    const camera = new THREE.PerspectiveCamera(35, size.w / Math.max(size.h, 1), 0.1, 100);
    camera.position.set(0, 0, 7);

    const group = new THREE.Group();
    scene.add(group);

    // background lattice
    const lattice = new THREE.LineSegments(
      new THREE.WireframeGeometry(new THREE.PlaneGeometry(5.5, 3, 16, 9)),
      new THREE.LineBasicMaterial({ color: LINE, transparent: true, opacity: 0.16 })
    );
    group.add(lattice);

    // EKG trace
    const N = 240;
    const tracePts: any[] = [];
    const beatAt = [0.18, 0.42, 0.66, 0.9];
    for (let i = 0; i < N; i++) {
      const u = i / (N - 1);
      const x = -2.6 + u * 5.2;
      let y = 0;
      beatAt.forEach((b) => {
        const d = u - b;
        if (Math.abs(d) < 0.04) {
          // QRS spike
          y += Math.sin(d * 80) * 1.1 * Math.exp(-Math.abs(d) * 60);
        }
      });
      tracePts.push(new THREE.Vector3(x, y, 0));
    }
    const traceGeo = new THREE.BufferGeometry().setFromPoints(tracePts);
    const traceMat = new THREE.LineBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.9 });
    const trace = new THREE.Line(traceGeo, traceMat);
    group.add(trace);

    // citation dots on top of lattice intersections
    const nodes: any[] = [];
    for (let i = 0; i < 8; i++) {
      const node = new THREE.Mesh(
        new THREE.SphereGeometry(0.06, 8, 8),
        new THREE.MeshBasicMaterial({ color: LINE, transparent: true, opacity: 0.6 })
      );
      const x = -2.2 + Math.random() * 4.4;
      const y = -1.2 + Math.random() * 2.4;
      node.position.set(x, y, 0.02);
      group.add(node);
      nodes.push(node);
    }

    // leading scan-dot that rides the crest
    const scanDot = new THREE.Mesh(
      new THREE.SphereGeometry(0.09, 12, 12),
      new THREE.MeshBasicMaterial({ color: ACCENT, transparent: true, opacity: 1 })
    );
    group.add(scanDot);

    return {
      camera,
      update: (t: number, p: number) => {
        // Continuous EKG sweep: sample the static wave shape at a moving offset.
        const attr = traceGeo.getAttribute("position") as any;
        const offset = (t * 0.18) % 1; // wraps 0→1
        for (let i = 0; i < N; i++) {
          const u = ((i / (N - 1)) + offset) % 1;
          let y = 0;
          beatAt.forEach((b) => {
            const d = u - b;
            if (Math.abs(d) < 0.04) {
              y += Math.sin(d * 80) * 1.1 * Math.exp(-Math.abs(d) * 60);
            }
          });
          attr.array[i * 3 + 1] = y;
        }
        attr.needsUpdate = true;

        // scan dot rides the wave at fixed x (leading edge)
        const scanU = 0.82;
        let sy = 0;
        beatAt.forEach((b) => {
          const d = ((scanU + offset) % 1) - b;
          if (Math.abs(d) < 0.04) sy += Math.sin(d * 80) * 1.1 * Math.exp(-Math.abs(d) * 60);
        });
        scanDot.position.set(-2.6 + scanU * 5.2, sy, 0.05);
        (scanDot.material as any).opacity = 0.5 + 0.5 * Math.abs(sy);

        // lattice breathing
        lattice.rotation.z = Math.sin(t * 0.25) * 0.04;
        (lattice.material as any).opacity = 0.14 + 0.1 * p;

        nodes.forEach((n: any, i: number) => {
          const pulse = (Math.sin(t * 2 + i) + 1) * 0.5;
          n.material.opacity = 0.35 + pulse * 0.55;
          n.material.color.setHex(p > 0.5 ? ACCENT : LINE);
        });
      },
    };
  }, []);
  const { canvasRef, wrapRef } = useThreeScene(setup);
  return <div ref={wrapRef} aria-hidden className="three-wrap"><canvas ref={canvasRef} /></div>;
}

/* ───────────────────────── 21 · CompoundCurve ───────────────────────── */
/** Stacked weekly bars forming an exponential curve. Bars rise with p. */
export function CompoundCurve() {
  const setup = useCallback((ctx: any) => {
    const { THREE, scene, size } = ctx;
    const camera = new THREE.PerspectiveCamera(35, size.w / Math.max(size.h, 1), 0.1, 100);
    camera.position.set(0, 0, 7);

    const group = new THREE.Group();
    scene.add(group);

    const N = 28;
    const bars: any[] = [];
    const heights: number[] = [];
    for (let i = 0; i < N; i++) {
      const h = 0.1 + Math.pow(i / (N - 1), 2.2) * 2.6;
      heights.push(h);
      const geo = new THREE.PlaneGeometry(0.12, 1);
      const mat = new THREE.LineBasicMaterial({ color: i > N * 0.6 ? ACCENT : LINE, transparent: true, opacity: 0.6 });
      const bar = new THREE.LineSegments(new THREE.EdgesGeometry(geo), mat);
      bar.position.x = -2.4 + (i / (N - 1)) * 4.8;
      group.add(bar);
      bars.push(bar);
    }

    // overlay curve
    const curvePts: any[] = [];
    for (let i = 0; i < N; i++) {
      curvePts.push(new THREE.Vector3(-2.4 + (i / (N - 1)) * 4.8, -1.3 + heights[i], 0.02));
    }
    const curveGeo = new THREE.BufferGeometry().setFromPoints(curvePts);
    const curveMat = new THREE.LineBasicMaterial({ color: ACCENT, transparent: true, opacity: 0 });
    const curve = new THREE.Line(curveGeo, curveMat);
    group.add(curve);

    return {
      camera,
      update: (_t: number, p: number) => {
        bars.forEach((bar: any, i: number) => {
          const reveal = Math.max(0, Math.min(1, p * N - i + 1));
          const h = heights[i] * reveal;
          bar.scale.y = h;
          bar.position.y = -1.3 + h / 2;
        });
        curve.material.opacity = p * 0.9;
      },
    };
  }, []);
  const { canvasRef, wrapRef } = useThreeScene(setup);
  return <div ref={wrapRef} aria-hidden className="three-wrap"><canvas ref={canvasRef} /></div>;
}

/* ───────────────────────── 22 · PodAgents ───────────────────────── */
/** 5 human nodes inner ring, orbiting agent satellites outer. */
export function PodAgents() {
  const setup = useCallback((ctx: any) => {
    const { THREE, scene, size } = ctx;
    const camera = new THREE.PerspectiveCamera(35, size.w / Math.max(size.h, 1), 0.1, 100);
    camera.position.set(0, 0, 7);

    const group = new THREE.Group();
    scene.add(group);

    // 5 humans inner ring (icosahedrons)
    const humans: any[] = [];
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2 - Math.PI / 2;
      const node = new THREE.LineSegments(
        new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(0.22, 0)),
        new THREE.LineBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.95 })
      );
      node.position.set(Math.cos(a) * 1.0, Math.sin(a) * 1.0, 0);
      group.add(node);
      humans.push(node);
    }

    // inner connecting pentagon
    const innerPts = humans.map((h: any) => h.position.clone());
    innerPts.push(innerPts[0]);
    const innerGeo = new THREE.BufferGeometry().setFromPoints(innerPts);
    const inner = new THREE.Line(innerGeo, new THREE.LineBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.5 }));
    group.add(inner);

    // agent satellites
    const agents: any[] = [];
    const links: any[] = [];
    for (let i = 0; i < 10; i++) {
      const node = new THREE.LineSegments(
        new THREE.EdgesGeometry(new THREE.TetrahedronGeometry(0.14, 0)),
        new THREE.LineBasicMaterial({ color: LINE, transparent: true, opacity: 0.8 })
      );
      group.add(node);
      const lg = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3()]);
      const link = new THREE.Line(lg, new THREE.LineBasicMaterial({ color: LINE, transparent: true, opacity: 0.2 }));
      group.add(link);
      agents.push({ node, link, phase: i * 0.62, speed: 0.2 + (i % 3) * 0.08, radius: 2.3 + (i % 2) * 0.2, tilt: (i / 10) * Math.PI });
    }

    return {
      camera,
      update: (t: number, p: number) => {
        group.rotation.z = t * 0.03;
        agents.forEach(({ node, link, phase, speed, radius, tilt }, i) => {
          const a = phase + t * speed;
          const x = Math.cos(a) * radius * Math.cos(tilt);
          const y = Math.sin(a) * radius;
          const z = Math.cos(a) * radius * Math.sin(tilt);
          node.position.set(x, y, z);
          node.rotation.x = t;
          node.rotation.y = t * 0.7;
          const human = humans[i % humans.length];
          (link.geometry as any).setFromPoints([human.position, node.position]);
          link.material.opacity = 0.15 + p * 0.45;
        });
      },
    };
  }, []);
  const { canvasRef, wrapRef } = useThreeScene(setup);
  return <div ref={wrapRef} aria-hidden className="three-wrap"><canvas ref={canvasRef} /></div>;
}

/* ───────────────────── ServicesLoop · one continuous SEO→GEO→AGENTS rail ───────────────────── */
export function ServicesLoop() {
  const setup = useCallback((ctx: any) => {
    const { THREE, scene, size } = ctx;
    const camera = new THREE.OrthographicCamera(-3, 3, 6, -6, 0.1, 100);
    camera.position.set(0, 0, 10);

    const group = new THREE.Group();
    scene.add(group);

    // three stage nodes along a vertical spine
    const stages = [
      { y: 3.6, label: "SEO" },
      { y: 0.0, label: "GEO" },
      { y: -3.6, label: "AGENTS" },
    ];

    // spine
    const spineGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-1.6, 4.6, 0),
      new THREE.Vector3(-1.6, -4.6, 0),
    ]);
    const spine = new THREE.Line(
      spineGeo,
      new THREE.LineBasicMaterial({ color: LINE, transparent: true, opacity: 0.22 })
    );
    group.add(spine);

    // stage rings + satellite orbits
    const rings: any[] = [];
    const orbits: any[] = [];
    stages.forEach((s, i) => {
      const ring = new THREE.LineLoop(
        new THREE.BufferGeometry().setFromPoints(
          Array.from({ length: 64 }, (_, k) => {
            const a = (k / 64) * Math.PI * 2;
            return new THREE.Vector3(-1.6 + Math.cos(a) * 0.55, s.y + Math.sin(a) * 0.55, 0);
          })
        ),
        new THREE.LineBasicMaterial({ color: i === 1 ? ACCENT : LINE, transparent: true, opacity: 0.85 })
      );
      group.add(ring);
      rings.push(ring);

      // 6 satellite ticks per stage
      for (let k = 0; k < 6; k++) {
        const a0 = (k / 6) * Math.PI * 2;
        const tick = new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3()]),
          new THREE.LineBasicMaterial({ color: LINE, transparent: true, opacity: 0.5 })
        );
        group.add(tick);
        orbits.push({ tick, base: a0, stage: i });
      }
    });

    // traveling pulses along spine
    const pulses: any[] = [];
    for (let i = 0; i < 4; i++) {
      const dot = new THREE.Mesh(
        new THREE.CircleGeometry(0.06, 16),
        new THREE.MeshBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.95 })
      );
      group.add(dot);
      pulses.push({ dot, phase: i / 4 });
    }

    // outer arc field — gives the right-hand mass without becoming a box
    const arcs: any[] = [];
    for (let i = 0; i < 9; i++) {
      const a = new THREE.Vector3(-1.6, 4 - i * 1.0, 0);
      const b = new THREE.Vector3(2.4, 4 - i * 1.0 - 0.4, 0);
      const mid = new THREE.Vector3(1.2, 4 - i * 1.0 - 1.6, 0);
      const pts = new THREE.QuadraticBezierCurve3(a, mid, b).getPoints(40);
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const line = new THREE.Line(
        geo,
        new THREE.LineBasicMaterial({ color: LINE, transparent: true, opacity: 0.14 + (i % 2) * 0.08 })
      );
      group.add(line);
      arcs.push(line);
    }

    return {
      camera,
      update: (t: number, p: number) => {
        // spine pulses travel top→bottom continuously
        pulses.forEach((pl) => {
          const phase = (pl.phase + t * 0.08) % 1;
          pl.dot.position.set(-1.6, 4.6 - phase * 9.2, 0.01);
          pl.dot.material.opacity = 0.4 + Math.sin(phase * Math.PI) * 0.6;
        });
        // satellite ticks rotate slowly
        orbits.forEach(({ tick, base, stage }) => {
          const a = base + t * (0.15 + stage * 0.05);
          const cy = stages[stage].y;
          const inner = 0.7;
          const outer = 0.95;
          (tick.geometry as any).setFromPoints([
            new THREE.Vector3(-1.6 + Math.cos(a) * inner, cy + Math.sin(a) * inner, 0),
            new THREE.Vector3(-1.6 + Math.cos(a) * outer, cy + Math.sin(a) * outer, 0),
          ]);
        });
        // arcs breathe with scroll
        arcs.forEach((a, i) => {
          a.material.opacity = (0.1 + (i % 2) * 0.06) + p * 0.25;
        });
        group.rotation.z = Math.sin(t * 0.08) * 0.01;
      },
    };
  }, []);
  const { canvasRef, wrapRef } = useThreeScene(setup);
  return <div ref={wrapRef} aria-hidden className="three-wrap"><canvas ref={canvasRef} /></div>;
}

/* ───────────────────── ConvergenceNode · 3 motifs collapse into one ───────────────────── */
/** Citation arcs, signal bars, and agent loop converge into a single accent node. */
export function ConvergenceNode() {
  const setup = useCallback((ctx: any) => {
    const { THREE, scene, size } = ctx;
    const camera = new THREE.PerspectiveCamera(35, size.w / Math.max(size.h, 1), 0.1, 100);
    camera.position.set(0, 0, 7);

    const group = new THREE.Group();
    scene.add(group);

    // central accent node
    const core = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(0.28, 0)),
      new THREE.LineBasicMaterial({ color: ACCENT, transparent: true, opacity: 1 })
    );
    group.add(core);

    // motif 1: citation dots (left arc) — converge toward center
    const citationDots: any[] = [];
    const citationStart: any[] = [];
    for (let i = 0; i < 9; i++) {
      const a = Math.PI + (i / 8) * Math.PI - Math.PI / 2;
      const r = 2.4;
      const pos = new THREE.Vector3(Math.cos(a) * r - 0.6, Math.sin(a) * r, 0);
      const dot = new THREE.LineSegments(
        new THREE.EdgesGeometry(new THREE.TetrahedronGeometry(0.09, 0)),
        new THREE.LineBasicMaterial({ color: LINE, transparent: true, opacity: 0.7 })
      );
      dot.position.copy(pos);
      group.add(dot);
      citationDots.push(dot);
      citationStart.push(pos.clone());
    }

    // motif 2: signal bars (top) — collapse downward
    const bars: any[] = [];
    const barStart: any[] = [];
    for (let i = 0; i < 7; i++) {
      const x = -1.5 + i * 0.5;
      const h = 0.25 + Math.random() * 0.7;
      const geo = new THREE.PlaneGeometry(0.06, h);
      const mat = new THREE.LineBasicMaterial({ color: LINE, transparent: true, opacity: 0.6 });
      const bar = new THREE.LineSegments(new THREE.EdgesGeometry(geo), mat);
      bar.position.set(x, 2.4 + h / 2, 0);
      group.add(bar);
      bars.push(bar);
      barStart.push(bar.position.clone());
    }

    // motif 3: agent loop nodes (right) — collapse inward
    const loopNodes: any[] = [];
    const loopStart: any[] = [];
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2 - Math.PI / 2;
      const r = 1.4;
      const pos = new THREE.Vector3(Math.cos(a) * r + 1.8, Math.sin(a) * r, 0);
      const node = new THREE.LineSegments(
        new THREE.EdgesGeometry(new THREE.BoxGeometry(0.3, 0.3, 0.3)),
        new THREE.LineBasicMaterial({ color: LINE, transparent: true, opacity: 0.65 })
      );
      node.position.copy(pos);
      group.add(node);
      loopNodes.push(node);
      loopStart.push(pos.clone());
    }

    // converging beams (drawn at high p)
    const beamMat = new THREE.LineBasicMaterial({ color: ACCENT, transparent: true, opacity: 0 });
    const allOrigins = [...citationStart, ...barStart, ...loopStart];
    const beams: any[] = allOrigins.map((o) => {
      const g = new THREE.BufferGeometry().setFromPoints([o.clone(), new THREE.Vector3()]);
      const ln = new THREE.Line(g, beamMat.clone());
      group.add(ln);
      return ln;
    });

    return {
      camera,
      update: (t: number, p: number) => {
        const ease = p * p * (3 - 2 * p);
        // citation dots → center
        citationDots.forEach((d: any, i: number) => {
          d.position.lerpVectors(citationStart[i], new THREE.Vector3(0, 0, 0), ease);
          d.material.color.setHex(p > 0.7 ? ACCENT : LINE);
        });
        bars.forEach((b: any, i: number) => {
          b.position.lerpVectors(barStart[i], new THREE.Vector3(0, 0, 0), ease);
          b.material.color.setHex(p > 0.7 ? ACCENT : LINE);
        });
        loopNodes.forEach((n: any, i: number) => {
          n.position.lerpVectors(loopStart[i], new THREE.Vector3(0, 0, 0), ease);
          n.rotation.x = t * 0.4;
          n.rotation.y = t * 0.5;
          n.material.color.setHex(p > 0.7 ? ACCENT : LINE);
        });
        beams.forEach((bm: any) => { bm.material.opacity = Math.max(0, ease - 0.3) * 0.6; });
        core.scale.setScalar(0.6 + ease * 0.8 + Math.sin(t * 1.2) * 0.04);
        (core.material as any).opacity = 0.6 + ease * 0.4;
        group.rotation.z = Math.sin(t * 0.1) * 0.04;
      },
    };
  }, []);
  const { canvasRef, wrapRef } = useThreeScene(setup);
  return <div ref={wrapRef} aria-hidden className="three-wrap"><canvas ref={canvasRef} /></div>;
}
