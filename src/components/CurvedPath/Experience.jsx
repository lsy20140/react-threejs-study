import { Float, Line, OrbitControls, useScroll, PerspectiveCamera, Text } from '@react-three/drei'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import Background from './Background'
import Cloud from './Cloud'
import Bird from './Bird'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

const LINE_NB_POINTS = 12000
const CURVE_DISTANCE = 100

export default function Experience() {
  const scroll = useScroll();

  const [pos, setPos] = useState(0)
  useEffect(() => {
    const timer = setInterval(()=>{
      setPos(scroll.offset)
      console.log(pos)
    }, 3000)

    return () => {
      clearInterval(timer)
    }
  },[pos])

  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(0,0,0),
      new THREE.Vector3(0,0,-1*CURVE_DISTANCE),
      new THREE.Vector3(-20,0,-2*CURVE_DISTANCE),
      new THREE.Vector3(-10,0,-3*CURVE_DISTANCE),
      new THREE.Vector3(0,0,-4*CURVE_DISTANCE),
      new THREE.Vector3(10,0,-5*CURVE_DISTANCE),
      new THREE.Vector3(20,0,-6*CURVE_DISTANCE),
      new THREE.Vector3(10,0,-7*CURVE_DISTANCE),
      new THREE.Vector3(50,0,-8*CURVE_DISTANCE),
      new THREE.Vector3(80,0,-9*CURVE_DISTANCE),
      new THREE.Vector3(100,0,-10*CURVE_DISTANCE),
    ],
    false,
    "catmullrom",
    0.2)
  }, [])

  const linePoints = useMemo(() => {
    return curve.getPoints(LINE_NB_POINTS)
  }, [curve])

  const shape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, -2)
    shape.lineTo(0, 0.2)
    
    return shape
  }, [curve])

  const cameraGroup = useRef();

  useFrame((_state, delta) => {
    
    const curPointIndex = Math.min(
      Math.round(scroll.offset * linePoints.length),
      linePoints.length - 1
    )
    const curPoint = linePoints[curPointIndex]
    // curve 방향 따라 Bird model이 바라보는 방향 틀기
    const pointAhead = linePoints[Math.min(curPointIndex + 1, linePoints.length - 1)];
    
    const xDisplacement = (pointAhead.x - curPoint.x) * 10

    // Math.PI / 2 -> LEFT
    // -Math.PI / 2 -> RIGHT

    const angleRotation = (xDisplacement < 0 ? 1 : -1) * 
    Math.min(Math.abs(xDisplacement), Math.PI / 5)

    const targetBirdQuaternion = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(
        bird.current.rotation.x,
        bird.current.rotation.y,
        angleRotation,
      )
    )

    const targetCameraQuaternion = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(
        cameraGroup.current.rotation.x,
        cameraGroup.current.rotation.z,
        angleRotation,
      )
    )

    bird.current.quaternion.slerp(targetBirdQuaternion, delta * 2)
    cameraGroup.current.quaternion.slerp(targetCameraQuaternion, delta * 2)

    cameraGroup.current.position.lerp(curPoint, delta*24)
  })

  const bird = useRef();

  return (
    <>
      
      {/* <OrbitControls enableZoom={false}/> */}
      <group ref={cameraGroup}>
        <Background/>
        <PerspectiveCamera position={[0, 5, 40]} fov={60} makeDefault />
        <group ref={bird}>
          <Float floatIntensity={5} speed={5} rotationIntensity={1}>
            <Bird rotation-y={Math.PI / 2} scale={[0.2, 0.2, 0.2]} position={[0, 2, 0]}/>
          </Float>
        </group>

      </group>

      {/* Text */}
      <group position={[0, 10, -350]}>
        <Text
          color={"white"}
          anchorX={"left"}
          anchorY={"center"}
          fontSize={2}
          maxWidth={15}
          font={"../../fonts/Dokdo-Regular.ttf"}
        >
          안녕하세요
        </Text>
        <Text
          color={"white"}
          anchorX={"left"}
          anchorY={"top"}
          position-y={-2.5}
          fontSize={1.5}
          maxWidth={30}
          font={"../../fonts/Dokdo-Regular.ttf"}
        >
          atmos website 유튜브 강의를 따라하며{"\n"}
          react-three-fiber을 공부 중입니다.
        </Text>
      </group>




      <Line
          points={linePoints}
          color={"white"}
          opacity={0.7}
          transparent
          lineWidth={10}
      /> 

      <group position={[0, 1, 0]}>
        <mesh>
          <extrudeGeometry
            args={[
              shape, 
              {
                steps: LINE_NB_POINTS,
                bevelEnabled: false,
                extrudePath: curve,
              }
            ]} />
            <meshStandardMaterial color={"white"} opacity={0} transparent/>
        </mesh>
      </group>

      <Cloud 
        opacity={1} 
        scale={[10, 10, 10]} 
        rotation-y={Math.PI / 9}
        position={[-40, -4, -20]} 
      />        
      <Cloud 
        opacity={0.8} 
        scale={[10, 10, 10]} 
        position={[50, 5, -100]} 
      />
      <Cloud 
        opacity={1} 
        scale={[5, 5, 5]}
        position={[-30, 5, -150]} 
      />
      <Cloud 
        opacity={0.7} 
        scale={[5, 5, 5]}
        position={[20, 2, -300]} 
      />
      <Cloud 
        opacity={0.4} 
        scale={[3, 3, 3]}
        position={[20, 10, -500]} 
      />
      <Cloud 
        opacity={1} 
        scale={[3, 3, 3]}
        position={[10, 3, -800]} 
      />

    </>
  )
}
