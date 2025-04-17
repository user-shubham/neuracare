'use client';

import { useState, useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF, useScroll, PerspectiveCamera, shaderMaterial } from '@react-three/drei';
import { extend, Object3D } from '@react-three/fiber';
import * as THREE from 'three';
import { useInView } from 'react-intersection-observer';
import vertexShader from '@/assets/shaders/brainVertex.glsl';
import fragmentShader from '@/assets/shaders/brainFragment.glsl';

// Create a custom shader material for the brain's glowing effect
const BrainMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor: new THREE.Color(0x8b5cf6), // Primary purple color
    uIntensity: 1.5,
    uPulse: 0,
  },
  vertexShader,
  fragmentShader
);

// Extend the ThreeJS library with our custom material
extend({ BrainMaterial });

const BrainModel = ({ position = [0, 0, 0], scale = 1.5 }) => {
  const brainRef = useRef();
  const scrollData = useScroll();
  const { camera } = useThree();
  const [hovered, setHovered] = useState(false);
  const [pulseSpeed, setPulseSpeed] = useState(0.5);
  const materialRef = useRef();
  
  // Load the brain model
  const { scene } = useGLTF('/models/brain.glb');
  const brainModel = scene.clone();
  
  // Observer to detect when brain is in view
  const [ref, inView] = useInView({
    threshold: 0.1,
  });
  
  // Apply custom material to the brain model
  useEffect(() => {
    if (brainModel && materialRef.current) {
      brainModel.traverse((child) => {
        if (child.isMesh) {
          // Store the original material for later restoration
          child.originalMaterial = child.material;
          
          // Create a new instance of the brain material
          const newMaterial = new THREE.MeshPhongMaterial({
            color: new THREE.Color(0x8b5cf6), // Primary color
            emissive: new THREE.Color(0x8b5cf6),
            emissiveIntensity: 0.3,
            specular: new THREE.Color(0xffffff),
            shininess: 50,
            transparent: true,
            opacity: 0.9,
          });
          
          child.material = newMaterial;
        }
      });
    }
  }, [brainModel]);
  
  // Handle hover effects
  const handlePointerOver = () => {
    setHovered(true);
    document.body.style.cursor = 'pointer';
    setPulseSpeed(1.2); // Increase pulse speed when hovered
  };
  
  const handlePointerOut = () => {
    setHovered(false);
    document.body.style.cursor = 'auto';
    setPulseSpeed(0.5); // Return to normal pulse speed
  };
  
  // Animation loop
  useFrame((state, delta) => {
    if (!brainRef.current) return;
    
    // Gentle rotation animation
    brainRef.current.rotation.y += delta * 0.1;
    
    // Apply hover effect - scale up slightly
    if (hovered) {
      brainRef.current.scale.x = THREE.MathUtils.lerp(brainRef.current.scale.x, scale * 1.05, 0.1);
      brainRef.current.scale.y = THREE.MathUtils.lerp(brainRef.current.scale.y, scale * 1.05, 0.1);
      brainRef.current.scale.z = THREE.MathUtils.lerp(brainRef.current.scale.z, scale * 1.05, 0.1);
    } else {
      brainRef.current.scale.x = THREE.MathUtils.lerp(brainRef.current.scale.x, scale, 0.1);
      brainRef.current.scale.y = THREE.MathUtils.lerp(brainRef.current.scale.y, scale, 0.1);
      brainRef.current.scale.z = THREE.MathUtils.lerp(brainRef.current.scale.z, scale, 0.1);
    }
    
    // Neuron pulse effect
    brainModel.traverse((child) => {
      if (child.isMesh && child.material) {
        // Pulsing emissive intensity
        const pulseValue = Math.sin(state.clock.elapsedTime * pulseSpeed) * 0.5 + 0.5;
        child.material.emissiveIntensity = 0.2 + pulseValue * 0.3;
      }
    });
    
    // Scroll-based camera movement
    if (scrollData) {
      const scrollOffset = scrollData.offset;
      
      // Move camera slightly based on scroll
      camera.position.y = THREE.MathUtils.lerp(
        camera.position.y,
        5 - scrollOffset * 10, // Move from bottom to top as user scrolls
        0.05
      );
      
      // Tilt camera based on scroll
      camera.rotation.x = THREE.MathUtils.lerp(
        camera.rotation.x,
        -0.5 + scrollOffset * 0.5, // Tilt up as user scrolls
        0.05
      );
    }
  });

  return (
    <group ref={ref}>
      <primitive
        ref={brainRef}
        object={brainModel}
        position={position}
        scale={[scale, scale, scale]}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      />
      
      {/* Ambient light to illuminate the brain */}
      <ambientLight intensity={0.5} />
      
      {/* Directional light to enhance 3D effect */}
      <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
      
      {/* Point light inside the brain for the glow effect */}
      <pointLight position={[0, 0, 0]} intensity={2} color="#8b5cf6" distance={5} />
      
      {/* Spotlight to highlight certain areas */}
      <spotLight
        position={[5, 5, 5]}
        angle={0.3}
        penumbra={0.8}
        intensity={1}
        castShadow
        color="#60a5fa"
      />
    </group>
  );
};

// Preload the brain model
useGLTF.preload('/models/brain.glb');

export default BrainModel;