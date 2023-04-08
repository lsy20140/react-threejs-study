import React, { useEffect, useRef } from 'react'
import LampPost from './LampPost';
import Tree from './Tree';
import Rock from './Rock';
import MovingItem from './MovingItem';
import { Environment } from '@react-three/drei';
import { useControls } from 'leva';

const OFFSET_X = 20;
const LAMPS_NB = 10;
const LAMPS_SPEED = 1;
const TREES_NB = 10;
const TREES_SPEED = 0.5;
const FAR_TREES_NB = 8;
const FAR_TREES_SPEED = 0.1;
const ROCKS_NB = 3;
const ROCKS_SPEED = 0.6;


export default function Background(){
  const ref = useRef();

  const {lampsNb, treesNb, farTreesNb, rocksNb, lampsSpeed, treesSpeed, farTreesSpeed, rocksSpeed} = useControls({
    lampsNb: {
      value: LAMPS_NB,
      min: 1,
      max: 100,
      step: 1,
    },
    treesNb: {
      value: TREES_NB,
      min:1,
      max: 100,
      step: 1
    },
    farTreesNb: {
      value: FAR_TREES_NB,
      min:1,
      max: 100,
      step: 1
    },
    rocksNb: {
      value: ROCKS_NB,
      min:1,
      max: 100,
      step: 1
    },
    lampsSpeed: {
      value: LAMPS_SPEED,
      min: 0.1,
      max: 2,
      step: 0.05,
    },
    treesSpeed: {
      value: TREES_SPEED,
      min:0.1,
      max: 2,
      step: 0.05
    },
    farTreesSpeed: {
      value: FAR_TREES_SPEED,
      min:0.1,
      max: 2,
      step: 0.05
    },
    rocksSpeed: {
      value: ROCKS_SPEED,
      min:0.1,
      max: 2,
      step: 0.05
    }
  })


  return (
    <>
      <Environment files='/images/industrial_sunset_puresky_4k.hdr' background/>
      <group position={[0, 0, 0]} ref={ref}>
        {[...Array(lampsNb)].map((_v, idx) => (
          <MovingItem 
            key={idx} 
            position={[-OFFSET_X + (idx / lampsNb) * OFFSET_X * 2, 0, -1.5]} 
            speed={lampsSpeed}
          >
            <LampPost scale={[0.5, 0.5, 0.5]} />
          </MovingItem>
        ))}
        {[...Array(treesNb)].map((_v, idx) => (
          <MovingItem 
            key={idx} 
            position={[-OFFSET_X + (idx / treesNb) * OFFSET_X * 2, 0, -3.5]}
            speed={treesSpeed}
            randomizePosition
            randomizeScale
          >
            <Tree scale={[0.5, 0.5, 0.5]} />
          </MovingItem>
        ))}
        {[...Array(farTreesNb)].map((_v, idx) => (
          <MovingItem 
            key={idx} 
            position={[-OFFSET_X + (idx / farTreesNb) * OFFSET_X * 2, 0, -6]}
            speed={farTreesSpeed}
            randomizePosition
            randomizeScale
          >
            <Tree scale={[1, 1, 1]} />
          </MovingItem>
        ))}
        {[...Array(rocksNb)].map((_v, idx) => (
          <MovingItem 
            key={idx} 
            position={[-OFFSET_X + (idx / rocksNb) * OFFSET_X * 2, 0, 1]}
            speed={rocksSpeed}
            randomizeScale
          >
            <Rock scale={[0.3, 0.3, 0.3]} />
          </MovingItem>
        ))}

      </group>
    </>
  )
}
