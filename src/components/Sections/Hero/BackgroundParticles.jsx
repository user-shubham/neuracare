'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PointMaterial, Points } from '@react-three/drei';
import * as THREE from 'three';

// Individual particle system
const ParticleSystem = ({ count = 1000, color = '#8b5cf6' }) => {
  const points = useRef();

  // Generate random particle positions
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 10;     // x
      positions[i3 + 1] = (Math.random() - 0.5) * 10; // y
      positions[i3 + 2] = (Math.random() - 0.5) * 10; // z
    }
    return positions;
  }, [count]);

  // Animation loop
  useFrame((state, delta) => {
    if (!points.current) return;
    
    // Gentle rotation
    points.current.rotation.x += delta * 0.02;
    points.current.rotation.y += delta * 0.01;
    
    // Get current geometry attributes
    const positions = points.current.geometry.attributes.position;
    
    // Animate each particle slightly
    for (let i = 0; i < positions.count; i++) {
      // Apply wave motion based on time
      const i3 = i * 3;
      positions.array[i3 + 1] += Math.sin(state.clock.elapsedTime * 0.5 + i * 0.1) * 0.002;
    }
    
    positions.needsUpdate = true;
  });

  return (
    <Points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <PointMaterial
        transparent
        size={0.05}
        sizeAttenuation
        color={color}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

// Connection lines between particles
const ConnectionLines = ({ count = 50, color = '#a78bfa' }) => {
  const linesRef = useRef();
  
  useEffect(() => {
    if (!linesRef.current) return;
    
    // Create lines geometry with random points
    const positions = new Float32Array(count * 6); // 2 points per line (x,y,z) * 2
    
    for (let i = 0; i < count; i++) {
      const i6 = i * 6;
      
      // Start point
      positions[i6] = (Math.random() - 0.5) * 10;
      positions[i6 + 1] = (Math.random() - 0.5) * 10;
      positions[i6 + 2] = (Math.random() - 0.5) * 10;
      
      // End point
      positions[i6 + 3] = (Math.random() - 0.5) * 10;
      positions[i6 + 4] = (Math.random() - 0.5) * 10;
      positions[i6 + 5] = (Math.random() - 0.5) * 10;
    }
    
    linesRef.current.geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3)
    );
  }, [count]);
  
  useFrame((state) => {
    if (!linesRef.current) return;
    
    // Gentle rotation
    linesRef.current.rotation.x += 0.001;
    linesRef.current.rotation.y += 0.002;
    
    // Wave-like movement
    const positions = linesRef.current.geometry.attributes.position.array;
    
    for (let i = 0; i < count; i++) {
      const i6 = i * 6;
      
      // Animate only the end points of the lines for a neuron-like effect
      positions[i6 + 3] += Math.sin(state.clock.elapsedTime * 0.5 + i * 0.1) * 0.01;
      positions[i6 + 4] += Math.cos(state.clock.elapsedTime * 0.3 + i * 0.05) * 0.01;
    }
    
    linesRef.current.geometry.attributes.position.needsUpdate = true;
  });
  
  return (
    <lineSegments ref={linesRef}>
      <bufferGeometry />
      <lineBasicMaterial
        attach="material"
        color={color}
        opacity={0.2}
        transparent
        depthWrite={false}
        linewidth={1}
      />
    </lineSegments>
  );
};

// Waves in the background
const Waves = () => {
  const meshRef = useRef();
  const wavesCount = 20;
  
  // Create a wave geometry
  useEffect(() => {
    if (!meshRef.current) return;
    
    const geometry = new THREE.PlaneGeometry(30, 30, 64, 64);
    meshRef.current.geometry = geometry;
  }, []);
  
  // Animate the waves
  useFrame(({ clock }) => {
    if (!meshRef.current || !meshRef.current.geometry) return;
    
    const positions = meshRef.current.geometry.attributes.position.array;
    const time = clock.getElapsedTime();
    
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const y = positions[i + 1];
      
      // Create wavy pattern
      positions[i + 2] = 
        Math.sin(x * 0.5 + time * 0.5) * 0.5 + 
        Math.sin(y * 0.5 + time * 0.5) * 0.5;
    }
    
    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });
  
  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]}>
      <meshPhongMaterial
        color="#8b5cf6"
        opacity={0.1}
        transparent
        wireframe
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

// Main BackgroundParticles component
const BackgroundParticles = () => {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
      <ambientLight intensity={0.5} />
      <ParticleSystem count={1500} color="#a78bfa" />
      <ConnectionLines count={100} color="#8b5cf6" />
      <Waves />
    </Canvas>
  );
};

export default BackgroundParticles;