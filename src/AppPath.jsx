import React from 'react'
import { ScrollControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import Experience from './components/CurvedPath/Experience'

export default function AppPath() {
  return (
    <>
      <Canvas>
        {/* <axesHelper scale={100}/> */}
        <color attach="background" arg={["#f59f9f"]}/>
        <ScrollControls pages={5} damping={1}>
          <Experience/>
        </ScrollControls>
        
      </Canvas>
    </>
  )
}
