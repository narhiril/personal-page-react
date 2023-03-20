import { useLoader, useFrame, useThree } from "@react-three/fiber";
import * as THREE from 'three';
import { useRef, useMemo } from "react";

const LaunchableRocket = ({scalar, count, interval, tPlus, reset, zCoord, canvasDim, div}) => {

    //COMPONENT VARIABLES
    const root = document.getElementsByTagName("html")[0],
          theme = root.getAttribute("data-bs-theme") || "light",
          rocket = useRef(),
          flame = useRef(),
          group = useRef(),
          { scene, camera, gl, clock } = useThree(),
          frames = 12,
          flameOffset = -0.575 * scalar,
          sceneStartCoords = new THREE.Vector3(0, 0, zCoord);

    const isHidden = useMemo(() => {
        div.getAttribute("hidden")
    }, [div]);

    //TEXTURE SETUP
    const textures = {
                        rocket: "./textures/launchcodeRocketNoFlame.png", 
                        flame: "./textures/animation_rocketflame_12frame_512w_256offset.png",
                        logoBase: "./textures/launchcodeBase.png"
                    };

    const rocketTx = useLoader(THREE.TextureLoader, textures.rocket),
          logoBaseTx = useLoader(THREE.TextureLoader, textures.logoBase),
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
        useFrame((delta) => {
            if (reset) {
                currentFrame.current = 0;
                time.current = -delay-frameTime;
                hasFired.current = false;
                flame.current.material.opacity = 0;
                tx.offset.x = 0;
                return;
            }
            time.current += delta * 1000;
            if (!hasFired.current && time.current > 0 && flame.current.material.opacity === 0) {
                hasFired.current = true;
                flame.current.material.opacity = 1;
            }
            if (time.current >= frameTime) {
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

    /*
    function toWorldCoords(coords) {
        const element = gl.domElement,
              halfWidth = element.width / 2,
              halfHeight = element.height / 2,
              vector = new THREE.Vector3(),
              position = new THREE.Vector3();

        vector.set(-(coords.x / halfWidth) * 2 + 1,
                   (coords.y / halfHeight) * 2 - 1,
                   0.5);

        vector.unproject(camera)
              .sub(camera.position)
              .normalize();
        
        position.copy(camera.position)
                .add(vector.multiplyScalar(camera.position.z / vector.z));

        console.log(`world coords: ${position.x}, ${position.y}, ${position.z}`);
        
        return position;
    }
    */

    async function atEndOfCountdown(int, c) {
        if (c <= 0) {
            return false;
        }
        setTimeout(() => {

        }, int*c);
        return true;
    }

    async function atEndOfAnimation(postCount) {
        await atEndOfCountdown(interval, count).then(() => {
            setTimeout(() => {
                flameAnimationTx.offset.x = 0;
            }, tPlus);
        });
        return true;
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
        <group ref={group} position={sceneStartCoords}>              
            <mesh visible 
                  scale={scalar} 
                  ref={rocket}
                  position={[0, 0, 0]}>
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
            <sprite args={[1, 3]}
                    scale={scalar} 
                    ref={flame}
                    position={[0, flameOffset, 0]}>
                <spriteMaterial 
                    transparent 
                    opacity={0}
                    map={flameAnimationTx} 
                />
            </sprite>
        </group>
    );
}
 
export default LaunchableRocket;
