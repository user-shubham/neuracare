'use client';

import { Suspense, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Canvas } from '@react-three/fiber';
import { useInView } from 'react-intersection-observer';
import { fadeIn, fadeInUp, staggerChildren } from '@/lib/framerMotionConfig';
import { scrollToSection } from '@/lib/smoothScroll';
import BrainModel from './BrainModel';
import BackgroundParticles from './BackgroundParticles';
import { useSmoothScroll } from '@/lib/smoothScroll';

const Hero = () => {
  const { scroll } = useSmoothScroll();
  const canvasRef = useRef();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleCtaClick = (e, target) => {
    e.preventDefault();
    if (scroll) {
      scrollToSection(scroll, target);
    } else {
      // Fallback for when locomotive scroll is not available
      document.querySelector(target).scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={staggerChildren}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* Background particles */}
      <div className="absolute inset-0 z-0">
        <BackgroundParticles />
      </div>

      {/* 3D Brain Visualization */}
      <div 
        ref={canvasRef} 
        className="absolute inset-0 z-10 opacity-80"
        data-scroll
        data-scroll-speed="0.3"
      >
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          dpr={[1, 2]}
          gl={{ alpha: true, antialias: true }}
        >
          <Suspense fallback={null}>
            <BrainModel position={[0, 0, 0]} />
          </Suspense>
        </Canvas>
      </div>

      {/* Content overlay */}
      <div className="container mx-auto px-6 z-20 relative">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1 
            variants={fadeInUp}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-accent-400"
          >
            Your AI-Powered Mental Wellness Guide
          </motion.h1>
          
          <motion.p 
            variants={fadeIn}
            className="text-xl md:text-2xl text-secondary-text mb-10"
          >
            Empowering your mind with empathy and intelligence
          </motion.p>
          
          <motion.div 
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button 
              onClick={(e) => handleCtaClick(e, '#mood-log')}
              className="btn-primary w-full sm:w-auto"
            >
              Begin Your Journey
            </button>
            
            <button 
              onClick={(e) => handleCtaClick(e, '#chat')}
              className="btn-outline w-full sm:w-auto"
            >
              Meet Serenity
            </button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        variants={fadeIn}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="text-primary"
        >
          <path d="M12 5v14"></path>
          <path d="m19 12-7 7-7-7"></path>
        </svg>
      </motion.div>
    </motion.div>
  );
};

export default Hero;