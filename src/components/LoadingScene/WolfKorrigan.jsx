import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations, ContactShadows } from '@react-three/drei'

export default function WolfKorrigan(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/models/LoadingScene/korrigan-wolf.gltf')

  const { actions, mixer } = useAnimations(animations, group);
  useEffect(() => {
    actions["course_cavalier"].play();
    actions["course_loup"].play();
    mixer.timeScale = 1.5
  },[])
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature_cavalier" rotation={[0, 0.48, 0]} scale={0.15}>
          <primitive object={nodes.root} />
          <skinnedMesh name="Cavalier" geometry={nodes.Cavalier.geometry} material={materials['color_main.015']} skeleton={nodes.Cavalier.skeleton} />
        </group>
        <group name="Armature_loup" scale={0.61}>
          <primitive object={nodes.spine004} />
          <skinnedMesh name="Loup" geometry={nodes.Loup.geometry} material={materials['color_main.002']} skeleton={nodes.Loup.skeleton} />
        </group>
        
      </group>
      <ContactShadows scale={[16, 16]} opacity={0.42} />
    </group>
  )
}

useGLTF.preload('/models/LoadingScene/korrigan-wolf.gltf')
