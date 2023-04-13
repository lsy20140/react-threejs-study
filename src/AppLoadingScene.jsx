import { Canvas } from '@react-three/fiber'
import React, { Suspense, lazy, useState } from 'react'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import { Loader } from '@react-three/drei'
import LoadingScreen from './components/LoadingScreen'

const Experience = lazy(() => import('./components/LoadingScene/Experience'))

export default function AppLoadingScene() {
  const [start, setStart] = useState(false)
  return (
    <>
      <Canvas shadows camera={{position: [-5, 1, 10], fov: 40}}>
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
      <LoadingScreen started={start} onStarted={() => setStart(true)} text={"시작하시겠습니까?"}/>
    </>
  )
}
