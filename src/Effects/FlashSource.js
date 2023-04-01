import { forwardRef, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { animated, useSpring } from '@react-spring/three';
import * as THREE from 'three';

const FlashSource = forwardRef(function FlashSource(props, forwardRef, reset) {
    const interval = props.scalar * 0.002,
          size = useRef(1),
          { scale } = useSpring({scale: props.reset ? 0 : size });
    
    useFrame(() => {
        console.log(`size.current=${size.current}, props.reset=${props.reset}`);
        //if (size.current === null || size.current === undefined) return;
        if (!props.reset) {
            size.current = size.current > 0.01 ? size.current - interval : 0;
        } else {
            size.current = 1;
        }
    });
    

    return (
        <animated.mesh ref={forwardRef}>
            <sphereGeometry args={[props.scalar*0.25*size.current, 16, 16]}/>
            <meshBasicMaterial color={"#FFBC92"} />
        </animated.mesh>
    );
});

export default FlashSource;
