import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { Physics, RigidBody } from "@react-three/rapier";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";

function Car() {
  const body = useRef();
  const wheelFL = useRef();
  const wheelFR = useRef();
  const wheelBL = useRef();
  const wheelBR = useRef();

  const [keys, setKeys] = useState({});

  useEffect(() => {
    const down = (e) => setKeys((k) => ({ ...k, [e.code]: true }));
    const up = (e) => setKeys((k) => ({ ...k, [e.code]: false }));

    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);

    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  useFrame(() => {
    if (!body.current) return;

    const force = 5;
    const torque = 0.5;

    // Forward / Back
    if (keys["KeyW"]) {
      body.current.applyImpulse({ x: 0, y: 0, z: -force });
      rotateWheels(0.2);
    }
    if (keys["KeyS"]) {
      body.current.applyImpulse({ x: 0, y: 0, z: force });
      rotateWheels(-0.2);
    }

    // Left / Right steering
    if (keys["KeyA"]) {
      body.current.applyTorqueImpulse({ x: 0, y: torque, z: 0 });
      steerWheels(0.5);
    }
    if (keys["KeyD"]) {
      body.current.applyTorqueImpulse({ x: 0, y: -torque, z: 0 });
      steerWheels(-0.5);
    }
  });

  const rotateWheels = (speed) => {
    wheelFL.current.rotation.x += speed;
    wheelFR.current.rotation.x += speed;
    wheelBL.current.rotation.x += speed;
    wheelBR.current.rotation.x += speed;
  };

  const steerWheels = (angle) => {
    wheelFL.current.rotation.y = angle;
    wheelFR.current.rotation.y = angle;
  };

  return (
    <RigidBody ref={body} colliders="cuboid" mass={1} position={[0, 1, 0]}>
      <group>
        {/* Car Body */}
        <mesh>
          <boxGeometry args={[2, 0.6, 4]} />
          <meshStandardMaterial color="red" />
        </mesh>

        {/* Cabin */}
        <mesh position={[0, 0.7, -0.5]}>
          <boxGeometry args={[1.5, 0.7, 2]} />
          <meshStandardMaterial color="darkred" />
        </mesh>

        {/* Wheels */}
        <mesh ref={wheelFL} position={[-1, -0.5, 1.5]} rotation={[Math.PI/2,0,0]}>
          <cylinderGeometry args={[0.5, 0.5, 0.4, 32]} />
          <meshStandardMaterial color="black" />
        </mesh>

        <mesh ref={wheelFR} position={[1, -0.5, 1.5]} rotation={[Math.PI/2,0,0]}>
          <cylinderGeometry args={[0.5, 0.5, 0.4, 32]} />
          <meshStandardMaterial color="black" />
        </mesh>

        <mesh ref={wheelBL} position={[-1, -0.5, -1.5]} rotation={[Math.PI/2,0,0]}>
          <cylinderGeometry args={[0.5, 0.5, 0.4, 32]} />
          <meshStandardMaterial color="black" />
        </mesh>

        <mesh ref={wheelBR} position={[1, -0.5, -1.5]} rotation={[Math.PI/2,0,0]}>
          <cylinderGeometry args={[0.5, 0.5, 0.4, 32]} />
          <meshStandardMaterial color="black" />
        </mesh>
      </group>
    </RigidBody>
  );
}

function Ground() {
  return (
    <RigidBody type="fixed">
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="lightgray" />
      </mesh>
    </RigidBody>
  );
}

export default function App() {
  return (
    <Canvas shadows camera={{ position: [8, 5, 8], fov: 50 }} style={{ height: "100vh" }}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={2} castShadow />
      <Environment preset="city" />

      <Physics gravity={[0, -9.81, 0]}>
        <Car />
        <Ground />
      </Physics>

      <OrbitControls />
    </Canvas>
  );
}