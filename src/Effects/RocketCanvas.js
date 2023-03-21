import "./scss/EffectsCanvas.scss";
import { Canvas } from "@react-three/fiber";
import LaunchableRocket from "./LaunchableRocket";
import * as THREE from 'three';
import { Suspense, useRef } from 'react';

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

    function getMinimumScale(info) {
        return info.scaleX >= info.scaleY ? info.scaleY : info.scaleX;
    }

    //<primitive object={new THREE.AxesHelper(1)} />

    return (  
        <div ref={divRef} id="rocket-canvas" hidden={!enabled}>
            <Canvas ref={canvasRef} camera={{position: [0, 0, 3 + (0.4*getMinimumScale(rocketInfo))]}}>
                <Suspense fallback={null}>
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
                </Suspense>
            </Canvas>
        </div>
    );
}

export default RocketCanvas;
