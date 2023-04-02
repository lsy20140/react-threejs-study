import React, { useRef } from 'react'
import LampPost from './LampPost';
import Tree from './Tree';
import Rock from './Rock';
import MovingItem from './MovingItem';
import { Environment } from '@react-three/drei';

export default function Background() {
  const ref = useRef();
  return (
    <>
      <Environment files='/images/industrial_sunset_puresky_4k.hdr' background/>
      <group position={[0, 0, 0]} ref={ref}>
        <MovingItem>
          <LampPost scale={[0.5, 0.5, 0.5]} position={[0, 0, -1.5]} />
          <Tree scale={[0.5, 0.5, 0.5]} position={[0, 0, -3.5]} />

          <Tree scale={[1, 1, 1]} position={[-3, 0, -6]} />

          <Rock scale={[0.3, 0.3, 0.3]} position={[0, 0, 1]} />
        </MovingItem>
      </group>
    </>
  )
}
