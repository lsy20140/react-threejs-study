import { Canvas } from '@react-three/fiber'
import React from 'react'
import Experience from './components/LoadingScene/Experience'

export default function AppLoadingScene() {
  return (
    <>
      <Canvas shadows camera={{position: [-4, 1, 7], fov: 30}}>
        {/* <axesHelper scale={50}/> */}
        <Experience />
      </Canvas>
    </>
  )
}
