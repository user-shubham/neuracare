import { useEffect, useState } from 'react';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

// Preload config for model loading
export const modelPreloadConfig = {
  brain: '/models/brain.glb',
  // Add more models as needed
};

// Helper function to set up post-processing effects
export const setupPostProcessing = (scene, camera, renderer) => {
  // Import necessary effects when needed
  const { EffectComposer } = require('three/examples/jsm/postprocessing/EffectComposer');
  const { RenderPass } = require('three/examples/jsm/postprocessing/RenderPass');
  const { UnrealBloomPass } = require('three/examples/jsm/postprocessing/UnrealBloomPass');
  
  // Create an effect composer
  const composer = new EffectComposer(renderer);
  
  // Add render pass
  const renderPass = new RenderPass(scene, camera);
  composer.addPass(renderPass);
  
  // Add bloom effect for the glowing effect
  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    1.5, // intensity
    0.4, // radius
    0.85 // threshold
  );
  composer.addPass(bloomPass);
  
  return composer;
};

// Custom hook for lazy loading 3D models
export function useModelLoader(modelPath, onProgress) {
  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    let isMounted = true;
    
    const loadModel = async () => {
      try {
        // Create a loader
        const loader = new THREE.GLTFLoader();
        
        // Add progress handler if provided
        if (onProgress) {
          loader.loadAsync = (url, onProgress) => {
            return new Promise((resolve, reject) => {
              loader.load(url, resolve, onProgress, reject);
            });
          };
        }
        
        // Load the model
        const gltf = await loader.loadAsync(modelPath, onProgress);
        
        if (isMounted) {
          setModel(gltf);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          console.error('Error loading model:', err);
          setError(err);
          setLoading(false);
        }
      }
    };
    
    loadModel();
    
    return () => {
      isMounted = false;
    };
  }, [modelPath, onProgress]);
  
  return { model, loading, error };
}

// Setup light helpers for consistent lighting across scenes
export const setupLights = (scene) => {
  // Main directional light
  const mainLight = new THREE.DirectionalLight(0xffffff, 1);
  mainLight.position.set(10, 10, 10);
  scene.add(mainLight);
  
  // Ambient light for overall illumination
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  
  // Point light for highlights
  const pointLight = new THREE.PointLight(0x8b5cf6, 2, 50);
  pointLight.position.set(0, 5, 0);
  scene.add(pointLight);
  
  return { mainLight, ambientLight, pointLight };
};

// Hook to handle responsive camera adjustments
export const useResponsiveCamera = () => {
  const { camera, size } = useThree();
  
  useEffect(() => {
    // Update camera aspect ratio on resize
    camera.aspect = size.width / size.height;
    
    // Adjust camera position based on screen size
    if (size.width < 768) {
      // Mobile view
      camera.position.z = 10;
    } else {
      // Desktop view
      camera.position.z = 7;
    }
    
    camera.updateProjectionMatrix();
  }, [camera, size]);
  
  return camera;
};

// Helper function to create a glowing material
export const createGlowMaterial = (color = 0x8b5cf6, intensity = 1) => {
  return new THREE.MeshStandardMaterial({
    color: new THREE.Color(color),
    emissive: new THREE.Color(color),
    emissiveIntensity: intensity,
    transparent: true,
    opacity: 0.8,
  });
};

// Preload all models to improve performance
export const preloadModels = () => {
  Object.entries(modelPreloadConfig).forEach(([key, path]) => {
    useGLTF.preload(path);
  });
};