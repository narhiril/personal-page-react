import { useLoader, useFrame, useThree } from "@react-three/fiber";
import * as THREE from 'three';
import { useRef } from "react";

const LaunchableRocket = ({scalar, startPosition, count, zCoord}) => {

    const root = document.getElementsByTagName("html")[0],
          theme = root.getAttribute("data-bs-theme") || "light",
          rocket = useRef(),
          flame = useRef(),
          group = useRef(),
          {camera, gl} = useThree(),
          frames = 12,
          flameOffset = -0.575 * scalar,
          sceneStartCoords = toWorldCoords(startPosition),
          rocketPosition = useRef(new THREE.Vector3(sceneStartCoords.x, sceneStartCoords.y, zCoord));

    const textures = {
                        rocket: "./textures/launchcodeRocketNoFlame.png", 
                        flame: "./textures/animation_rocketflame_12frame_512w_256offset.png",
                        logoBase: "./textures/launchcodeBase.png"
                    };

    function useFlameAnimation(tx, frameTime, frameCount) {
        const time = useRef(0),
              currentFrame = useRef(0);
        useFrame((_, dt) => {
            time.current += dt * 1000;
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

    function toScreenCoords() {

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

    function cleanup() {
        flameAnimationTx.offset.x = 0;
    }

    const rocketTx = useLoader(THREE.TextureLoader, textures.rocket),
          logoBaseTx = useLoader(THREE.TextureLoader, textures.logoBase),
          flameAnimationTx = useLoader(THREE.TextureLoader, textures.flame);

    flameAnimationTx.minFilter = THREE.NearestFilter;
    flameAnimationTx.magFilter = THREE.NearestFilter;
    flameAnimationTx.repeat.set(1 / frames, 1);

    useFlameAnimation(flameAnimationTx, 150, frames);

    return (  
        <group ref={group} position={[rocketPosition.current.x,rocketPosition.current.y,zCoord]}>
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
            <sprite visible 
                    args={[1, 3]}
                    scale={scalar} 
                    ref={flame}
                    position={[0, 
                               flameOffset, 
                               0]}>
                <spriteMaterial 
                    transparent 
                    map={flameAnimationTx} 
                />
            </sprite>
        </group>
    );
}
 
export default LaunchableRocket;
