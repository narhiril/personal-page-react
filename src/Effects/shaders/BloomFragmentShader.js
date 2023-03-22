const bloomFragmentShader = `

uniform float u_time;
uniform sampler2D u_texture;
uniform vec3 u_threshold;

varying vec3 v_Uv;

void main() {
    vec4 color = gl_FragColor;
    float luminosity = dot(color.rgb, u_threshold.rgb);
    if (luminosity < 1.0) {
        color = vec4(0.0, 0.0, 0.0, 1.0);
    }
    gl_FragCoord = color;
}
`;

export default bloomFragmentShader;
