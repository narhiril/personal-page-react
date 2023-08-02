const shader = `
precision highp float;

varying float distanceFromCenter;

void main() {
    gl_FragColor = vec4(vec3(distanceFromCenter), 1.0 - (distanceFromCenter / 100));
}

`;

export default shader;
