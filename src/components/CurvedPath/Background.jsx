import { Environment, Sphere } from '@react-three/drei'
import { Gradient, LayerMaterial } from 'lamina'
import React from 'react'
import * as THREE from 'three'

export default function Background() {
  const colorA = "#7474BF";
  const colorB = "#D6A4A4";
  const start = 0.2;
  const end = -0.5;

  return (
    <>
      <Sphere scale={[400, 400, 400]}>
        <LayerMaterial color={"#ffffff"} side={THREE.BackSide}>
          <Gradient
            colorA={colorA}
            colorB={colorB}
            axes={"y"}
            start={start}
            end={end}
          />
        </LayerMaterial>
      </Sphere>
      <Environment resolution={256}>
        <Sphere
          scale={[100, 100, 100]}
          rotation-y={Math.PI / 2}
          rotation-x={Math.PI} // 구름 아래 부분이 어둡게 보여 자연스러움
        >
          <LayerMaterial color={"#ffffff"} side={THREE.BackSide}>
            <Gradient
              colorA={colorA}
              colorB={colorB}
              axes={"y"}
              start={start}
              end={end}
            />
          </LayerMaterial>
        </Sphere>
      </Environment>
    </>
  )
}
