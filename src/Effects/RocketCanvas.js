import "./scss/EffectsCanvas.scss";
import { ReactDOM } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { DoubleSide, TextureLoader } from "three";

const RocketCanvas = ({rocketX, rocketY}) => {
    const rocketTexture = useLoader(TextureLoader, "../src/Assets/launchcodeRocketNoFlame.png");
    const zCoord = 1;
    const scalar = 1;

    return (  
        <div className="rocket-canvas three-canvas">
            <Canvas>
                <mesh visible scale={scalar}>
                    <planeBufferGeometry 
                        args={[1, 2]} 
                    />
                    <meshBasicMaterial 
                        side={DoubleSide} 
                        map={rocketTexture} 
                    />
                </mesh>
                <ambientLight 
                    intensity={0.2} 
                />
            </Canvas>
        </div>
    );
}
 
export default RocketCanvas;
