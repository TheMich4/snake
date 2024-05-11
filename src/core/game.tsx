import { Canvas, useThree } from "@react-three/fiber";
import { CuboidCollider, Physics, RigidBody } from "@react-three/rapier"
import { useRef } from "react";
import { PerspectiveCamera } from "three";

function Ball() {
  const ref = useRef()
  const { viewport } = useThree()
  const onCollisionEnter = () => (ref.current.setTranslation({ x: 0, y: 0, z: 0 }), ref.current.setLinvel({ x: 0, y: 10, z: 0 }))
  return (
    <>
      <RigidBody ref={ref} colliders="ball" mass={1}>
        <mesh>
          <sphereGeometry args={[0.75, 32, 32]} />
          <meshStandardMaterial color="red" />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed" colliders={false} position={[0, -viewport.height, 0]} restitution={2.1} onCollisionEnter={onCollisionEnter}>
        <CuboidCollider args={[30, 2, 30]} />
      </RigidBody>
    </>
  )
}

function Board() {
  return (
    <RigidBody colliders="cuboid" position={[0, 0, 0]} restitution={1} rotation={[Math.PI / 2, 0, 0]} type="fixed">
      <mesh>
        <boxGeometry args={[4, 5]} />
        <meshStandardMaterial color="#f1f1f1" />
      </mesh>
    </RigidBody>
  )
}

function CameraHelper() {
  const camera = new PerspectiveCamera(75, 1, 0.1);
  return (
    <group position={[0, 0, 5]}>
      <cameraHelper args={[camera]} />
    </group>
  )
}

export function Game() {

  return (
    <Canvas camera={{ fov: 75, near: 0.1, position: [0, 0, 5] }} >
      <color attach="background" args={["#e3daf7"]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <CameraHelper />


      <Physics>
        <Board />
        <Ball />
      </Physics>
    </Canvas>
  );
}
