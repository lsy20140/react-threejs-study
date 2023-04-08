import { Canvas } from '@react-three/fiber'
import React, { Suspense, useState } from 'react'
import {Experience} from './components/LoadingScene/Experience'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import { Loader } from '@react-three/drei'
import LoadingScreen from './components/LoadingScene/LoadingScreen'

export default function AppLoadingScene() {
  const [start, setStart] = useState(false)
  return (
    <>
      <Canvas shadows camera={{position: [-5, 1, 10], fov: 40}}>
        <axesHelper scale={50}/>
        <fog attach="fog" args={["#16a04b", 12, 30]} />
        <Suspense fallback={null}>
          {start && <Experience/> }
          
        </Suspense>
        
        <EffectComposer>
          <Bloom
            mipmapBlur
            luminanceThreshold={1}
            intensity={1.42}
            radius={0.72}
          />
        </EffectComposer>
      </Canvas>
      <LoadingScreen started={start} onStarted={() => setStart(true)}/>
    </>
  )
}
