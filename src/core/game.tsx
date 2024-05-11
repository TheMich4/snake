import { Canvas, useThree } from "@react-three/fiber";
import { CuboidCollider, Physics, RigidBody } from "@react-three/rapier"
import { useEffect, useRef } from "react";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";

function Ball() {
  const ref = useRef()
  const { viewport } = useThree()
  const onCollisionEnter = () => (ref.current.setTranslation({ x: 0, y: 0, z: 0 }), ref.current.setLinvel({ x: 0, y: 10, z: 0 }))
  return (
    <>
      <RigidBody ref={ref} colliders="ball" mass={1}>
        <mesh position={[0, 1.5, 0]}>
          <sphereGeometry args={[0.35, 32, 32]} />
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
    <RigidBody colliders="cuboid" position={[0, 0, 0]} restitution={1.2} rotation={[Math.PI / 2, 0, 0]} type="fixed">
      <mesh>
        <boxGeometry args={[4, 5, 0.1]} />
        <meshStandardMaterial color="#107ab0" />
      </mesh>
    </RigidBody>
  )
}

function CameraHelper() {
  const { camera } = useThree();
  const cameraRef = useRef(camera)

  useEffect(() => {
    const logCameraPosition = () => {
      const { x, y, z } = cameraRef.current.position
      const roundedX = Math.round(x * 100) / 100
      const roundedY = Math.round(y * 100) / 100
      const roundedZ = Math.round(z * 100) / 100

      console.log(`Camera position: (x: ${roundedX}, y: ${roundedY}, z: ${roundedZ})`)

    }

    cameraRef.current = camera;
    window.addEventListener('mousedown', logCameraPosition)

    return () => window.removeEventListener('mousedown', logCameraPosition)
  }, [])

  return (
    <group position={camera.position}>
      <cameraHelper args={[camera]} />
    </group>
  )
}

function Camera() {

  return (
    <>
      <PerspectiveCamera
        makeDefault
        name="camera"
        zoom={0.75}
        fov={95}
        near={0.1}
        far={100}
        position={[0, Math.PI, Math.PI / 4]}
        rotation={[0, 0, 0]}
      />
      <CameraHelper />
    </>
  )
}

export function Game() {
  return (
    <Canvas>
      <color attach="background" args={["#e3daf7"]} />
      <ambientLight intensity={2} />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls />
      <Camera />


      <Physics>
        <Board />
        <Ball />
      </Physics>
    </Canvas>
  );
}
