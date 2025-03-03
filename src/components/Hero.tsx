import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Map, BrainCircuit, Cpu, Terminal, Network } from 'lucide-react';
import gsap from 'gsap';

interface HeroProps {
  openDemoForm?: () => void;
  openAuthForm?: () => void;
}

const Hero: React.FC<HeroProps> = ({ openDemoForm, openAuthForm }) => {
  const particlesRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const hexGridRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Improved animation variants for smoother transitions
  const containerVariant = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
        ease: [0.25, 0.1, 0.25, 1.0],
        duration: 0.8
      }
    }
  };
  
  const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  };

  useEffect(() => {
    // Set loaded state
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);

    // Cancel animation frames when component unmounts
    return () => {
      clearTimeout(timer);
    };
  }, []);

  // Create a hex grid for the visualization
  useEffect(() => {
    if (hexGridRef.current && isLoaded) {
      const grid = hexGridRef.current;
      grid.innerHTML = '';
      
      const hexSize = 30;
      const rows = 7;
      const cols = 7;
      
      // Create hexagon grid
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          // Skip some hexagons for a more organic feel
          if (Math.random() > 0.7) continue;
          
          // Create hexagon
          const hexagon = document.createElement('div');
          hexagon.className = 'absolute hexagon';
          hexagon.style.setProperty('--hexagon-size', `${hexSize}px`);
          
          // Position hexagon with offset for even rows
          const xOffset = row % 2 === 0 ? 0 : hexSize * 0.866 * 0.5;
          const x = col * hexSize * 0.866 * 1.5 + xOffset;
          const y = row * hexSize * 1.5;
          
          hexagon.style.left = `${x}px`;
          hexagon.style.top = `${y}px`;
          
          // Vary opacity for depth
          hexagon.style.opacity = (0.1 + Math.random() * 0.3).toString();
          
          // Add circle inside some hexagons
          if (Math.random() > 0.5) {
            const circle = document.createElement('div');
            circle.className = 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2';
            circle.style.width = `${hexSize * 0.4}px`;
            circle.style.height = `${hexSize * 0.4}px`;
            circle.style.borderRadius = '50%';
            circle.style.backgroundColor = Math.random() > 0.5 ? '#4D9DE0' : '#78C091';
            circle.style.opacity = `${Math.random() * 0.4 + 0.6}`;
            hexagon.appendChild(circle);
          }
          
          // Add to grid
          grid.appendChild(hexagon);
        }
      }
    }

    // Parallax effect on scroll
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const parallaxElements = document.querySelectorAll('.parallax');
      
      parallaxElements.forEach((el) => {
        const speed = (el as HTMLElement).dataset.speed || "0.1";
        const y = scrollY * parseFloat(speed);
        (el as HTMLElement).style.setProperty('--parallax-y', `${y}px`);
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoaded]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20 pb-12">
      {/* Background with advanced tech styling */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0 bg-circuit-pattern opacity-15"></div>
        <div className="absolute inset-0 bg-gradient-radial from-blue-900/20 via-primary/10 to-black"></div>
        <div className="absolute inset-0 bg-hex-pattern opacity-10"></div>
        <div className="radial-gradient absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-radial from-blue-700/20 via-primary/10 to-transparent"></div>
      </div>
      
      {/* Animated particles */}
      <div ref={particlesRef} className="absolute inset-0 overflow-hidden"></div>
      
      {/* Digital grid lines overlay */}
      <div className="absolute inset-0 bg-grid-lines opacity-5"></div>
      
      {/* Animated circuit paths */}
      <div className="absolute inset-0">
        <div className="circuit-path circuit-path-1"></div>
        <div className="circuit-path circuit-path-2"></div>
        <div className="circuit-path circuit-path-3"></div>
      </div>
      
      {/* Orbiting elements (representing AI interactions) */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72">
        <div className="ai-orbit"></div>
        <div className="ai-orbit" style={{ animationDelay: "1s" }}></div>
        <div className="ai-orbit" style={{ animationDelay: "2s" }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left column with text */}
          <div className="lg:w-1/2">
            <motion.div
              variants={containerVariant}
              initial="hidden"
              animate="visible"
              className="max-w-xl"
            >
              <motion.div
                variants={itemVariant}
                className="flex items-center mb-2"
              >
                <span className="px-3 py-1 bg-accent/20 rounded-full text-xs uppercase tracking-widest font-medium backdrop-blur-sm">Revolutionizing Task Management</span>
              </motion.div>
              
              <motion.h1 
                variants={itemVariant}
                className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-600 to-cyan-400"
              >
                Your AI-Powered <br />
                <span className="bg-gradient-to-r from-secondary via-accent to-secondary bg-clip-text text-transparent animate-gradient-text">Virtual Memory</span>
              </motion.h1>
              
              <motion.p 
                variants={itemVariant}
                className="text-xl text-gray-300 mb-8 parallax max-w-lg"
                data-speed="0.05"
              >
                navNote intelligently adapts to your life, seamlessly integrating task management with context-aware AI that evolves with you.
              </motion.p>
              
              <motion.div 
                variants={itemVariant}
                className="flex flex-wrap gap-4"
              >
                <button 
                  onClick={openDemoForm}
                  className="btn-primary group bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 px-6 py-3 rounded-xl font-medium flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20 transition-all"
                >
                  Get a Demo
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={openAuthForm}
                  className="btn-secondary bg-slate-800/50 backdrop-blur-sm hover:bg-slate-700/60 px-6 py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors border border-slate-700/50"
                >
                  <Map size={18} className="mr-2" />
                  Sign In/Sign Up
                </button>
              </motion.div>
              
              <motion.div 
                variants={itemVariant}
                className="mt-8 grid grid-cols-2 gap-4"
              >
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-blue-600/20 flex items-center justify-center mr-3">
                    <BrainCircuit size={20} className="text-blue-400" />
                  </div>
                  <p className="text-sm text-gray-300">
                    Advanced AI that learns and adapts
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center mr-3">
                    <Network size={20} className="text-accent" />
                  </div>
                  <p className="text-sm text-gray-300">
                    Neural network personalization
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
          
          {/* Right column with visualization */}
          <div className="lg:w-1/2 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.8 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1.0] }}
              className="relative will-change-transform"
            >
              <div className="perspective-1000 relative flex items-center justify-center">
                {/* 3D Logo Animation */}
                <div ref={logoRef} className="w-60 h-60 mb-10 relative z-20 flex items-center justify-center will-change-transform">
                  <div className="absolute inset-0 rounded-full bg-gradient-radial from-blue-600/30 via-blue-900/10 to-transparent blur-lg"></div>
                  <div className="bg-black/40 backdrop-blur-md p-8 rounded-3xl border border-slate-800/50 shadow-2xl">
                    <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 filter drop-shadow-lg">navNote</h1>
                  </div>
                </div>
                
                {/* Digital connectivity dots */}
                <div className="absolute inset-0 connectivity-dots"></div>
                
                {/* Life Map Visualization */}
                <div 
                  ref={hexGridRef} 
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full scale-75 sm:scale-90 md:scale-100 will-change-transform" 
                  style={{ 
                    width: '300px', 
                    height: '300px', 
                    zIndex: 10,
                    animation: prefersReducedMotion ? 'none' : 'float 10s ease-in-out infinite',
                  }}
                >
                </div>
                
                {/* Tech detail elements */}
                <div className="absolute -bottom-8 -right-8 w-20 h-20 bg-slate-900/80 backdrop-blur-md rounded-full border border-slate-800 flex items-center justify-center z-30">
                  <Terminal size={24} className="text-blue-400" />
                </div>
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-slate-900/80 backdrop-blur-md rounded-full border border-slate-800 flex items-center justify-center z-30">
                  <Cpu size={20} className="text-accent" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;