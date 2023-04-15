import { Float, MeshReflectorMaterial, PresentationControls, Stage } from '@react-three/drei'
import React from 'react'

export default function Experience() {
  return (
    <PresentationControls enabled speed={1.8} zoom={0.2} polar={[-0.5, Math.PI / 4]} snap={false}>
      <Stage environment={"city"} intensity={0.6} contactShadow={false}>
      <Float
        speed={1} // Animation speed, defaults to 1
        rotationIntensity={1} // XYZ rotation intensity, defaults to 1
        floatIntensity={1} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
        floatingRange={[0, 1]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
      >
        <mesh>
          <boxGeometry/>
          <meshNormalMaterial/>
        </mesh>
      </Float>
      </Stage>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[170, 170]} />
        <MeshReflectorMaterial
          blur={[300,100]}
          resolution={2048}
          mixBlur={1}
          mixStrength={10}
          roughness={1}
          depthScale={1.2}
          minDepthThreshold={0.9}
          maxDepthThreshold={1}
          color={"#101010"}
          metalness={0.5}
        />
      </mesh>

    </PresentationControls>

  )
}
