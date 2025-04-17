import React, { createContext, useEffect, useRef, useState } from 'react';

// Creating context
export const SmoothScrollContext = createContext({
  scroll: null,
});

export const SmoothScrollProvider = ({ children, options }) => {
  const [locomotiveScroll, setLocomotiveScroll] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    // Dynamically import Locomotive Scroll to avoid SSR issues
    let LocomotiveScroll;
    
    // Import and initialize Locomotive Scroll
    const initLocomotiveScroll = async () => {
      try {
        LocomotiveScroll = (await import('locomotive-scroll')).default;
        
        if (!locomotiveScroll && scrollRef.current) {
          const scroll = new LocomotiveScroll({
            el: scrollRef.current,
            ...options,
            smartphone: {
              smooth: false,
            },
            tablet: {
              smooth: false,
            },
          });
          
          setLocomotiveScroll(scroll);
          
          // Update scroll on resize for responsiveness
          window.addEventListener('resize', () => {
            scroll.update();
          });
          
          // Clean up on unmount
          return () => {
            scroll.destroy();
            window.removeEventListener('resize', scroll.update);
          };
        }
        
        return () => {};
      } catch (error) {
        console.warn("Locomotive Scroll not loaded", error);
        return () => {};
      }
    };
    
    initLocomotiveScroll();
    
    // Clean up
    return () => {
      if (locomotiveScroll) locomotiveScroll.destroy();
    };
  }, [options, locomotiveScroll]);
  
  return (
    <SmoothScrollContext.Provider value={{ scroll: locomotiveScroll }}>
      <div data-scroll-container ref={scrollRef}>
        {children}
      </div>
    </SmoothScrollContext.Provider>
  );
};

// Custom hook for using smooth scroll
export const useSmoothScroll = () => {
  const context = React.useContext(SmoothScrollContext);
  if (context === undefined) {
    throw new Error('useSmoothScroll must be used within a SmoothScrollProvider');
  }
  return context;
};

// Scroll to section helper
export const scrollToSection = (scroll, sectionId) => {
  if (!scroll) return;
  
  const section = document.querySelector(sectionId);
  if (section) {
    scroll.scrollTo(section);
  }
};