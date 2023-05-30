import React, { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, Environment, Box } from "@react-three/drei";
import { Player } from "./player";
import { NavMesh } from "./navMesh";
import { Level } from "./level";
import "./App.css";

export default function App() {
  const [path, setPath] = useState(null);
  const [playerCurrentPosition, setPlayerCurrentPosition] = useState(
    new THREE.Vector3(1, 0, 0)
  );

  return (
    
      <Canvas>
        <ambientLight castShadow intensity={1} />
        <Suspense fallback={null}>
          <Environment preset="city" />
        </Suspense>
        <OrbitControls makeDefault />
        <Player
          destinations={path}
          getCurrentPosition={setPlayerCurrentPosition}
        ></Player>
        <Level />
        <Suspense>
          <NavMesh
            playerCurrentPosition={playerCurrentPosition}
            fallback={null}
          ></NavMesh>
        </Suspense>
      </Canvas>
  );
}
