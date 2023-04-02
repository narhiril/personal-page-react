import { forwardRef, useImperativeHandle, useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const FlashSource = forwardRef(function FlashSource(props, forwardRef) {
    const interval = props.scalar * 0.225,
          size = useRef(1),
          meshRef = useRef(),
          isDecaying = useRef(false),
          decayTime = useRef(1);

    //split mesh ref into local ref and forward ref
    useImperativeHandle(forwardRef, () => meshRef.current);
    
    function clamp(number, min = -Number.MAX_VALUE, max = Number.MAX_VALUE){
        return Math.min(Math.max(number, min), max);
    }
    
    useFrame((_, delta) => {
        if (!props.reset) {
            //start flash
            decayTime.current += 2 * delta;
            if (size.current === 0) {
                size.current = 0.178;
            } else if (size.current > 0.175) {
                //initial ramp up
                if (!isDecaying.current) {
                    size.current *= Math.pow(1.275, decayTime.current);
                } else {
                //logarithmic fade
                    size.current = interval * (1 / Math.log(decayTime.current));
                }
            } else {
                //hold until reset
                size.current = 0.173;
            }
            
            //start decay
            if (size.current > 0.9 && !isDecaying.current) {
                isDecaying.current = true;
                decayTime.current = 1;
                return;
            }
            /*
            console.log(`size: ${size.current}, //for debugging and/or tweaking functions
                         decayTime: ${decayTime.current}, 
                         isDecaying: ${isDecaying.current}
                         scale: ${isDecaying.current ? interval * (1 / Math.log(decayTime.current)) 
                                                     : Math.pow(1.275, decayTime.current)}`);
            */
        } else {
            //reset
            decayTime.current = 1;
            size.current = 0;
            isDecaying.current = false;
        }

        size.current = clamp(size.current, 0, 1);
        meshRef.current.scale.set(size.current, size.current, size.current);

    });

    return (
        <mesh ref={meshRef} position={[0, props.flashOffset, 0]}>
            <sphereGeometry args={[props.scalar*0.55, 16, 16]}/>
            <meshBasicMaterial color={"#FFBC92"} />
        </mesh>
    );
});

export default FlashSource;
