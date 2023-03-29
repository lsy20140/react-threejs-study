import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Level(props) {
  const { nodes, materials } = useGLTF("/images/level_applied.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        rotation={[-Math.PI / 2, 0, 0]}
        geometry={nodes.Plane001.geometry}
        material={nodes.Plane001.material}
      />
    </group>
  );
}

useGLTF.preload("/level_applied.glb");
