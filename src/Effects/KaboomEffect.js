import { useRef } from 'react';

const KaboomEffect = ({scalar, zCoord, color}) => {
    const mesh = useRef();
    let vertexShader, 
        fragmentShader;

    return (
        <mesh ref={mesh} 
              position={[0, 0, zCoord]}>
          <sphereGeometry args={[scalar, 32, 32]} />
          <rawShaderMaterial args={{vertexShader: vertexShader, 
                                    fragmentShader: fragmentShader}} />
        </mesh>
      );
}
 
export default KaboomEffect;
