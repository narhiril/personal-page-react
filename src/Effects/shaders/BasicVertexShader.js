//this does nothing special except for setting up v_Uv

const basicVertexShader = `
//VERTEX SHADER

varying vec2 v_Uv;

void main() {

    v_Uv = uv;
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    
    gl_Position = projectedPosition;
  
}
`;

export default basicVertexShader;
