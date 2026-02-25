import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Sky } from "@react-three/drei";
import { useRef, useEffect, useMemo } from "react";
import * as THREE from "three";

/* ================= CAR ================= */
function Car({ carRef }) {
  const texture = useLoader(THREE.TextureLoader, "/car.jpg");

  const velocity = useRef(0);
  const direction = useRef(0);
  const keys = useRef({});
  const wheelSpin = useRef(0);
  const steerAngle = useRef(0);

  useEffect(() => {
    const down = (e) => (keys.current[e.code] = true);
    const up = (e) => (keys.current[e.code] = false);

    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);

    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  useFrame((_, delta) => {
    if (!carRef.current) return;

    // Acceleration
    if (keys.current["KeyW"] || keys.current["ArrowUp"])
      velocity.current += 25 * delta;

    if (keys.current["KeyS"] || keys.current["ArrowDown"])
      velocity.current -= 25 * delta;

    // Steering
    if (keys.current["KeyA"] || keys.current["ArrowLeft"])
      steerAngle.current = 0.6;
    else if (keys.current["KeyD"] || keys.current["ArrowRight"])
      steerAngle.current = -0.6;
    else
      steerAngle.current = 0;

    direction.current += steerAngle.current * velocity.current * 0.02;

    // Friction
    velocity.current *= 0.98;

    // Move
    carRef.current.rotation.y = direction.current;
    carRef.current.position.x -= Math.sin(direction.current) * velocity.current;
    carRef.current.position.z -= Math.cos(direction.current) * velocity.current;

    // Wheel spin
    wheelSpin.current += velocity.current * 0.5;
  });

  return (
    <group ref={carRef} position={[0, 1, 0]}>

      {/* Main Body */}
      <mesh>
        <boxGeometry args={[4, 1, 8]} />
        <meshStandardMaterial map={texture} />
      </mesh>

      {/* Upper Cabin */}
      <mesh position={[0, 1, -1]}>
        <boxGeometry args={[3, 1.2, 4]} />
        <meshStandardMaterial map={texture} />
      </mesh>

      {/* Wheels */}
      {[[-2.5, -0.8, 3], [2.5, -0.8, 3], [-2.5, -0.8, -3], [2.5, -0.8, -3]].map(
        (pos, i) => (
          <mesh
            key={i}
            position={pos}
            rotation={[wheelSpin.current, 0, 0]}
          >
            <cylinderGeometry args={[1, 1, 0.8, 32]} />
            <meshStandardMaterial color="black" />
          </mesh>
        )
      )}

    </group>
  );
}

/* ================= INFINITE ROAD ================= */
function Road() {
  const roadRef = useRef();

  useFrame(({ camera }) => {
    roadRef.current.position.z =
      Math.floor(camera.position.z / 300) * 300;
  });

  return (
    <mesh
      ref={roadRef}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, 0.01, 0]}
    >
      <planeGeometry args={[30, 300]} />
      <meshStandardMaterial color="#666666" />
    </mesh>
  );
}

/* ================= GROUND ================= */
function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[12000, 12000]} />
      <meshStandardMaterial color="#2e8b57" />
    </mesh>
  );
}

/* ================= TREES ================= */
function Trees() {
  const trees = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 500; i++) {
      const x = (Math.random() - 0.5) * 10000;
      const z = (Math.random() - 0.5) * 10000;

      arr.push(
        <group key={i} position={[x, 0, z]}>
          <mesh position={[0, 4, 0]}>
            <cylinderGeometry args={[0.8, 0.8, 8, 8]} />
            <meshStandardMaterial color="#8B4513" />
          </mesh>

          <mesh position={[0, 10, 0]}>
            <coneGeometry args={[4, 10, 8]} />
            <meshStandardMaterial color="green" />
          </mesh>
        </group>
      );
    }
    return arr;
  }, []);

  return <>{trees}</>;
}

/* ================= FOLLOW CAMERA ================= */
function FollowCamera({ target }) {
  useFrame(({ camera }) => {
    if (!target.current) return;

    const offset = new THREE.Vector3(0, 6, 20)
      .applyAxisAngle(new THREE.Vector3(0, 1, 0), target.current.rotation.y)
      .add(target.current.position);

    camera.position.lerp(offset, 0.1);
    camera.lookAt(target.current.position);
  });

  return null;
}

/* ================= MAIN APP ================= */
export default function App() {
  const carRef = useRef();

  return (
    <Canvas camera={{ position: [0, 6, 20], fov: 60 }} style={{ height: "100vh" }}>
      <Sky sunPosition={[100, 20, 100]} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[200, 200, 200]} intensity={1.5} />

      <Car carRef={carRef} />
      <Ground />
      <Road />
      <Trees />
      <FollowCamera target={carRef} />
    </Canvas>
  );
}