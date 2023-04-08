import { useGLTF } from "@react-three/drei";
import React, { useRef } from "react";
export default function LampPost(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF("models/LoadingScene/lamp-post.gltf");

  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        geometry={nodes.Cylinder096.geometry}
        material={materials["Black.012"]}
      />
      <mesh
        geometry={nodes.Cylinder096_1.geometry}
        material={materials["Yellow.007"]}
      >
        <meshBasicMaterial color={[1.2, 1.2, 0.6]} toneMapped={false} />
      </mesh>
    </group>
  );
}

useGLTF.preload("models/LoadingScene/lamp-post.gltf");

