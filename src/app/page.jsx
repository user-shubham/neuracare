'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSmoothScroll } from '@/lib/smoothScroll';
import { pageVariants, pageTransition } from '@/lib/framerMotionConfig';
import { preloadModels } from '@/lib/threeSetup';

// Import all sections
import Hero from '@/components/Sections/Hero';
import MoodLog from '@/components/Sections/MoodLog';
import Assessment from '@/components/Sections/Assessment';
import Journal from '@/components/Sections/Journal';
import ChatBot from '@/components/Sections/ChatBot';
import Insights from '@/components/Sections/Insights';
import Testimonials from '@/components/Sections/Testimonials';
import About from '@/components/Sections/About';

export default function Home() {
  const { scroll } = useSmoothScroll();
  
  // Preload 3D models when the page loads
  useEffect(() => {
    // Preload 3D models to improve performance
    preloadModels();
    
    // Update locomotive scroll when page is fully loaded
    if (scroll) {
      // Small timeout to ensure DOM is fully rendered
      const timer = setTimeout(() => {
        scroll.update();
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [scroll]);

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="overflow-hidden"
    >
      {/* Hero Section with 3D brain */}
      <section data-scroll-section id="hero">
        <Hero />
      </section>
      
      {/* Daily Mood Log Section */}
      <section data-scroll-section id="mood-log" className="section-spacing">
        <MoodLog />
      </section>
      
      {/* Self-Assessment Section */}
      <section data-scroll-section id="assessment" className="section-spacing gradient-bg">
        <Assessment />
      </section>
      
      {/* Journaling Section */}
      <section data-scroll-section id="journal" className="section-spacing">
        <Journal />
      </section>
      
      {/* AI Chat Bot Section */}
      <section data-scroll-section id="chat" className="section-spacing gradient-bg">
        <ChatBot />
      </section>
      
      {/* AI Insights Section */}
      <section data-scroll-section id="insights" className="section-spacing">
        <Insights />
      </section>
      
      {/* Testimonials Section */}
      <section data-scroll-section id="testimonials" className="section-spacing gradient-bg">
        <Testimonials />
      </section>
      
      {/* About Section */}
      <section data-scroll-section id="about" className="section-spacing">
        <About />
      </section>
    </motion.div>
  );
}