import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import GltfModel from "./model";

const ModelViewer = ({ modelPath, scale, position}) => {
  return (
    <Canvas>
      <ambientLight intensity={1} />
      <spotLight position={[0, 0, 0]} angle={1} penumbra={1} />
      <pointLight position={[100, 5, 50]} />
      <Suspense fallback={null}>
        <GltfModel modelPath={modelPath} scale={scale} position={position} />
        <OrbitControls />
      </Suspense>
    </Canvas>
  );
};

export default ModelViewer;