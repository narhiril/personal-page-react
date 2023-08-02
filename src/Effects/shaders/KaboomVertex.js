const shader = `
attribute vec4 position;
attribute vec3 normal;

uniform float time;
uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

varying float distanceFromCenter;

void main() {
    distanceFromCenter = distance(position.xyz, vec3(0.0));
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}

`;

export default shader;
