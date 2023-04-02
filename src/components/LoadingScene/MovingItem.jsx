import { useFrame } from '@react-three/fiber'
import React, { useRef } from 'react'

// for infinite bg
const OFFSET_X = 20;

// for background moving
export default function MovingItem(props) {
  const ref = useRef()
  console.log(ref)
  useFrame((_state, delta) => {
    ref.current.position.x += delta * 1.5

    if(ref.current.position.x >=OFFSET_X) {
      ref.current.position.x = -OFFSET_X
    }
  })
  return (
    <group ref={ref}>
      {props.children}
    </group>
  )
}
