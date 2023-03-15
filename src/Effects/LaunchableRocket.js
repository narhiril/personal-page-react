import { useLoader, useFrame } from "@react-three/fiber";
import * as THREE from 'three';
import { useRef } from "react";

const LaunchableRocket = ({scalar, startPosition, count, zCoord}) => {

    const root = document.getElementsByTagName("html")[0],
          theme = root.getAttribute("data-bs-theme") || "light",
          rocket = useRef(),
          flame = useRef(),
          camera = useRef(),
          frames = 12,
          flameOffset = startPosition.y + 256;

    const textures = {
                        rocket: "./textures/launchcodeRocketNoFlame.png", 
                        flame: "./textures/animation_rocketflame_12frame_512w_256offset.png",
                        logoTop: "./textures/launchcodeRocket.png",
                        logoBase: "./textures/launchcodeBase.png"
                    };

    function useFlameAnimation(tx, frameTime, frameCount) {
        const time = useRef(0),
              currentFrame = useRef(0);
        useFrame((_, dt) => {
            time.current += dt * 1000;
            if (time.current >= frameTime) {
                if (currentFrame.current + 1 > frameCount - 1) {
                    //loop the last 4 frames
                    currentFrame.current = Math.floor(Math.random() * 5) + 7;
                } else {
                    currentFrame.current += 1;
                }
                time.current = 0;
                tx.offset.x = currentFrame.current / frameCount;
            }
        });
    }

    function themeColor(th) {
        switch (th) {
            case "dark":
            case "deepblue":
                return new THREE.Color(0xf1efec);
            case "redshift":
                return new THREE.Color(0xf5dcbc);
            default:
                //launchcode logo blue
                return new THREE.Color(0x104a6d);;
        }
    }

    const rocketTx = useLoader(THREE.TextureLoader, textures.rocket),
          logoTopTx = useLoader(THREE.TextureLoader, textures.logoTop),
          logoBaseTx = useLoader(THREE.TextureLoader, textures.logoBase),
          flameAnimationTx = useLoader(THREE.TextureLoader, textures.flame);

    flameAnimationTx.minFilter = THREE.NearestFilter;
    flameAnimationTx.magFilter = THREE.NearestFilter;
    flameAnimationTx.repeat.set(1 / frames, 1);

    useFlameAnimation(flameAnimationTx, 290, frames);

    return (  
        <group>
            <mesh visible 
                  scale={scalar} 
                  ref={rocket}
                  position={[startPosition.x, startPosition.y, zCoord]}>
            <planeGeometry 
                args={[1, 1]}
            />
            <meshStandardMaterial 
                emissive={themeColor(theme)}
                side={THREE.DoubleSide} 
                map={rocketTx} 
                transparent
            />
            </mesh>
            <sprite visible 
                    args={[1, 3]}
                    scale={scalar} 
                    ref={flame}
                    position={[-8.22, 0.7, zCoord]}>
                <spriteMaterial 
                    transparent 
                    map={flameAnimationTx} 
                />
            </sprite>
        </group>
    );
}
 
export default LaunchableRocket;
