uniform vec2 uMouse;
uniform float uTime;
uniform float uActive;
uniform float uGlowR;
uniform float uBulge;
uniform float uWave;
uniform float uWave2;
uniform float uWave2Freq;
varying float vI;
varying float vFog;

void main() {
  vec3 p = position;
  float d = distance(p.xy, uMouse);
  float bump = exp(-(d*d)/(2.0*uGlowR*uGlowR));
  p.z += bump * uBulge * uActive;
  p.z += sin(p.x*0.06 + uTime)*uWave + cos(p.y*0.06 + uTime*0.8)*uWave;
  p.z += sin(p.y*uWave2Freq + uTime*0.35)*uWave2 + cos((p.x+p.y)*uWave2Freq*0.6 + uTime*0.27)*uWave2;
  vI = bump * uActive;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  vFog = -mv.z;
  gl_Position = projectionMatrix * mv;
}
