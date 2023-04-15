import React from 'react'
import './AppProduct.css'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience'

export default function AppProduct() {
  return (
    <div className='App'>
      <Canvas>
        <color attach="background" args={["#213547"]} />
        <Experience/>
      </Canvas>

    </div>
  )
}
