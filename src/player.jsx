import React, { useRef, useEffect, useState, Suspense } from "react";
import { Box, GizmoHelper, Sphere, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useSpring, animated } from "@react-spring/three";

export function Player(props) {
  // player model(.glb)
  const { nodes, materials } = useGLTF('/models/Character.glb')

  const [active, setActive] = useState(false);
  const [animationIndex, setAnimationIndex] = useState(0);
  const [isStop, setIsStop] = useState(false);
  const player = useRef();
  const [path, setPath] = useState([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, 0, 0)
  ]);

  const position = useSpring({
    from: {
      position: [
        path[animationIndex].x,
        path[animationIndex].y,
        path[animationIndex].z
      ]
    },
    to: {
      position: [
        path[animationIndex + 1].x,
        path[animationIndex + 1].y,
        path[animationIndex + 1].z
      ]
    },
    // config: { mass: 20, tension: 50, friction: 0, clamp: true },
    loop: false,
    onRest: () => {
      if (animationIndex < path.length - 2) {
        setAnimationIndex(animationIndex + 1);
      }
    },
    onChange: () => {
      props.getCurrentPosition(player.current.position);
    },
    stop: isStop
  });

  useEffect(() => {
    setIsStop(true);
    setAnimationIndex(0);
    if (props.destinations !== null) {
      if (props.destinations.length > 0) {
        setPath(props.destinations);
      }
    }
    setIsStop(false);
  }, [props.destinations]);

  return (
    <>
      <animated.group
        {...position}
        ref={player}
        onClick={() => {
          setActive(!active);
        }}
      >
        
        {/* <Sphere scale={0.5} position={[0, 1, 0]}>
          <meshBasicMaterial color="red" />
        </Sphere> */}
        <group ref={player} {...props} dispose={null}>
          <group name="Root_Scene">
            <group name="RootNode">
              <group name="Armature" rotation={[-Math.PI / 2, 0, -Math.PI]} scale={100}>
                <primitive object={nodes.Pelvis} />
                <primitive object={nodes.KneeIkL} />
                <primitive object={nodes.HeellIkL} />
                <primitive object={nodes.ElbowIKL} />
                <primitive object={nodes.HandIKL} />
                <primitive object={nodes.KneeIkR} />
                <primitive object={nodes.HeellIkR} />
                <primitive object={nodes.ElbowIKR} />
                <primitive object={nodes.HandIKR} />
              </group>
              <skinnedMesh name="BaseMesh" geometry={nodes.BaseMesh.geometry} material={materials.Skin} skeleton={nodes.BaseMesh.skeleton} position={[0, 1.53, 0]} />
              <skinnedMesh name="Ears" geometry={nodes.Ears.geometry} material={materials.Skin} skeleton={nodes.Ears.skeleton} position={[0, 8.44, -0.34]} rotation={[0, 0.25, 0]} scale={[1.9, 1.93, 0.92]} />
              <skinnedMesh name="Shirt_01" geometry={nodes.Shirt_01.geometry} material={materials.Shirt_01} skeleton={nodes.Shirt_01.skeleton} position={[0, 4.06, -0.34]} />
              <skinnedMesh name="Shorts_01" geometry={nodes.Shorts_01.geometry} material={materials.Shorts_01} skeleton={nodes.Shorts_01.skeleton} position={[-0.02, 0.33, -0.34]} />
              <skinnedMesh name="Boots_01" geometry={nodes.Boots_01.geometry} material={materials.Boots_01} skeleton={nodes.Boots_01.skeleton} position={[0, -7.27, 0.11]} scale={0.77} />
              <group name="Hair_01" position={[-0.02, 9.68, -0.3]} rotation={[-1.11, 0, 0]} scale={0.32}>
                <skinnedMesh name="Hair_01_1" geometry={nodes.Hair_01_1.geometry} material={materials.Brown_Hair_01} skeleton={nodes.Hair_01_1.skeleton} />
                <skinnedMesh name="Hair_01_2" geometry={nodes.Hair_01_2.geometry} material={materials.DarkBrown_Hair_01} skeleton={nodes.Hair_01_2.skeleton} />
              </group>
              <group name="Face" position={[0, 8.53, 0.91]} rotation={[0, 0.39, 0]} scale={[0.15, 0.1, 0.1]}>
                <skinnedMesh name="Face_1" geometry={nodes.Face_1.geometry} material={materials.Eyebrows} skeleton={nodes.Face_1.skeleton} morphTargetDictionary={nodes.Face_1.morphTargetDictionary} morphTargetInfluences={nodes.Face_1.morphTargetInfluences} />
                <skinnedMesh name="Face_2" geometry={nodes.Face_2.geometry} material={materials.Eye_White} skeleton={nodes.Face_2.skeleton} morphTargetDictionary={nodes.Face_2.morphTargetDictionary} morphTargetInfluences={nodes.Face_2.morphTargetInfluences} />
                <skinnedMesh name="Face_3" geometry={nodes.Face_3.geometry} material={materials.Eye_Black} skeleton={nodes.Face_3.skeleton} morphTargetDictionary={nodes.Face_3.morphTargetDictionary} morphTargetInfluences={nodes.Face_3.morphTargetInfluences} />
                <skinnedMesh name="Face_4" geometry={nodes.Face_4.geometry} material={materials.Lips} skeleton={nodes.Face_4.skeleton} morphTargetDictionary={nodes.Face_4.morphTargetDictionary} morphTargetInfluences={nodes.Face_4.morphTargetInfluences} />
                <skinnedMesh name="Face_5" geometry={nodes.Face_5.geometry} material={materials.Tongue} skeleton={nodes.Face_5.skeleton} morphTargetDictionary={nodes.Face_5.morphTargetDictionary} morphTargetInfluences={nodes.Face_5.morphTargetInfluences} />
                <skinnedMesh name="Face_6" geometry={nodes.Face_6.geometry} material={materials.Teeth} skeleton={nodes.Face_6.skeleton} morphTargetDictionary={nodes.Face_6.morphTargetDictionary} morphTargetInfluences={nodes.Face_6.morphTargetInfluences} />
              </group>
            </group>
          </group>
        </group>
        
      </animated.group>
    </>
  );
}
