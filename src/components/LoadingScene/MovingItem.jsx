import { useFrame } from '@react-three/fiber'
import React, { useEffect, useRef } from 'react'
import { randFloatSpread } from '../../../node_modules/three/src/math/MathUtils';

// for infinite bg
const OFFSET_X = 20
const RANDOMIZER_STRENGTH_SCALE = 0.5
const RANDOMIZER_STRENGTH_POSITION = 1;
// for background moving
export default function MovingItem(props) {
  const ref = useRef()

  useFrame((_state, delta) => {
    ref.current.position.x += delta * props.speed
    if(ref.current.position.x >=OFFSET_X) {
      ref.current.position.x = -OFFSET_X
    }
  })


  useEffect(() => {
    if(props.randomizePosition) {
      ref.current.position.x += randFloatSpread(RANDOMIZER_STRENGTH_POSITION)
      ref.current.position.z += randFloatSpread(RANDOMIZER_STRENGTH_POSITION)
    }

    if(props.randomizeScale) {
      ref.current.scale.x += randFloatSpread(RANDOMIZER_STRENGTH_SCALE)
      ref.current.scale.y += randFloatSpread(RANDOMIZER_STRENGTH_SCALE)
      ref.current.scale.z += randFloatSpread(RANDOMIZER_STRENGTH_SCALE)

    }
  },[])

  return (
    <group ref={ref} position={props.position}>
      {props.children}
    </group>
  )
}
