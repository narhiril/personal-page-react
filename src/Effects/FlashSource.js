import { forwardRef, useImperativeHandle, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { animated, useSpring } from '@react-spring/three';
import * as THREE from 'three';

const FlashSource = forwardRef(function FlashSource(props, forwardRef) {
    const interval = props.scalar * 0.005,
          size = useRef(1),
          meshRef = useRef(),
          logDelta = useRef(0),
          decayTime = useRef(1);

    useImperativeHandle(forwardRef, () => meshRef.current);
    
    useFrame((_, delta) => {
        /*
        logDelta.current += delta;
        if (logDelta.current > delta * 15) {
            console.log(`delta: ${delta}, props.reset=${props.reset}, size.current=${size.current}, scale=${meshRef.current.scale}`);
            for (const prop in meshRef.current.scale) {
                if (forwardRef.current.scale.hasOwnProperty(prop)) {
                    console.log(`${prop}: ${meshRef.current.scale[prop]}`);
                }
            }
            logDelta.current = 0;
        }
        */

        if (!props.reset) {
            decayTime.current += delta;
            if (size.current === 0) {
                size.current = 1;
            } else if (size.current > 0.1) {
                size.current *= Math.pow(1-interval, decayTime.current);
                console.log(`size: ${size.current}, 1-interval: ${1-interval}, decayTime: ${decayTime.current} scale: ${Math.pow(1-interval, decayTime.current)}`);
            } else {
                size.current = 0.025;
            }
        } else {
            decayTime.current = 1;
            size.current = 0;
        }

        meshRef.current.scale.set(size.current, size.current, size.current);

    });

    return (
        <mesh ref={meshRef} position={[0, props.flashOffset, 0]}>
            <sphereGeometry args={[props.scalar*0.5, 16, 16]}/>
            <meshBasicMaterial color={"#FFBC92"} />
        </mesh>
    );
});

export default FlashSource;
