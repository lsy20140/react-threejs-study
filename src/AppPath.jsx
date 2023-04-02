import React from 'react'
import Experience from './components/Experience'
import { ScrollControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

export default function AppPath() {
  return (
    <>
      <Canvas>
        <color attach="background" arg={["#f59f9f"]}/>
        <ScrollControls pages={5} damping={0.2}>
          <Experience/>
        </ScrollControls>
        
      </Canvas>
    </>
  )
}
