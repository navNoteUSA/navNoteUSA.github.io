import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Map, BrainCircuit } from 'lucide-react';
import gsap from 'gsap';

const Hero: React.FC = () => {
  const particlesRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const hexGridRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Mark component as loaded for animations
    setIsLoaded(true);
    
    // Create floating particles (representing the dynamic elements in Life Map)
    if (particlesRef.current) {
      const container = particlesRef.current;
      const colors = ['#4D9DE0', '#78C091', '#FFFFFF'];
      
      for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random properties
        const size = Math.random() * 8 + 4;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        // Set styles
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.backgroundColor = color;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.opacity = `${Math.random() * 0.5 + 0.1}`;
        
        // Random animation delay
        particle.style.animationDelay = `${Math.random() * 5}s`;
        
        container.appendChild(particle);
      }
    }

    // Animate 3D logo
    if (logoRef.current) {
      gsap.to(logoRef.current, {
        rotationY: 360,
        duration: 20,
        repeat: -1,
        ease: "none"
      });
    }

    // Create hexagon grid animation (Life Map visualization)
    if (hexGridRef.current) {
      const grid = hexGridRef.current;
      const gridSize = 5;
      const hexSize = 40;
      
      // Create a grid of hexagons similar to the Life Map in the app
      for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
          const hexagon = document.createElement('div');
          hexagon.classList.add('hexagon');
          
          // Calculate position with offset for odd rows
          const xPos = col * hexSize * 1.5;
          const yPos = row * hexSize * 0.866 * 2;
          const offset = row % 2 === 1 ? hexSize * 0.75 : 0;
          
          // Style the hexagon
          hexagon.style.setProperty('--hexagon-size', `${hexSize}px`);
          hexagon.style.position = 'absolute';
          hexagon.style.left = `${xPos + offset}px`;
          hexagon.style.top = `${yPos}px`;
          
          // Random animation delay
          hexagon.style.animationDelay = `${Math.random() * 3}s`;
          
          // Add random content (some hexagons will have a "task" circle)
          if (Math.random() > 0.6) {
            const circle = document.createElement('div');
            circle.classList.add('hexagon-content');
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
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20 pb-12">
      {/* Background with hexagon pattern */}
      <div className="absolute inset-0 bg-primary">
        <div className="absolute inset-0 bg-hex-pattern opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/95 to-dark bg-gradient-animate"></div>
      </div>
      
      {/* Animated particles */}
      <div ref={particlesRef} className="absolute inset-0 overflow-hidden"></div>
      
      {/* Orbiting elements (representing AI interactions) */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60">
        <div className="ai-orbit"></div>
        <div className="ai-orbit"></div>
        <div className="ai-orbit"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left column with text */}
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                Your AI-Powered <span className="text-gradient">Virtual Memory</span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 parallax" data-speed="0.05">
                navNote intelligently adapts to your life, seamlessly integrating task management with context-aware AI that evolves with you.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <a 
                  href="#demo" 
                  className="btn-primary group"
                >
                  See the App
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>
                <a 
                  href="#lifemap" 
                  className="btn-secondary"
                >
                  <Map size={18} className="mr-2" />
                  Explore Life Map
                </a>
              </div>
              
              <div className="mt-8 flex items-center">
                <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center mr-3">
                  <BrainCircuit size={20} className="text-white" />
                </div>
                <p className="text-sm text-gray-300">
                  Powered by advanced AI that learns and adapts to your habits
                </p>
              </div>
            </motion.div>
          </div>
          
          {/* Right column with Life Map visualization */}
          <div className="lg:w-1/2 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.8 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative perspective-1000">
                {/* 3D Logo Animation - Removed */}
                <div ref={logoRef} className="w-48 h-48 md:w-60 md:h-60 mb-12 relative z-20 flex items-center justify-center">
                  <h1 className="text-5xl font-bold text-gradient-animated">navNote</h1>
                </div>
                
                {/* Life Map Visualization */}
                <div 
                  ref={hexGridRef} 
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full scale-75 sm:scale-90 md:scale-100" 
                  style={{ 
                    width: '300px', 
                    height: '300px', 
                    zIndex: 10,
                    animation: 'float 10s ease-in-out infinite',
                  }}
                ></div>
              </div>
              
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-radial from-secondary/20 via-accent/10 to-transparent blur-2xl -z-10"></div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
          <div className="w-1.5 h-1.5 rounded-full bg-white/80"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;