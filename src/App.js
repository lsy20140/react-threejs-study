import React, { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, Environment, Box } from "@react-three/drei";
import { Player } from "./player";
import { NavMesh } from "./navMesh";
import { Level } from "./level";
import { useControls } from "leva";
import "./App.css";

export default function App() {
  const [path, setPath] = useState(null);
  const [playerCurrentPosition, setPlayerCurrentPosition] = useState(
    new THREE.Vector3(1, 0, 0)
  );
  const { debug } = useControls({ debug: true });

  return (
    <div className="container">
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
        {/* {debug === true ? (
          <>
            {path?.map((position, i) => {
              return (
                <Sphere
                  scale={0.1}
                  key={i}
                  position={[position.x, position.y, position.z]}
                >
                  <meshBasicMaterial color={"hotpink"} />
                </Sphere>
              );
            })}
            <Box
              position={[
                playerCurrentPosition.x,
                playerCurrentPosition.y,
                playerCurrentPosition.z
              ]}
              scale={0.5}
            >
              <meshBasicMaterial color="red" wireframe></meshBasicMaterial>
            </Box>
            <Box position={path ? path[path.length - 1] : []} scale={0.5}>
              <meshBasicMaterial color="blue" wireframe></meshBasicMaterial>
            </Box>
          </>
        ) : (
          <></>
        )} */}
        <Suspense>
          <NavMesh
            setPath={setPath}
            playerCurrentPosition={playerCurrentPosition}
            fallback={null}
          ></NavMesh>
        </Suspense>
      </Canvas>
    </div>
  );
}
