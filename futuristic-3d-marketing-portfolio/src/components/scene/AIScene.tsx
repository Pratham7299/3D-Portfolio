import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import { Float, Instance, Instances, MeshDistortMaterial } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/* radial-gradient sprite used to fake bloom without a post-processing pass */
function useGlowTexture() {
  return useMemo(() => {
    const size = 256;
    const c = document.createElement("canvas");
    c.width = c.height = size;
    const ctx = c.getContext("2d")!;
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    g.addColorStop(0, "rgba(150,190,255,0.85)");
    g.addColorStop(0.28, "rgba(90,130,255,0.35)");
    g.addColorStop(0.6, "rgba(120,80,255,0.12)");
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    const tex = new THREE.CanvasTexture(c);
    tex.needsUpdate = true;
    return tex;
  }, []);
}

function fibonacciSphere(count: number, radius: number) {
  const pts: THREE.Vector3[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = golden * i;
    pts.push(new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r).multiplyScalar(radius));
  }
  return pts;
}

function ParticleField({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const blue = new THREE.Color("#5b8dff");
    const violet = new THREE.Color("#a78bfa");
    const cyan = new THREE.Color("#34e2ff");
    for (let i = 0; i < count; i++) {
      const radius = 2.05 + Math.pow(Math.random(), 0.65) * 2.6;
      const t = Math.acos(2 * Math.random() - 1);
      const p = Math.random() * Math.PI * 2;
      positions[i * 3] = radius * Math.sin(t) * Math.cos(p);
      positions[i * 3 + 1] = radius * Math.cos(t) * 0.72;
      positions[i * 3 + 2] = radius * Math.sin(t) * Math.sin(p);
      const mix = Math.random();
      const c = mix < 0.6 ? blue.clone().lerp(violet, Math.random()) : cyan.clone().lerp(blue, Math.random() * 0.5);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, colors };
  }, [count]);

  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.035;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.026} vertexColors transparent opacity={0.75} depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}

function NodeShell({ count, radius, pulse }: { count: number; radius: number; pulse: number }) {
  const nodes = useMemo(() => fibonacciSphere(count, radius), [count, radius]);
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.children.forEach((child, i) => {
      const s = 1 + Math.sin(t * 1.7 + i * 0.55) * pulse;
      child.scale.setScalar(Math.max(0.2, s));
    });
  });

  return (
    <group ref={ref}>
      <Instances limit={count} range={count}>
        <sphereGeometry args={[0.026, 10, 10]} />
        <meshStandardMaterial color="#cfe0ff" emissive="#6fa8ff" emissiveIntensity={2.4} toneMapped={false} />
        {nodes.map((p, i) => (
          <Instance key={i} position={p} />
        ))}
      </Instances>
    </group>
  );
}

function OrbitRing({ r, tilt, speed, color }: { r: number; tilt: [number, number, number]; speed: number; color: string }) {
  const ref = useRef<THREE.Group>(null);
  const sat = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed;
    if (ref.current) ref.current.rotation.set(tilt[0] + t * 0.06, t, tilt[2]);
    if (sat.current) {
      sat.current.position.set(Math.cos(t) * r, Math.sin(t) * r * 0.06, Math.sin(t) * r);
    }
  });

  return (
    <group ref={ref} rotation={tilt}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[r, 0.0042, 6, 160]} />
        <meshBasicMaterial color={color} transparent opacity={0.34} toneMapped={false} />
      </mesh>
      <mesh ref={sat}>
        <sphereGeometry args={[0.042, 14, 14]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={3.6} toneMapped={false} />
      </mesh>
    </group>
  );
}

function Rig({ motion, detail, particles, nodes }: { motion: number; detail: number; particles: number; nodes: number }) {
  const dragRef = useRef<HTMLDivElement | null>(null);
  const outer = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const shell = useRef<THREE.Mesh>(null);
  const vel = useRef({ x: 0, y: 0 });
  const spin = useRef({ x: 0, y: 0 });
  const dragging = useRef(false);
  const last = useRef({ x: 0, y: 0 });
  const glow = useGlowTexture();

  const onDown = (e: ThreeEvent<PointerEvent>) => {
    dragging.current = true;
    last.current = { x: e.nativeEvent.clientX, y: e.nativeEvent.clientY };
    (e.target as Element & { setPointerCapture?: (id: number) => void }).setPointerCapture?.(e.nativeEvent.pointerId);
    dragRef.current?.style.setProperty("cursor", "grabbing");
  };
  const onMove = (e: ThreeEvent<PointerEvent>) => {
    if (!dragging.current) return;
    const dx = e.nativeEvent.clientX - last.current.x;
    const dy = e.nativeEvent.clientY - last.current.y;
    last.current = { x: e.nativeEvent.clientX, y: e.nativeEvent.clientY };
    vel.current.y += dx * 0.00042;
    vel.current.x += dy * 0.00034;
  };
  const onUp = () => {
    dragging.current = false;
    dragRef.current?.style.setProperty("cursor", "grab");
  };

  useFrame((state, dt) => {
    const d = Math.min(dt, 0.05);
    const t = state.clock.elapsedTime;

    const decay = Math.pow(0.935, d * 60);
    if (!dragging.current) vel.current.y += 0.00035 * motion * (d * 60);
    vel.current.x *= decay;
    vel.current.y *= decay;
    spin.current.x = THREE.MathUtils.clamp(spin.current.x + vel.current.x, -0.85, 0.85);
    spin.current.y += vel.current.y;

    if (inner.current) {
      inner.current.rotation.x = THREE.MathUtils.lerp(inner.current.rotation.x, spin.current.x, 0.09);
      inner.current.rotation.y = spin.current.y;
    }
    if (outer.current) {
      outer.current.rotation.y = THREE.MathUtils.lerp(outer.current.rotation.y, state.pointer.x * 0.22, 0.05);
      outer.current.rotation.x = THREE.MathUtils.lerp(outer.current.rotation.x, -state.pointer.y * 0.16, 0.05);
      outer.current.position.y = Math.sin(t * 0.6) * 0.06 * motion;
    }
    if (core.current) core.current.rotation.set(t * 0.035 * motion, t * 0.05 * motion, 0);
    if (shell.current) shell.current.rotation.set(-t * 0.024 * motion, -t * 0.042 * motion, t * 0.01 * motion);
  });

  return (
    <group ref={outer}>
      {/* invisible drag surface */}
      <mesh position={[0, 0, 2.6]} onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerLeave={onUp}>
        <planeGeometry args={[16, 12]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* fake bloom */}
      <sprite scale={[8.4, 8.4, 1]}>
        <spriteMaterial map={glow} blending={THREE.AdditiveBlending} transparent opacity={0.62} depthWrite={false} />
      </sprite>

      <group ref={inner}>
        <mesh ref={core}>
          <icosahedronGeometry args={[1.18, detail]} />
          <MeshDistortMaterial
            color="#101a45"
            emissive="#3d7dff"
            emissiveIntensity={0.42}
            roughness={0.18}
            metalness={0.86}
            distort={0.3 * motion + 0.06}
            speed={1.6 * motion}
            envMapIntensity={0.6}
          />
        </mesh>

        <mesh ref={shell} scale={1.28}>
          <icosahedronGeometry args={[1.18, 3]} />
          <meshBasicMaterial color="#7fb2ff" wireframe transparent opacity={0.2} toneMapped={false} />
        </mesh>

        <mesh scale={1.62}>
          <sphereGeometry args={[1.18, 20, 20]} />
          <meshBasicMaterial color="#8b5cff" wireframe transparent opacity={0.07} toneMapped={false} />
        </mesh>

        <NodeShell count={nodes} radius={1.52} pulse={0.34 * motion} />
        <OrbitRing r={2.05} tilt={[0.62, 0, 0.18]} speed={0.5 * motion + 0.14} color="#34e2ff" />
        <OrbitRing r={2.42} tilt={[-1.1, 0, -0.4]} speed={-0.38 * motion - 0.1} color="#a78bfa" />
        <OrbitRing r={2.78} tilt={[1.4, 0, 0.9]} speed={0.26 * motion + 0.07} color="#7fb2ff" />
      </group>

      <ParticleField count={particles} />

      {/* floating 3D AI objects */}
      <Float speed={1.5 * motion + 0.4} rotationIntensity={1.3} floatIntensity={1.5} position={[-2.65, 1.35, -0.6]}>
        <mesh>
          <octahedronGeometry args={[0.3, 0]} />
          <meshStandardMaterial color="#1b2a63" emissive="#3d7dff" emissiveIntensity={0.7} metalness={0.9} roughness={0.2} flatShading />
        </mesh>
      </Float>
      <Float speed={1.9 * motion + 0.5} rotationIntensity={1.7} floatIntensity={1.9} position={[2.5, -1.3, 0.4]}>
        <mesh>
          <torusKnotGeometry args={[0.2, 0.062, 90, 12]} />
          <meshStandardMaterial color="#221448" emissive="#8b5cff" emissiveIntensity={0.9} metalness={0.85} roughness={0.25} />
        </mesh>
      </Float>
      <Float speed={1.2 * motion + 0.3} rotationIntensity={1.1} floatIntensity={1.2} position={[2.35, 1.75, -1.2]}>
        <mesh>
          <boxGeometry args={[0.34, 0.34, 0.34]} />
          <meshStandardMaterial color="#0d1638" emissive="#34e2ff" emissiveIntensity={0.45} metalness={0.6} roughness={0.3} wireframe />
        </mesh>
      </Float>
      <Float speed={1.7 * motion + 0.4} rotationIntensity={1.4} floatIntensity={1.6} position={[-2.45, -1.6, -0.3]}>
        <mesh>
          <icosahedronGeometry args={[0.24, 0]} />
          <meshStandardMaterial color="#2a1b58" emissive="#bda4ff" emissiveIntensity={0.8} metalness={0.8} roughness={0.2} flatShading />
        </mesh>
      </Float>
    </group>
  );
}

export default function AIScene({ active = true, motion = 1 }: { active?: boolean; motion?: number }) {
  /* scale fidelity down on small / low-power viewports, up on desktop */
  const quality = useMemo(() => {
    const w = typeof window === "undefined" ? 1440 : window.innerWidth;
    const low = w < 820 || (navigator.hardwareConcurrency ?? 8) <= 4;
    return { detail: low ? 10 : 20, particles: low ? 420 : 1100, nodes: low ? 26 : 44, dpr: low ? 1.3 : 1.75 };
  }, []);

  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, quality.dpr]}
      camera={{ position: [0, 0.35, 5.6], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ touchAction: "pan-y" }}
    >
      <ambientLight intensity={0.55} color="#9db6ff" />
      <directionalLight position={[4, 6, 5]} intensity={1.5} color="#dbe6ff" />
      <pointLight position={[-5, -2, 3]} intensity={38} color="#8b5cff" distance={14} />
      <pointLight position={[5, 3, -4]} intensity={26} color="#34e2ff" distance={16} />
      <Rig motion={motion} detail={quality.detail} particles={quality.particles} nodes={quality.nodes} />
    </Canvas>
  );
}
