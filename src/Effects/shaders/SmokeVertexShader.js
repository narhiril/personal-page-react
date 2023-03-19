//This is just the default vertex shader for now

const smokeVertexShader = `
//VERTEX SHADER

void main() {

    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    
    gl_Position = projectedPosition;
  
}
`;

export default smokeVertexShader;
