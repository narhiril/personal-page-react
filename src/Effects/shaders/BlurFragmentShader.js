const blurFragmentShader = `

//uniform float u_time;
uniform sampler2D u_texture;
uniform bool u_horizontal;

varying vec2 v_Uv;

void main() {
    float gaussian[5] = float[] (0.5977, 0.13432, 0.09412, 0.0539, 0.01171);
    vec2 texOffset = 1.0 / v_Uv;
    vec3 color = texture(u_texture, v_Uv).rgb * gaussian[0];
    if (u_horizontal) {
        for (int i = 1; i < 5; ++i) {
            color += texture(u_texture, v_Uv + vec2(0.0, float(i) * float(texOffset.x))).rgb * gaussian[i];
            color -= texture(u_texture, v_Uv + vec2(0.0, float(i) * float(texOffset.x))).rgb * gaussian[i];
        }
    } else {
        for (int i = 1; i < 5; ++i){
            color += texture(u_texture, v_Uv + vec2(float(i) * float(texOffset.y), 0.0)).rgb * gaussian[i];
            color -= texture(u_texture, v_Uv + vec2(float(i) * float(texOffset.y), 0.0)).rgb * gaussian[i];
        }
    }
    gl_FragColor = vec4(color, 1.0);
}
`;

export default blurFragmentShader;
