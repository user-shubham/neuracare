import { useState, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';

/**
 * Custom hook for lazy loading 3D models with loading state tracking
 * @param {string} modelPath - Path to the 3D model
 * @param {Object} options - Configuration options
 * @returns {Object} - Model, loading state, and progress
 */
export function use3DModel(modelPath, options = {}) {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  
  // Track if component is mounted
  let isMounted = true;
  
  // Progress callback for the loader
  const onProgress = (event) => {
    if (!isMounted) return;
    
    if (event.lengthComputable) {
      const progressPercentage = (event.loaded / event.total) * 100;
      setProgress(progressPercentage);
    }
  };
  
  // Configure the loader options
  const loaderOptions = {
    ...options,
    onProgress,
  };
  
  // Load the model using drei's useGLTF
  const model = useGLTF(modelPath, true, loaderOptions);
  
  useEffect(() => {
    // Mark loading as complete when model is loaded
    if (model) {
      setLoading(false);
    }
    
    // Cleanup function to prevent state updates if unmounted
    return () => {
      isMounted = false;
    };
  }, [model]);
  
  // Handle errors during loading
  useEffect(() => {
    const handleError = (err) => {
      if (isMounted) {
        console.error('Error loading model:', err);
        setError(err);
        setLoading(false);
      }
    };
    
    // Add error handling
    if (!model) {
      handleError(new Error('Model failed to load'));
    }
    
    return () => {
      isMounted = false;
    };
  }, [model]);
  
  return { model, loading, progress, error };
}

// Export a function to preload models
export const preloadModel = (path) => {
  useGLTF.preload(path);
};