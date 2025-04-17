// Common animation variants for reuse across components

export const fadeIn = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    },
  };
  
  export const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    },
  };
  
  export const fadeInDown = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    },
  };
  
  export const fadeInLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    },
  };
  
  export const fadeInRight = {
    hidden: { opacity: 0, x: 30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    },
  };
  
  export const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };
  
  export const popIn = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
  };
  
  export const scaleIn = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }
    },
  };
  
  // Page transition variants
  export const pageVariants = {
    initial: {
      opacity: 0,
    },
    in: {
      opacity: 1,
    },
    out: {
      opacity: 0,
    },
  };
  
  // Page transition settings
  export const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5,
  };
  
  // Scroll-triggered animation settings
  export const scrollRevealVariants = {
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    hidden: { opacity: 0, y: 50 }
  };
  
  // Hover animation for interactive elements
  export const hoverScale = {
    scale: 1.05,
    transition: { duration: 0.2 }
  };
  
  // Animation hook settings for motion values
  export const useAnimateSettings = {
    damping: 20,
    stiffness: 200,
    restSpeed: 0.1
  };
  
  // Default scroll animation config for InView component
  export const defaultScrollConfig = {
    threshold: 0.2,
    triggerOnce: true
  };