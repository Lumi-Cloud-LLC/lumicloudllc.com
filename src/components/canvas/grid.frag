uniform vec3 uFogColor;
uniform float uFogDensity;
uniform vec3 uGlow;
uniform float uBright;
varying float vI;
varying float vFog;

void main() {
  vec3 base = vec3(0.205, 0.218, 0.235) * uBright;
  vec3 glow = uGlow;
  vec3 c = mix(base, glow, clamp(vI*1.5, 0.0, 1.0));
  float f = 1.0 - exp(-uFogDensity*uFogDensity*vFog*vFog);
  c = mix(c, uFogColor, clamp(f, 0.0, 1.0));
  float a = clamp(0.55*uBright + vI*0.45, 0.0, 1.0);
  gl_FragColor = vec4(c, a);
}
