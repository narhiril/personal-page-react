import "./scss/EffectsCanvas.scss";
import { ReactDOM } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import LaunchableRocket from "./LaunchableRocket";
import * as THREE from "three";

const RocketCanvas = ({rocketStartCoords, windowSize, enabled, count}) => {
    const scalar = 1,
          zCoord = 0;

    return (  
        <div className="rocket-canvas three-canvas" hidden={!enabled}>
            <Canvas orthographic camera={{zoom: 50, position: [0, 0, 100]}}>
                <LaunchableRocket scalar={scalar} 
                                  startPosition={rocketStartCoords} 
                                  count={count} 
                                  zCoord={zCoord}
                />
                <ambientLight 
                    intensity={0.2} 
                />
            </Canvas>
        </div>
    );
}
 
export default RocketCanvas;
