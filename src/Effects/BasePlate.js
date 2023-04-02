import { useLoader } from "@react-three/fiber";
import * as THREE from 'three';

const BasePlate = ({scalar, color, offset, zCoord}) => {
    
    const texturePath = "./textures/launchcodeBase.png",
          texture = useLoader(THREE.TextureLoader, texturePath);

    return (  
        <mesh scale={scalar > 0.275 ? scalar - 0.25 : scalar}
              position={[0, offset, zCoord-0.25]} //extra z offset to prevent occluding flash
              visible>
        <planeGeometry args={[1, 1]}/>
        <meshStandardMaterial 
                  transparent 
                  map={texture}
                  emissive={color} 
        />
        </mesh>
    );
}

export default BasePlate;
