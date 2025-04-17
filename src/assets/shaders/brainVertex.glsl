uniform float uTime;
uniform float uPulse;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
  vUv = uv;
  vNormal = normalize(normalMatrix * normal);
  vPosition = position;
  
  // Add subtle vertex displacement based on time
  vec3 pos = position;
  float pulseIntensity = 0.02 * uPulse;
  
  // Create a wave-like effect
  pos += normal * sin(uTime * 0.5 + position.x * 10.0 + position.y * 10.0) * pulseIntensity;
  
  // Position the vertex in 3D space
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}