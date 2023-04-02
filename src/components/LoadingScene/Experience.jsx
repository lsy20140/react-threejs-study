import { ContactShadows, Environment, OrbitControls } from '@react-three/drei'
import React from 'react'
import Background from './Background'
import WolfKorrigan from './WolfKorrigan'
import HatKorrigan from './HatKorrigan'

export default function Experience() {
  return (
    <>
      <OrbitControls/>
      <ambientLight intensity={0.2} />
      <Environment preset='sunset' intensity={0.7} blur={0.8} />
      <group position={[2, -1, 0]}>
        <Background />
        <HatKorrigan
          rotation-y={-Math.PI / 2}
          position={[-1.5, -0.02, 1]}
          scale={[2, 2, 2]}
        />
        <WolfKorrigan
          rotation-y={-Math.PI / 2}
          position={[-1, -0.02, 0]}
          scale={[2, 2, 2]}
        />
        
      </group>
    </>
  )
}
