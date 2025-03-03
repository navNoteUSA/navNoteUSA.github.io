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
        {/* Neural network patterns */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        {/* Glowing orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full filter blur-3xl"></div>
        
        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <div 
              key={i} 
              className="absolute bg-blue-500/5 rounded-full animate-float-slow"
              style={{
                width: `${Math.random() * 100 + 50}px`,
                height: `${Math.random() * 100 + 50}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 10 + 15}s`,
                animationDelay: `${Math.random() * 5}s`
              }}
            ></div>
          ))}
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
          >
            Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">AI-Powered</span> Virtual Memory
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto"
          >
            navNote intelligently adapts to your life, seamlessly integrating task management with context-aware AI that evolves with you.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <motion.button
              onClick={openDemoForm}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold text-lg shadow-glow-sm hover:shadow-glow-md transition-all"
            >
              Join the Waitlist
            </motion.button>
            
            <motion.button
              onClick={openAuthForm}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-slate-800 border border-slate-600 rounded-xl font-bold text-lg hover:bg-slate-700 transition-all"
            >
              Watch Demo
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;