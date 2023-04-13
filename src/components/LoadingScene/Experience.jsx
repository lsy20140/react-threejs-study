import { ContactShadows, Environment, OrbitControls } from '@react-three/drei'
import React from 'react'
import Background from './Background'
import WolfKorrigan from './WolfKorrigan'
import HatKorrigan from './HatKorrigan'

export default function Experience() {
  return (
    <>
      <OrbitControls 
        minAzimuthAngle={-Math.PI / 4}
        maxAzimuthAngle={Math.PI / 4}
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2}
        minDistance={10}
        maxDistance={13}
      />
      <ambientLight intensity={0.2} />
      <Environment preset='sunset' intensity={0.7} blur={0.8} />
      <group position={[0, -1, 0]}>
        <Background />
        <HatKorrigan
          rotation-y={-Math.PI / 2}
          position={[0.9, 0, 2]}
          scale={[1, 1, 1]}
        />
        <WolfKorrigan
          rotation-y={-Math.PI / 2}
          position={[-1, -0.02, 2]}
          scale={[2, 2, 2]}
        />
        
      </group>
    </>
  )
}
