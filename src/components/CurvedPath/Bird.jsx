import { useGLTF } from '@react-three/drei'
import React from 'react'

export default function Bird(props) {
  const { nodes, materials } = useGLTF('/images/Flying_gull.glb')

  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Flying_seagull.geometry}
        material={materials.lambert5SG}
        scale={0.5}
      />
    </group>
  )
}

useGLTF.preload('/images/Flying_gull.glb')
