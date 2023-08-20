import { useLoader } from "@react-three/fiber";
import * as THREE from 'three';

const BasePlate = ({scalar, color, offset, zCoord, occlusionOffset}) => {
    
    const texturePath = "./textures/launchcodeBase_Cropped_329x48.png",
          texture = useLoader(THREE.TextureLoader, texturePath),
          basePlateHeight = 0.1094225; // texture aspect ratio (48/329) * 0.75

    return (  
        <>
            <mesh scale={scalar > 0.275 ? scalar - 0.25 : scalar}
                  position={[0, offset, zCoord+0.0005]} //extra z-offsets are for proper occlusion
                  visible
            >
            <planeGeometry args={[0.75, basePlateHeight]}/>
            <meshStandardMaterial 
                      transparent 
                      map={texture}
                      emissive={color} 
            />
            </mesh>
            <mesh scale={scalar > 0.275 ? scalar - 0.25 : scalar}
                  position={[0, occlusionOffset, zCoord+0.00025]}
                  visible
                  renderOrder={1}
            >
            <planeGeometry args={[2.5, (1-basePlateHeight)]}/> {/* This should probably be calculated from FOV, but this is close enough*/}
            <meshStandardMaterial
                map={texture}
                colorWrite={false}
            />
            </mesh>
        </>
    );
}

export default BasePlate;
