// Global theme configuration for the application
// Can be accessed throughout the app for consistent styling

const theme = {
    colors: {
      // Primary colors
      primary: {
        50: '#f5f3ff',
        100: '#ede9fe',
        200: '#ddd6fe',
        300: '#c4b5fd',
        400: '#a78bfa',
        500: '#8b5cf6',
        600: '#7c3aed',
        700: '#6d28d9',
        800: '#5b21b6',
        900: '#4c1d95',
        DEFAULT: '#7c3aed', // violet-600
      },
      // Secondary colors (Soft Green)
      secondary: {
        50: '#ecfdf5',
        100: '#d1fae5',
        200: '#a7f3d0',
        300: '#6ee7b7',
        400: '#34d399',
        500: '#10b981',
        600: '#059669',
        700: '#047857',
        800: '#065f46',
        900: '#064e3b',
        DEFAULT: '#10b981', // emerald-500
      },
      // Accent colors (Soft Blue)
      accent: {
        50: '#eff6ff',
        100: '#dbeafe',
        200: '#bfdbfe',
        300: '#93c5fd',
        400: '#60a5fa',
        500: '#3b82f6',
        600: '#2563eb',
        700: '#1d4ed8',
        800: '#1e40af',
        900: '#1e3a8a',
        DEFAULT: '#3b82f6', // blue-500
      },
      // Background colors
      background: {
        light: '#faf8ff', // Very light purple
        dark: '#13111c',  // Very dark purple
      },
      // Text colors
      text: {
        primary: '#1a1625', // Dark purple/black
        secondary: '#6b7280', // Gray
        light: '#f9fafb', // White/light
      },
    },
    
    shadows: {
      sm: '0 1px 2px rgba(138, 92, 246, 0.05)',
      DEFAULT: '0 1px 3px rgba(138, 92, 246, 0.1), 0 1px 2px rgba(138, 92, 246, 0.06)',
      md: '0 4px 6px rgba(138, 92, 246, 0.1), 0 2px 4px rgba(138, 92, 246, 0.06)',
      lg: '0 10px 15px rgba(138, 92, 246, 0.1), 0 4px 6px rgba(138, 92, 246, 0.05)',
      xl: '0 20px 25px rgba(138, 92, 246, 0.1), 0 10px 10px rgba(138, 92, 246, 0.04)',
      '2xl': '0 25px 50px rgba(138, 92, 246, 0.25)',
      soft: '0 4px 20px rgba(138, 92, 246, 0.1)',
      glow: '0 0 15px rgba(138, 92, 246, 0.3)',
      innerGlow: 'inset 0 0 10px rgba(138, 92, 246, 0.2)',
    },
    
    fonts: {
      // Primary font for headings and important text
      heading: 'var(--font-poppins)',
      // Secondary font for body text
      body: 'var(--font-inter)',
    },
    
    transitions: {
      // Transition settings
      fast: 'all 0.15s ease',
      DEFAULT: 'all 0.3s ease',
      slow: 'all 0.5s ease',
      slower: 'all 0.8s ease',
    },
    
    // For web animations - can be used with Framer Motion
    animations: {
      bouncy: {
        type: 'spring',
        stiffness: 300,
        damping: 20,
      },
      smooth: {
        type: 'tween',
        ease: [0.43, 0.13, 0.23, 0.96], // Custom cubic bezier
        duration: 0.6,
      },
    },
    
    // Media query breakpoints (matching Tailwind defaults)
    breakpoints: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    
    // Border radius options
    borderRadius: {
      none: '0',
      sm: '0.125rem',
      DEFAULT: '0.25rem',
      md: '0.375rem',
      lg: '0.5rem',
      xl: '0.75rem',
      '2xl': '1rem',
      '3xl': '1.5rem',
      full: '9999px',
    },
    
    // Spacing scale - matches Tailwind but can be used in non-Tailwind contexts
    spacing: {
      px: '1px',
      0: '0',
      0.5: '0.125rem',
      1: '0.25rem',
      1.5: '0.375rem',
      2: '0.5rem',
      2.5: '0.625rem',
      3: '0.75rem',
      3.5: '0.875rem',
      4: '1rem',
      5: '1.25rem',
      6: '1.5rem',
      8: '2rem',
      10: '2.5rem',
      12: '3rem',
      16: '4rem',
      20: '5rem',
      24: '6rem',
      32: '8rem',
      40: '10rem',
      48: '12rem',
      56: '14rem',
      64: '16rem',
      72: '18rem',
      80: '20rem',
      96: '24rem',
    },
  };
  
  export default theme;