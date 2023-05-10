import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import React, { useRef } from 'react'

export default function Bird(props) {
  const { nodes, materials } = useGLTF('/images/Flying_gull.glb')

  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Flying_seagull.geometry}
        material={materials.lambert5SG}
        scale={0.5}
      >
        <meshStandardMaterial color={"white"}/>
      </mesh>
    </group>
  )
}

useGLTF.preload('/images/Flying_gull.glb')
