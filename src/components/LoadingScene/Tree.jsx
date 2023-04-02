import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Tree(props) {
  const { nodes, materials } = useGLTF('/models/LoadingScene/tree.gltf')
  return (
    <group {...props} dispose={null}>
      <group rotation={[Math.PI / 2, 0, 0]}>
        <mesh geometry={nodes.Cylinder017.geometry} material={materials['GreenDark.003']} />
        <mesh geometry={nodes.Cylinder017_1.geometry} material={materials['BrownDark.035']} />
      </group>
    </group>
  )
}

useGLTF.preload('/models/LoadingScene/tree.gltf')