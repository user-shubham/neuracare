uniform float uTime;
uniform vec3 uColor;
uniform float uIntensity;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
  // Calculate rim lighting effect (brightest at edges)
  float fresnel = 1.0 - abs(dot(normalize(vNormal), vec3(0.0, 0.0, 1.0)));
  fresnel = pow(fresnel, 2.0) * uIntensity;
  
  // Pulsing glow effect
  float pulse = sin(uTime * 0.5) * 0.5 + 0.5;
  
  // Add subtle noise
  float noise = fract(sin(dot(vUv, vec2(12.9898, 78.233))) * 43758.5453);
  
  // Mix base color with fresnel effect and pulsing
  vec3 finalColor = mix(uColor, vec3(1.0), fresnel * pulse);
  
  // Add subtle variations based on position
  float variation = sin(vPosition.x * 10.0 + uTime) * 0.05 + 
                    cos(vPosition.y * 8.0 + uTime * 0.5) * 0.05;
  
  // Apply subtle noise
  finalColor += vec3(noise * 0.05);
  
  // Add positional variation to color
  finalColor += vec3(variation);
  
  // Create glowing effect
  gl_FragColor = vec4(finalColor, 0.7 + fresnel * 0.3);
}