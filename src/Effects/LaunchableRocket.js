import { useLoader, useFrame, useThree } from "@react-three/fiber";
import * as THREE from 'three';
import { useRef, useMemo } from "react";
import BasePlate from "./BasePlate";

const LaunchableRocket = ({scalar, count, interval, tPlus, reset, zCoord, canvasDim, div}) => {

    //COMPONENT VARIABLES
    const root = document.getElementsByTagName("html")[0],
          theme = root.getAttribute("data-bs-theme") || "light",
          rocket = useRef(),
          flame = useRef(),
          group = useRef(),
          motion = useRef(0),
          sceneStartCoords = new THREE.Vector3(0, 0, zCoord),
          { scene, camera, gl, clock } = useThree(),
          frames = 12;
          
    const offsets = useMemo(() => ({
        base: (-0.585 * scalar) - 0.25,
        flame: -0.585 * scalar
    }), [scalar]);

    //TEXTURE SETUP
    const textures = {
                        rocket: "./textures/launchcodeRocketNoFlame.png", 
                        flame: "./textures/animation_rocketflame_12frame_512w_256offset.png"
                    };

    const rocketTx = useLoader(THREE.TextureLoader, textures.rocket),
          flameAnimationTx = useLoader(THREE.TextureLoader, textures.flame);

    flameAnimationTx.minFilter = THREE.NearestFilter;
    flameAnimationTx.magFilter = THREE.NearestFilter;
    flameAnimationTx.repeat.set(1 / frames, 1);

    useFlameAnimation(flameAnimationTx, 150, frames, interval*(count+1));

    //RENDER LOOP
    function useFlameAnimation(tx, frameTime, frameCount, delay) {
        const time = useRef(-delay-frameTime),
              currentFrame = useRef(0),
              hasFired = useRef(false);
        useFrame((_, delta) => {
            if (reset) {
                currentFrame.current = 0;
                time.current = -delay-frameTime;
                hasFired.current = false;
                flame.current.material.opacity = 0;
                tx.offset.x = 0;
                motion.current = 0;
                group.current.position.z = sceneStartCoords.z;
                group.current.position.y = sceneStartCoords.y;
                group.current.rotation.z = 0;
                return;
            }
            //handles upwards movement
            if (motion.current > 0 && hasFired.current) {
                group.current.position.y += (motion.current * 0.0025);
                motion.current += 0.025;
            }
            time.current += delta * 1000;
            //handles trigger for flame animation start
            if (!hasFired.current && time.current > 0 && flame.current.material.opacity === 0) {
                hasFired.current = true;
                flame.current.material.opacity = 1;
                console.log("Liftoff");
                motion.current += 1;
            }
            //sets flame animation next frame
            if (time.current >= frameTime) {
                //slight wobble on ascent
                group.current.rotation.z += 0.0045 * Math.sin(clock.getElapsedTime());
                if (currentFrame.current + 1 > frameCount - 1) {
                    //random cycle the last 5 frames
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

    return (
        <group>
            <group ref={group}>              
                <mesh visible 
                      scale={scalar} 
                      ref={rocket}
                      position={[0, 0, 0]}>
                <planeGeometry args={[1, 1]} />
                <meshStandardMaterial 
                    emissive={themeColor(theme)}
                    side={THREE.DoubleSide} 
                    map={rocketTx} 
                    transparent
                />
                </mesh>
                <sprite scale={scalar} 
                        ref={flame}
                        position={[0, offsets.flame, 0]}>
                <spriteMaterial 
                      transparent 
                      opacity={0}
                      map={flameAnimationTx} 
                />
                </sprite>
            </group>
            <BasePlate scalar={scalar} 
                       color={themeColor(theme)} 
                       offset={offsets.base}
                       zCoord={zCoord}
            />
        </group>
    );
}

export default LaunchableRocket;
