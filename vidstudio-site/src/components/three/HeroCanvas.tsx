"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, RoundedBox } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function Composition({ mode, frame, scrollRef }: { mode: "WIREFRAME" | "FORM" | "FINAL"; frame: number; scrollRef: React.RefObject<number> }) {
  const group = useRef<THREE.Group>(null);
  const scan = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, -0.34 + scrollRef.current * 0.75 + (frame / 120) * 0.16, 2.5, delta);
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, 0.12 - scrollRef.current * 0.35, 2.5, delta);
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.045;
    state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, scrollRef.current * 0.7, 2.5, delta);
    state.camera.lookAt(0, 0, 0);
    if (scan.current) scan.current.position.y = ((state.clock.elapsedTime * 0.23) % 1.8) - 0.9;
  });
  const wire = mode === "WIREFRAME";
  const form = mode === "FORM";
  return <group ref={group} rotation={[-0.12, -0.3, 0]}>
    <group>
      <RoundedBox args={[3.1, 2.08, 0.1]} radius={0.08} smoothness={4} position={[-0.35, 0.18, -0.65]}><meshPhysicalMaterial color={wire ? "#8b70ff" : "#514b77"} wireframe={wire} metalness={0.35} roughness={0.3} /></RoundedBox>
      <RoundedBox args={[3.15, 2.06, 0.13]} radius={0.08} smoothness={4} position={[0.06, -0.02, 0]}><meshPhysicalMaterial color={form ? "#b8adc9" : "#33334e"} wireframe={wire} metalness={form ? 0.06 : 0.3} roughness={form ? 0.82 : 0.28} clearcoat={1} clearcoatRoughness={0.2} /></RoundedBox>
      <mesh position={[0.06, 0.78, 0.08]}><boxGeometry args={[3.06, 0.075, 0.03]} /><meshBasicMaterial color={wire ? "#7c5cff" : "#28293c"} /></mesh>
      <mesh position={[-0.94, -0.04, 0.09]}><boxGeometry args={[0.46, 1.47, 0.02]} /><meshBasicMaterial color={wire ? "#7c5cff" : "#1b1d2c"} wireframe={wire} /></mesh>
      {[0, 1, 2].map((i) => <mesh key={i} position={[-0.94, 0.49 - i * 0.25, 0.12]}><boxGeometry args={[0.29, 0.055, 0.01]} /><meshBasicMaterial color={i === 0 ? "#7c5cff" : "#47465e"} /></mesh>)}
      <mesh position={[0.38, 0.29, 0.12]}><planeGeometry args={[1.65, 0.59]} /><meshBasicMaterial color={wire ? "#150f2c" : form ? "#726d81" : "#171b31"} /></mesh>
      {[0, 1, 2, 3, 4, 5].map((i) => <mesh key={i} position={[-0.23 + i * 0.25, 0.1 + Math.sin(i * 1.2) * 0.11, 0.14]}><boxGeometry args={[0.11, 0.08 + i * 0.05, 0.01]} /><meshBasicMaterial color={i > 3 ? "#3de1ff" : "#7c5cff"} /></mesh>)}
      <mesh position={[0.37, -0.28, 0.13]}><planeGeometry args={[1.68, 0.34]} /><meshBasicMaterial color={wire ? "#17102c" : form ? "#91899d" : "#252638"} /></mesh>
      <mesh position={[0.01, -0.28, 0.15]}><boxGeometry args={[0.74, 0.07, 0.01]} /><meshBasicMaterial color="#7c5cff" /></mesh>
      <mesh position={[0.78, -0.28, 0.15]}><boxGeometry args={[0.51, 0.07, 0.01]} /><meshBasicMaterial color="#3de1ff" /></mesh>
      <mesh ref={scan} position={[0.25, 0, 0.19]}><planeGeometry args={[1.95, 0.007]} /><meshBasicMaterial color="#3de1ff" transparent opacity={wire ? 0.3 : 0.65} /></mesh>
      <mesh position={[0.85, 0.82, 0.19]}><sphereGeometry args={[0.036, 12, 12]} /><meshBasicMaterial color="#3de1ff" /></mesh>
    </group>
    <mesh position={[0.62, -0.95, 0.48]} rotation={[0, 0, -0.04]}><boxGeometry args={[2.06, 0.17, 0.05]} /><meshPhysicalMaterial color="#7c5cff" metalness={0.45} roughness={0.24} /></mesh>
    <mesh position={[-1.46, -0.36, 0.34]} rotation={[0, 0, 0.15]}><boxGeometry args={[0.08, 0.65, 0.06]} /><meshBasicMaterial color="#3de1ff" /></mesh>
  </group>;
}

export default function HeroCanvas({ active, mode, frame, scrollRef }: { active: boolean; mode: "WIREFRAME" | "FORM" | "FINAL"; frame: number; scrollRef: React.RefObject<number> }) {
  return <Canvas className="hero-canvas" style={{ background: "radial-gradient(circle at 50% 50%, #29213f, #11111e 70%)" }} frameloop={active ? "always" : "never"} dpr={[1, 1.5]} camera={{ position: [0, 0, 5.2], fov: 38 }} gl={{ antialias: true, powerPreference: "low-power", alpha: true }} fallback={<div />} onCreated={({ gl }) => {
    gl.domElement.addEventListener("webglcontextlost", () => { if (gl.domElement.parentElement) gl.domElement.parentElement.style.visibility = "hidden"; });
  }} aria-label="Procedural 3D motion-design composition">
    <ambientLight intensity={1.4} />
    <Environment resolution={64} frames={1}>
      <Lightformer intensity={2} color="#e9ddff" position={[0, 3, 3]} scale={[5, 3, 1]} />
      <Lightformer intensity={1.5} color="#3de1ff" position={[-3, 0, 2]} scale={[2, 4, 1]} />
    </Environment>
    <pointLight position={[2, 3, 4]} intensity={28} color="#9b85ff" />
    <pointLight position={[-3, -2, 2]} intensity={16} color="#3de1ff" />
    <Composition mode={mode} frame={frame} scrollRef={scrollRef} />
  </Canvas>;
}
