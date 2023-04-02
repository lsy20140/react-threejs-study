import { Box, Environment, Sphere } from '@react-three/drei'
import { Gradient, LayerMaterial } from 'lamina'
import React from 'react'
import * as THREE from 'three'

export default function Background() {
  return (
    <>
      <Environment preset='sunset'/>
      <Sphere scale={[200, 200, 200]}>
        <LayerMaterial
          lighting='physical'
          transmission={1}
          side={THREE.BackSide}
          >
          
          <Gradient colorA={"blue"} colorB={"white"} axes={"y"} start={0} end={-5}/>
        </LayerMaterial>
      </Sphere>
    </>
  )
}
