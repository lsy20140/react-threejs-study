import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations, ContactShadows } from '@react-three/drei'

export default function HatKorrigan(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/models/LoadingScene/korrigan-hat.gltf')
  const { actions, mixer } = useAnimations(animations, group)

  useEffect(() => {
    actions["course_chapeau"].play();
    mixer.timeScale = 1.5
  },[])

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature_chapeau" rotation={[0, 0.01, 0]}>
          <primitive object={nodes.root} />
          <skinnedMesh name="Chapeau" geometry={nodes.Chapeau.geometry} material={materials['color_main.014']} skeleton={nodes.Chapeau.skeleton} />
          
        </group>
        
      </group>
      <ContactShadows scale={[16, 16]} opacity={0.42} />
    </group>
  )
}

useGLTF.preload('/models/LoadingScene/korrigan-hat.gltf')
