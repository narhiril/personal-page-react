import "./scss/EffectsCanvas.scss";
import { Canvas, useThree } from "@react-three/fiber";
import LaunchableRocket from "./LaunchableRocket";
import * as THREE from 'three';

const RocketCanvas = ({rocketInfo, enabled, count}) => {
    const scalar = 1,
          zCoord = 0;

    return (  
        <div className="rocket-canvas three-canvas" hidden={!enabled}>
            <Canvas camera={{position: [0, 0, 5]}}>
                <primitive object={new THREE.AxesHelper(1)} />
                <LaunchableRocket scalar={scalar} 
                                  startPosition={rocketInfo} 
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
