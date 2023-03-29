//to do: if a new press happens during a movement, the path should be recalculated from the current position
import React, { useRef, useEffect, useState, useMemo } from "react";
import * as THREE from "three";
import * as YUKA from "yuka";
import { useGLTF } from "@react-three/drei";
import { useControls } from "leva";

export function NavMesh(props) {
  let mesh = useRef();
  const [destination, setDestination] = useState([0, 0, -2.5]);
  const [navMesh, setNavMesh] = useState(null);
  const setPath = props.setPath;

  const { showNavMesh } = useControls({ showNavMesh: true });

  useMemo(async () => {
    const loader = new YUKA.NavMeshLoader;
    await loader.load("/images/navmesh_applied.glb").then((navMesh) => {
      setNavMesh(navMesh);
    });
  }, []);

  useEffect(() => {
    if (!navMesh) {
      //console.log("missing navmesh")
      return;
    } else {
      try {
        let path = navMesh.findPath(
          props.playerCurrentPosition,
          destination !== null ? destination : new THREE.Vector3(2, 2, 2)
        );

        function removeDuplicateObjects(array) {
          const seen = new Set();
          return array.filter((object) => {
            const objectString = JSON.stringify(object);
            if (seen.has(objectString)) {
              return false;
            } else {
              seen.add(objectString);
              return true;
            }
          });
        }

        if (path != null && path != undefined) {
          path = removeDuplicateObjects(path);
          setPath(path);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, [destination]);

  const { nodes, materials } = useGLTF("/images/navmesh_applied.glb");
  return (
    <>
      <mesh
        ref={mesh}
        geometry={nodes.Plane003.geometry}
        material={nodes.Plane003.material}
        onClick={(event) => {
          setDestination(event.point);
        }}
        receiveShadow
        castShadow
      >
        <meshBasicMaterial
          color={"black"}
          wireframe
          transparent={true}
          opacity={showNavMesh === true ? 1 : 0}
        />
      </mesh>
    </>
  );
}

useGLTF.preload("/navmesh_applied.glb");
