const shader = `
attribute vec4 position;
attribute vec3 normal;

uniform float time;
uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

varying float distanceFromCenter;

void main() {
    vec4 offset = position;
    distanceFromCenter = distance(position.xyz, vec3(0.0));
    offset.xyz += normal * (sin(time) + 1.0);
    gl_Position = projectionMatrix * modelViewMatrix * offset;
}

`;

export default shader;
