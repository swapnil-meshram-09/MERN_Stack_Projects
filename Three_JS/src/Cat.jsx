
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function Cat() {
  const group = useRef();
  const tail = useRef();
  const head = useRef();
  const legFL = useRef();
  const legFR = useRef();
  const legBL = useRef();
  const legBR = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Walk motion (up-down body)
    group.current.position.y = Math.sin(t * 4) * 0.05;

    // Head slight movement
    head.current.rotation.y = Math.sin(t * 2) * 0.2;

    // Tail swing
    tail.current.rotation.z = Math.sin(t * 5) * 0.5;

    // Leg walking animation
    legFL.current.rotation.x = Math.sin(t * 6) * 0.5;
    legBR.current.rotation.x = Math.sin(t * 6) * 0.5;

    legFR.current.rotation.x = Math.sin(t * 6 + Math.PI) * 0.5;
    legBL.current.rotation.x = Math.sin(t * 6 + Math.PI) * 0.5;
  });

  return (
    <group ref={group} position={[0, 0, 0]}>

      {/* Body */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[2, 1, 1]} />
        <meshStandardMaterial color="#ffb347" />
      </mesh>

      {/* Head */}
      <group ref={head} position={[1.3, 0.9, 0]}>
        <mesh>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial color="#ffb347" />
        </mesh>

        {/* Eyes */}
        <mesh position={[0.3, 0.1, 0.4]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="black" />
        </mesh>

        <mesh position={[0.3, 0.1, -0.4]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="black" />
        </mesh>

        {/* Ears */}
        <mesh position={[0, 0.6, 0.3]}>
          <coneGeometry args={[0.2, 0.5, 16]} />
          <meshStandardMaterial color="#ff9966" />
        </mesh>

        <mesh position={[0, 0.6, -0.3]}>
          <coneGeometry args={[0.2, 0.5, 16]} />
          <meshStandardMaterial color="#ff9966" />
        </mesh>
      </group>

      {/* Tail */}
      <mesh ref={tail} position={[-1.2, 0.8, 0]} rotation={[0, 0, 0.5]}>
        <cylinderGeometry args={[0.1, 0.1, 1.5, 16]} />
        <meshStandardMaterial color="#ffb347" />
      </mesh>

      {/* Legs */}
      <mesh ref={legFL} position={[0.7, 0, 0.4]}>
        <cylinderGeometry args={[0.15, 0.15, 1, 16]} />
        <meshStandardMaterial color="#ff9966" />
      </mesh>

      <mesh ref={legFR} position={[0.7, 0, -0.4]}>
        <cylinderGeometry args={[0.15, 0.15, 1, 16]} />
        <meshStandardMaterial color="#ff9966" />
      </mesh>

      <mesh ref={legBL} position={[-0.7, 0, 0.4]}>
        <cylinderGeometry args={[0.15, 0.15, 1, 16]} />
        <meshStandardMaterial color="#ff9966" />
      </mesh>

      <mesh ref={legBR} position={[-0.7, 0, -0.4]}>
        <cylinderGeometry args={[0.15, 0.15, 1, 16]} />
        <meshStandardMaterial color="#ff9966" />
      </mesh>

    </group>
  );
}

export default function App() {
  return (
    <Canvas camera={{ position: [5, 3, 5], fov: 60 }} style={{ height: "100vh" }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={2} />
      <Environment preset="city" />
      <Cat />
      <OrbitControls enableZoom={true} />
    </Canvas>
  );
}