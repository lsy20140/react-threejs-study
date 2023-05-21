import React, { Suspense, useMemo } from 'react'
import Experience from './RapierPhysics/Experience'
import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import { KeyboardControls } from '@react-three/drei'

export const Controls = {
  forward: "forward",
  back: "back",
  left: "left",
  right: "right",
  jump: "jump"
}

export default function AppRapierPhysics() {

  const map = useMemo(() =>
    [
      { name: Controls.forward, keys: ["ArrowUp", "KeyW"] },
      { name: Controls.back, keys: ["ArrowDown", "KeyS"] },
      { name: Controls.left, keys: ["ArrowLeft", "KeyA"] },
      { name: Controls.right, keys: ["ArrowRight", "KeyD"] },
      { name: Controls.jump, keys: ["Space"] },
    ], []
  )

  return (
    <KeyboardControls map={map}>
      <Canvas shadows camera={{position: [3, 3, 3], fov: 60}}>
        <color attach="background" args={["#ececec"]} />
        <Suspense>
          <Physics debug>
            <Experience/>
          </Physics>
        </Suspense>
      </Canvas>
    </KeyboardControls>

  )
}
