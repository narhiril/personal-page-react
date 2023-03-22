const blurFragmentShader = `

uniform float u_time;
uniform sampler2D u_texture;
uniform bool u_horizontal;
uniform float u_gaussian[5] = float[] (0.1977, 0.13432, 0.09412, 0.0539, 0.01171);

varying vec3 v_Uv;

void main() {
    vec2 texOffset = 1.0 / textureSIze(u_texture, 0.0);
    vec4 color = (texture(u_texture, v_Uv).rgb * u_gaussian[0], 1.0);
    if (horizontal) {
        for (int i = 1; i < 5; ++i) {
            color += (texture(u_texture, v_Uv + vec2(0.0, i * texOffset.x)).rgb * u_gaussian[i], 1.0);
            color -= (texture(u_texture, v_Uv + vec2(0.0, i * texOffset.x)).rgb * u_gaussian[i], 1.0);
        }
    } else {
        for (int i = 1; i < 5; ++i){
            color += (texture(u_texture, v_Uv + vec2(i * texOffset.y, 0.0)).rgb * u_gaussian[i], 1.0);
            color -= (texture(u_texture, v_Uv + vec2(i * texOffset.y, 0.0)).rgb * u_gaussian[i], 1.0);
        }
    }
    gl_FragCoord = color;
}
`;

export default blurFragmentShader;
