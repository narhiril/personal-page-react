import "./scss/EffectsCanvas.scss";
import { Canvas } from "@react-three/fiber";
import LaunchableRocket from "./LaunchableRocket";
import * as THREE from 'three';
import { useRef, useEffect } from 'react';
import useWindowDimensions from "../Shared/Hooks/useWindowDimensions";

const RocketCanvas = ({rocketInfo, enabled, count, interval}) => {
    const scalar = 1,
          zCoord = 0,
          windowDim = useWindowDimensions(),
          ref = useRef(),
          element = ref.current;
    
    let computedStyle;

    function useMovingCanvas(i) {
        const time = useRef(0),
              offset = useRef(new THREE.Vector3(0, 0, 0));

        useEffect(() => {
            time.current += 1000;
            if (time.current >= i) {
                time.current = 0;
                if (element !== undefined && element !== null) {
                    computedStyle = canvasPosition(element, rocketInfo);
                }
            }
        });
    };

    function canvasPosition(el, info) {
        const bounds = el.getBoundingClientRect(),
              left = info.x - (bounds.left / 2),
              top = info.y - (bounds.top / 2),
              infoObj = { 
                          bounds: bounds,
                          left: left, 
                          top: top,
                          scaleX: info.scaleX,
                          scaleY: info.scaleY 
                        };
        return infoObj;
    }

    useMovingCanvas(interval);

    return (  
        <div ref={ref} id="rocket-canvas" hidden={!enabled}>
            <Canvas camera={{position: [0, 0, 0.5/rocketInfo.scaleY]}}>
                <primitive object={new THREE.AxesHelper(1)} />
                <LaunchableRocket scalar={scalar} 
                                  count={count} 
                                  zCoord={zCoord}
                                  reset={!enabled}
                />
                <ambientLight 
                    intensity={0.2} 
                />
            </Canvas>
        </div>
    );
}

export default RocketCanvas;
