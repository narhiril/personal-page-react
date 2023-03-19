import "./scss/EffectsCanvas.scss";
import { Canvas } from "@react-three/fiber";
import LaunchableRocket from "./LaunchableRocket";
import * as THREE from 'three';
import { useRef } from 'react';
import { useFBO } from "@react-three/drei";

const RocketCanvas = ({rocketInfo, enabled, count, interval, tPlus}) => {
    const scalar = 1,
          zCoord = 0,
          canvasRef = useRef(),
          divRef = useRef(),
          canvasElement = canvasRef.current,
          divElement = divRef.current,
          canvasDimensions = getCanvasDims(canvasElement);
    
    function getCanvasDims(el) {
        if (el === null || el === undefined) {
            return new THREE.Vector2();
        } else {
            return new THREE.Vector2(el.width, el.height);
        }
    }
    
    /*
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
    */

    function getMinimumScale(info) {
        return info.scaleX >= info.scaleY ? info.scaleY : info.scaleX;
    }

    //useMovingCanvas(interval);

    return (  
        <div ref={divRef} id="rocket-canvas" hidden={!enabled}>
            <Canvas ref={canvasRef} camera={{position: [0, 0, 3 + (0.4*getMinimumScale(rocketInfo))]}}>
                <primitive object={new THREE.AxesHelper(1)} />
                <LaunchableRocket scalar={scalar} 
                                  count={count} 
                                  zCoord={zCoord}
                                  reset={!enabled}
                                  interval={interval}
                                  tPlus={tPlus}
                                  canvasDim={canvasDimensions}
                                  div={divElement}
                />
                <ambientLight 
                    intensity={0.2} 
                />
            </Canvas>
        </div>
    );
}

export default RocketCanvas;
