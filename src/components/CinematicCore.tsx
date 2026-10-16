import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Lightformer } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const COLORS = { ink: "#080808", signal: "#d90808", paper: "#f2ede3", blood: "#5a0505" } as const;

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const values = new Float32Array(360);
    for (let i = 0; i < values.length; i += 3) {
      const seed = i / 3 + 1;
      values[i] = Math.sin(seed * 71.3) * 9;
      values[i + 1] = Math.cos(seed * 37.7) * 6;
      values[i + 2] = -2 - Math.abs(Math.sin(seed * 19.1) * 9);
    }
    return values;
  }, []);

  useFrame((_, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    if (pointsRef.current) pointsRef.current.rotation.y += delta * 0.018;
  });

  return <points ref={pointsRef}><bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry><pointsMaterial color={COLORS.paper} size={0.025} transparent opacity={0.42} sizeAttenuation /></points>;
}

function OrbitalSculpture() {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const reducedMotion = useRef(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotion.current = media.matches;
    const onMotionChange = () => { reducedMotion.current = media.matches; };
    const onPointerMove = (event: PointerEvent) => {
      pointer.current.x = event.clientX / window.innerWidth - 0.5;
      pointer.current.y = event.clientY / window.innerHeight - 0.5;
    };
    media.addEventListener("change", onMotionChange);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => { media.removeEventListener("change", onMotionChange); window.removeEventListener("pointermove", onPointerMove); };
  }, []);

  useFrame(({ clock }, rawDelta) => {
    const group = groupRef.current;
    const core = coreRef.current;
    if (!group || !core) return;
    const delta = Math.min(rawDelta, 0.05);
    const damp = 1 - Math.exp(-2.8 * delta);
    const scroll = window.scrollY / Math.max(window.innerHeight, 1);
    group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, reducedMotion.current ? 0 : pointer.current.y * 0.18 + scroll * 0.08, damp);
    group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, reducedMotion.current ? 0 : pointer.current.x * 0.32 + scroll * 0.16, damp);
    if (!reducedMotion.current) {
      group.rotation.z += delta * 0.035;
      core.rotation.y += delta * 0.11;
      core.scale.setScalar(1 + Math.sin(clock.elapsedTime * 0.55) * 0.018);
    }
  });

  const rings: [number, number, number][] = [[Math.PI / 2, 0.2, 0], [0.72, 0.2, 0.72], [-0.62, 0.68, -0.35]];
  return <Float speed={0.65} rotationIntensity={0.12} floatIntensity={0.34}><group ref={groupRef} rotation={[0.08, -0.18, 0.12]}>
    <mesh ref={coreRef} ><icosahedronGeometry args={[2.05, 3]} /><meshStandardMaterial color={COLORS.ink} metalness={0.92} roughness={0.22} /></mesh>
    <mesh scale={1.014}><icosahedronGeometry args={[2.05, 2]} /><meshBasicMaterial color={COLORS.signal} wireframe transparent opacity={0.17} /></mesh>
    {rings.map((rotation, index) => <mesh key={index} rotation={rotation}><torusGeometry args={[2.85 + index * 0.34, 0.022 + index * 0.006, 8, 96]} /><meshStandardMaterial color={index === 1 ? COLORS.paper : COLORS.signal} emissive={index === 1 ? COLORS.paper : COLORS.blood} emissiveIntensity={index === 1 ? 0.32 : 0.8} metalness={0.82} roughness={0.28} /></mesh>)}
    <mesh position={[2.7, 1.1, 0.2]}><sphereGeometry args={[0.1, 16, 16]} /><meshBasicMaterial color={COLORS.paper} /></mesh>
  </group></Float>;
}

export function CinematicCore() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(!!e?.isIntersecting));
    io.observe(el); return () => io.disconnect();
  }, []);
  return <div ref={ref} className="hero-webgl" aria-hidden="true"><Canvas frameloop={visible ? "always" : "never"} dpr={1} camera={{ position: [0, 0, 9.5], fov: 42 }} gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}>
    <ambientLight intensity={0.42} /><pointLight position={[-5, 4, 5]} color={COLORS.signal} intensity={36} distance={18} /><pointLight position={[4, -2, 4]} color={COLORS.paper} intensity={12} distance={14} />
    <ParticleField /><OrbitalSculpture />
    <Environment resolution={32} frames={1}><Lightformer intensity={2} color={COLORS.paper} position={[0, 5, 2]} scale={[6, 2, 1]} /><Lightformer intensity={3} color={COLORS.signal} position={[-4, 0, 1]} rotation-y={Math.PI / 2} scale={[5, 1, 1]} /></Environment>
  </Canvas></div>;
}