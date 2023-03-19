//GLSL fragment shader, made with the help of https://glslsandbox.com/

const smokeFragmentShader = `
//FRAGMENT SHADER

precision mediump float;

uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_resolution;
uniform sampler2D u_backbuffer;

vec4 background = vec4(0.0, 0.0, 0.0, 0.05);
vec4 start = vec4(0.99, 0.87, 0.1, 1.0);

float random(vec2 vector) {
	return abs(fract(cos(dot(vector, 106.94312*vec2(7172.1012, -871.364109)))));
}

vec4 flameToSmoke(vec4 hue){

	//is yellow (start color)
	if (hue.g > 0.65 && hue.b < 0.15) {
		//yellow => orange
		hue.g -= 0.075;

	//is orange
	} else if (hue.g > 0.12 && hue.b < 0.25) {
		//orange => red
		hue.r += 0.015;
		hue.g -= 0.015;
		if (hue.b < 0.35) {
			hue.b += 0.009;
		}

	//is red
	} else {
		//red => white
		hue.r += 0.015;
		hue.g += 0.065;
		hue.b += 0.077;
	}

	return hue;
}

void main( void ) {

	vec2 position = vec2(gl_FragCoord.x / u_resolution.x, gl_FragCoord.y / u_resolution.y);
	vec4 prevFrame = texture2D(u_backbuffer, position);
	vec4 hue;
	
	bool isBackground = prevFrame.a < background.a+0.15;
	
	float rng = random(u_mouse);
	float skew = 2.75*fract(rng);

	//size variance
	float dx = length(position-u_mouse)-(0.007*abs(rng));
	
	if (dx < 1.0) {
		hue = vec4(start.rgb, 1.0);
	//near cursor and not background
	} else if (dx < 0.018 && !isBackground) {
		//start color variance
		if (rng < 0.25) {
			hue = vec4(start.r+(rng/1.3), start.g+(rng/12.3), start.b, 1.0);
		} else {
			hue = vec4(start.rgb, 1.0);
		}
	//all other non-background
	} else if (!isBackground) {
		//is white (smoke)
		//number chosen because vec4(0.95, 0.95, 0.95, 0.03) => 2.85
		if (dot(prevFrame, vec4(1.0, 1.0, 1.0, 0.1)) > 2.84) {
			if (prevFrame.a < 0.03) {
				hue = background;
			} else {
				hue = vec4(prevFrame.rgb, prevFrame.a-0.025);
			}
		} else {
			hue = flameToSmoke(prevFrame);
		}
	} else {
		hue = background;
	}
	
	gl_FragColor = hue;

}

`;

export default smokeFragmentShader;
