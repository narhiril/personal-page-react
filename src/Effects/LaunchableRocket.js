import { useLoader, useFrame, useThree } from "@react-three/fiber";
import * as THREE from 'three';
import { useRef, useMemo, useEffect, useCallback } from "react";
import { useFBO } from "@react-three/drei";
import smokeFragmentShader from "./shaders/SmokeFragmentShader";
import smokeVertexShader from "./shaders/SmokeVertexShader";

const LaunchableRocket = ({scalar, count, interval, tPlus, reset, zCoord, canvasDim, div}) => {

    //COMPONENT VARIABLES
    const root = document.getElementsByTagName("html")[0],
          theme = root.getAttribute("data-bs-theme") || "light",
          rocket = useRef(),
          flame = useRef(),
          group = useRef(),
          smokeDrawSurface = useRef(),
          { scene, camera, gl, clock } = useThree(),
          frames = 12,
          flameOffset = -0.575 * scalar,
          sceneStartCoords = new THREE.Vector3(0, 0, zCoord);

    const isHidden = useMemo(() => {
        div.getAttribute("hidden")
    }, [div]);
    
    //SHADERS, UNIFORMS, AND WEBGL VARIABLES
    const uniforms = useMemo(() => ({
        u_mouse: { value: { x: 0, y: 0 } },
        u_resolution: { value: canvasDim },
        u_backbuffer: { value: new THREE.Texture() },
        u_time: { value: 0.0 }
    }), []);

    let readBuffer = useFBO(canvasDim.x, 
                               canvasDim.y,
                               {
                                   minFilter: THREE.NearestFilter,
                                   magFilter: THREE.NearestFilter,
                                   type: THREE.FloatType
                               }),
        writeBuffer = readBuffer.clone();

    const fragmentShader = smokeFragmentShader, 
          vertexShader = smokeVertexShader;

    //testing

    const mousePosition = useRef({ x: 0, y: 0 });

    const updateMousePosition = useCallback((e) => {
            mousePosition.current = { x: e.pageX, y: e.pageY };
          }, []);

    useEffect(() => {
        window.addEventListener("mousemove", updateMousePosition, false);

        return () => {
        window.removeEventListener("mousemove", updateMousePosition, false);
        };
    }, [updateMousePosition]);

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
        useFrame((_, dt) => {
            if (reset) {
                currentFrame.current = 0;
                time.current = -delay-frameTime;
                hasFired.current = false;
                flame.current.material.opacity = 0;
                tx.offset.x = 0;
                return;
            }
            //Draw to offscreen frame buffer
            gl.setRenderTarget(writeBuffer);
            gl.clear();
            gl.render(scene, camera);
            //back to drawing to canvas
            gl.setRenderTarget(null);
            //writeBuffer => readBuffer
            swapBuffers();

            smokeDrawSurface.current
                            .material
                            .uniforms
                            .u_time
                            .value = clock.getElapsedTime();
            smokeDrawSurface.current
                            .material
                            .uniforms
                            .u_backbuffer
                            .value = readBuffer.texture;
            smokeDrawSurface.current
                            .material
                            .uniforms
                            .u_mouse
                            .value=new THREE.Vector2(mousePosition.current.x, mousePosition.current.y);

            //Rocket flame animation
            time.current += dt * 1000;
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

    function swapBuffers() {
        const helper = readBuffer;
        readBuffer = writeBuffer;
        writeBuffer = helper;
    }

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
            <mesh visible
                  scale={scalar} 
                  ref={smokeDrawSurface} 
                  position={[0, 0, 0]}>
                <planeGeometry 
                    args={[3, 3]}
                />
                <shaderMaterial
                  map={logoBaseTx}
                  vertexShader={vertexShader} 
                  fragmentShader={fragmentShader} 
                  uniforms={uniforms} 
                />
            </mesh>
        </group>
    );
}
 
export default LaunchableRocket;
