import { Float, Line, OrbitControls, useScroll, PerspectiveCamera, Text } from '@react-three/drei'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import Background from './Background'
import Cloud from './Cloud'
import Bird from './Bird'

import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { Group } from 'three'
import { Rainbow } from './Rainbow'

const LINE_NB_POINTS = 1000
const CURVE_DISTANCE = 100
const CURVE_AHEAD_CAMERA = 0.008
const CURVE_AHEAD_BIRD = 0.02
const BIRD_MAX_ANGLE = 35

export default function Experience() {
  const scroll = useScroll();

  const [pos, setPos] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)

  useEffect(() => {
    console.log("isScrolling", isScrolling)
    const timer = setInterval(()=>{
      setPos(scroll.offset)
      console.log(pos)
      setIsScrolling(false)
    }, 2000)
    
    
    return () => {
      clearInterval(timer)
    }
    

    

  },[isScrolling])

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
    1)
  }, [])

  const linePoints = useMemo(() => {
    return curve.getPoints(LINE_NB_POINTS)
  }, [curve])

  const shape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, -0.08)
    shape.lineTo(0, 0.08)
    
    return shape
  }, [curve])

  const cameraGroup = useRef();


  useFrame((_state, delta) => {    
    const scrollOffset = Math.max(0, scroll.offset)
    

    const curPoint = curve.getPoint(scrollOffset)

    // Follow the curve Points
    cameraGroup.current.position.lerp(curPoint, delta*24)

    // Make the group look ahead on the curve

    const lookAtPoint = curve.getPoint(Math.min(scrollOffset +  CURVE_AHEAD_CAMERA, 1))

    const currentLookAt = cameraGroup.current.getWorldDirection(new THREE.Vector3())

    const targetLookAt = new THREE.Vector3().subVectors(curPoint, lookAtPoint).normalize();

    const lookAt = currentLookAt.lerp(targetLookAt, delta * 24)
    cameraGroup.current.lookAt(
      cameraGroup.current.position.clone().add(lookAt)
    )

    // Bird Object Rotation

    // const tangent = curve.getTangent(scrollOffset + CURVE_AHEAD_BIRD)

    // const nonLeprLookAt = new Group();
    // nonLeprLookAt.position.copy(curPoint)
    // nonLeprLookAt.lookAt(nonLeprLookAt.position.clone().add(targetLookAt));

    // tangent.applyAxisAngle(
    //   new THREE.Vector3(0, 1, 0),
    //   -nonLeprLookAt.rotation.y
    // )

    // let angle = Math.atan2(-tangent.z, tangent.x) 
    // angle = -Math.PI / 2 + angle

    // let angleDegrees = (angle * 180) / Math.PI
    // angleDegrees *= 2.4

    // // Limit Plane Angle

    // if(angleDegrees < 0) {
    //   angleDegrees = Math.max(angleDegrees, -BIRD_MAX_ANGLE)
    // }
    // if(angleDegrees > 0) {
    //   angleDegrees = Math.min(angleDegrees, BIRD_MAX_ANGLE)
    // }

    // // Set Back Angle
    // angle = (angleDegrees * Math.PI) / 180

    // const targetBirdQuaternion = new THREE.Quaternion().setFromEuler(
    //   new THREE.Euler(
    //     bird.current.rotation.x,
    //     bird.current.rotation.y,
    //     angle,
    //   )
    // )

    // bird.current.quaternion.slerp(targetBirdQuaternion, delta * 2)    
  })

  const bird = useRef();


  return (
    <>
      <directionalLight position={[0, 3, 1]} intensity={0.1} />
      {/* <OrbitControls enableZoom={false}/> */}
      <group ref={cameraGroup} onWheel={(e) => setIsScrolling(true)}>
        <Background/>
        {isScrolling ? 
        ( <Float floatIntensity={7} speed={30} rotationIntensity={0}>
            <PerspectiveCamera position={[0, 5, 40]} fov={60} makeDefault />
          </Float>
         
          )
        :
          <PerspectiveCamera position={[0, 5, 40]} fov={60} makeDefault />   
        }


        
        {/* <group ref={bird}>
          <Float floatIntensity={5} speed={5} rotationIntensity={1}>
            <Bird rotation-y={Math.PI / 2} scale={[0.2, 0.2, 0.2]} position={[0, 2, 0]}/>
          </Float>
        </group> */}

      </group>

      {/* Text */}
      <group position={[-5, 10, -350]} rotation-y={-0.4}>
        <Text
          color={"white"}
          anchorX={"left"}
          anchorY={"center"}
          fontSize={2}
          maxWidth={15}
          font={"../../fonts/Sunflower-Medium.ttf"}
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
          font={"../../fonts/Sunflower-Medium.ttf"}
        >
          atmos website 유튜브 강의를 보며{"\n"}
          react three fiber을 공부 중입니다.
        </Text>
      </group>

      <group position={[100, 10, -10*CURVE_DISTANCE]} rotation-y={-0.2}>
        <Text
          color={"white"}
          fontSize={5}
          maxWidth={15}
          font={"../../fonts/Sunflower-Medium.ttf"}
        >
          FINISH
        </Text>
      </group>




      {/* <Line
          points={linePoints}
          color={"white"}
          opacity={0.7}
          transparent
          lineWidth={10}
      />  */}

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
            <meshStandardMaterial color={"white"} opacity={1} transparent/>
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
        scale={[8, 8, 8]}
        position={[80, 3, -700]} 
        rotation-y={-0.5}
      />
      <Cloud 
        opacity={1} 
        scale={[5,5 , 5]}
        position={[10, 3, -900]} 
      />

      <Rainbow
        scale={[8, 8, 8]}
        position={[100,-5,-10*CURVE_DISTANCE]} 
        rotation-y={-Math.PI /2}
      />
    </>
  )
}
