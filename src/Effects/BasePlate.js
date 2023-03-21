import { useLoader } from "@react-three/fiber";
import * as THREE from 'three';

const BasePlate = ({scalar, color, offset, zCoord}) => {
    
    const texturePath = "./textures/launchcodeBase.png",
          texture = useLoader(THREE.TextureLoader, texturePath);

    return (  
        <mesh scale={scalar}
              position={[0, offset, zCoord]} 
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
