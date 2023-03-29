import React, { useRef, useEffect, useState, Suspense } from "react";
import { Box, Sphere } from "@react-three/drei";
import * as THREE from "three";
import { useSpring, animated } from "@react-spring/three";

export function Player(props) {
  const [active, setActive] = useState(false);
  const [animationIndex, setAnimationIndex] = useState(0);
  const [isStop, setIsStop] = useState(false);
  const player = useRef();
  const [path, setPath] = useState([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, 0, 0)
  ]);

  const position = useSpring({
    from: {
      position: [
        path[animationIndex].x,
        path[animationIndex].y,
        path[animationIndex].z
      ]
    },
    to: {
      position: [
        path[animationIndex + 1].x,
        path[animationIndex + 1].y,
        path[animationIndex + 1].z
      ]
    },
    // config: { mass: 20, tension: 50, friction: 0, clamp: true },
    loop: false,
    onRest: () => {
      if (animationIndex < path.length - 2) {
        setAnimationIndex(animationIndex + 1);
      }
    },
    onChange: () => {
      props.getCurrentPosition(player.current.position);
    },
    stop: isStop
  });

  useEffect(() => {
    setIsStop(true);
    setAnimationIndex(0);
    if (props.destinations !== null) {
      if (props.destinations.length > 0) {
        setPath(props.destinations);
      }
    }
    setIsStop(false);
  }, [props.destinations]);

  return (
    <>
      <animated.group
        {...position}
        ref={player}
        onClick={() => {
          setActive(!active);
        }}
      >
        
        <Sphere scale={0.5} position={[0, 1, 0]}>
          <meshBasicMaterial color="red" />
        </Sphere>
        
      </animated.group>
    </>
  );
}
