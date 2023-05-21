import React, { Suspense } from 'react'
import Experience from './RapierPhysics/Experience'
import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'

export default function AppRapierPhysics() {
  return (
    <Canvas shadows camera={{position: [3, 3, 3], fov: 60}}>
      <color attach="background" args={["#ececec"]} />
      <Suspense>
        <Physics debug>
          <Experience/>
        </Physics>
      </Suspense>
    </Canvas>
  )
}
