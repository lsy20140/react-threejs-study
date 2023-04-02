import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Rock(props) {
  const { nodes, materials } = useGLTF('/models/LoadingScene/rock.gltf')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.rocksA_forest.geometry} material={materials['Stone.007']} rotation={[Math.PI / 2, 0, 0]} />
    </group>
  )
}

useGLTF.preload('/models/LoadingScene/rock.gltf')