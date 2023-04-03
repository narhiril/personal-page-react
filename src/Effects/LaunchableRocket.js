import { useLoader, useFrame, useThree } from "@react-three/fiber";
import * as THREE from 'three';
import { useRef, useMemo, useState } from "react";
import BasePlate from "./BasePlate";
import FlashEffect from "./FlashEffect";

const LaunchableRocket = ({scalar, count, interval, reset, zCoord, canvasDim}) => {

    //COMPONENT VARIABLES
    const root = document.getElementsByTagName("html")[0],
          theme = root.getAttribute("data-bs-theme") || "light",
          rocket = useRef(),
          flame = useRef(),
          group = useRef(),
          effect = useRef(),
          displacement = useRef(0),
          preLaunchWobble = useRef(false),
          sceneStartCoords = new THREE.Vector3(0, 0, zCoord),
          { clock } = useThree(),
          [resetFlash, setResetFlash] = useState(true),
          launchDelay = interval * (count + 1),
          frames = 12;
          
    const offsets = useMemo(() => ({
        base: (-0.325 * scalar),// - (0.275 * scalar),
        flame: -0.585 * scalar,
        flash: (-0.585 * scalar) / 3.5,
        occlusionObject: (-0.625 * scalar)
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

    //SET ANIMATION PARAMETERS
    useFlameAnimation(flameAnimationTx, 150, frames, launchDelay);

    //RENDER LOOP
    function useFlameAnimation(tx, frameTime, frameCount, delay) {
        const time = useRef(-delay-frameTime),
              currentFrame = useRef(0),
              hasStartedPreLaunch = useRef(false),
              hasFired = useRef(false);
        useFrame((_, delta) => {
            if (reset) {
                currentFrame.current = 0;
                time.current = -delay-frameTime;
                hasFired.current = false;
                flame.current.material.opacity = 0;
                tx.offset.x = 0;
                displacement.current = 0;
                group.current.position.z = sceneStartCoords.z;
                group.current.position.y = sceneStartCoords.y;
                group.current.rotation.z = 0;
                rocket.current.rotation.z = 0;
                hasStartedPreLaunch.current = false;
                preLaunchWobble.current = false;
                setResetFlash(true);
                //skip all subsequent checks
                return;
            }

            //increment animation frame timer, resets to zero on every flame animation frame
            time.current += delta * 1000;

            //handles trigger for pre-launch wobble animation
            if (!hasStartedPreLaunch.current) {
                startPreLaunchAnimationTimer(count, interval, 1.75);
                hasStartedPreLaunch.current = true;
            }

            //handles wobble immediately before flame animation start
            if (preLaunchWobble.current) {
                rocket.current.rotation.z = 0.0825 * Math.cos(time.current / 100);
                //skip all subsequent checks
                return;
            } else {
                rocket.current.rotation.z = 0;
            }

            //handles upwards movement
            if (displacement.current > 0 && hasFired.current) {
                group.current.position.y += (displacement.current * 0.0025);
                displacement.current += 0.025;
            }

            //handles trigger for flame animation start
            if (!hasFired.current && time.current > 0 && flame.current.material.opacity === 0) {
                console.log("Liftoff");
                displacement.current += 1;
                setResetFlash(false);
                hasFired.current = true;
                time.current = -interval * 0.35; //slight delay for flash before flame animation
                setTimeout(() => {
                    flame.current.material.opacity = 1;
                }, interval * 0.35);
            }

            //advance flame animation to next frame
            if (time.current >= frameTime) {
                //slight rotation on ascent
                group.current.rotation.z = 0.0095 * Math.sin(0.2 * clock.getElapsedTime());
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

    //HELPERS
    function themeColor(th) {
        switch (th) {
            case "dark":
            case "deepblue":
                return new THREE.Color(0xf1efec);
            case "redshift":
                return new THREE.Color(0xf5dcbc);
            default:
                //launchcode logo blue
                return new THREE.Color(0x104a6d);
        }
    }

    function startPreLaunchAnimationTimer(countFrom, dt, startAt) {
        if (countFrom < 3 || dt <= 0 || startAt > countFrom) {
            preLaunchWobble.current = false;
            console.error("LaunchableRocket pre-launch animation aborted - invalid parameters");
            return;
        } else {
            const startAnimation = ((countFrom+1) * dt) - (startAt * dt),
                  animationDuration = (dt * startAt) - (dt / 4);
            setTimeout(() => {
                //flag for render loop
                preLaunchWobble.current = true;
                //console.log('LaunchaleRocket pre-launch animation start');
                //cleanup at end of animation
                setTimeout(() => {
                    preLaunchWobble.current = false;
                    //console.log('LaunchaleRocket pre-launch animation end');
                }, animationDuration);
            }, startAnimation);
        }
    }

    return (
        <group>
            <group ref={group} 
                   renderOrder={2}>              
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
                <FlashEffect ref={effect}
                             zCoord={zCoord} 
                             scalar={scalar}
                             canvasDim={canvasDim} 
                             reset={resetFlash}
                             flashOffset={offsets.flash}
                             position={[0, 0, 0]}
                />
            </group>
            <BasePlate scalar={scalar} 
                       color={themeColor(theme)} 
                       offset={offsets.base}
                       zCoord={zCoord}
                       occlusionOffset={offsets.occlusionObject}
            />
        </group>
    );
}

export default LaunchableRocket;
