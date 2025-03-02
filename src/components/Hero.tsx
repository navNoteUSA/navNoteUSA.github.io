import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, ArrowRight } from 'lucide-react';
import gsap from 'gsap';

const Hero: React.FC = () => {
  const particlesRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create floating particles
    if (particlesRef.current) {
      const container = particlesRef.current;
      const colors = ['#00F0FF', '#B026FF', '#0A1128'];
      
      for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random properties
        const size = Math.random() * 10 + 5;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        // Set styles
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.backgroundColor = color;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
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
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/90 to-dark bg-gradient-animate"></div>
      
      {/* Particles container */}
      <div ref={particlesRef} className="absolute inset-0 overflow-hidden"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
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
                  href="#waitlist" 
                  className="bg-gradient-to-r from-secondary to-accent px-6 py-3 rounded-full font-medium hover:shadow-lg hover:shadow-accent/20 transition-all flex items-center gap-2 group"
                >
                  Join Waitlist
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>
                <a 
                  href="#demo" 
                  className="glass px-6 py-3 rounded-full font-medium hover:bg-white/20 transition-all flex items-center gap-2"
                >
                  <Play size={18} className="fill-white" />
                  Watch Demo
                </a>
              </div>
            </motion.div>
          </div>
          
          <div className="lg:w-1/2 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {/* 3D Logo Animation */}
              <div ref={logoRef} className="w-64 h-64 md:w-80 md:h-80 perspective-1000">
                <img 
                  src="/logo.svg" 
                  alt="navNote 3D Logo" 
                  className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(176,38,255,0.5)]"
                />
              </div>
              
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-radial from-accent/20 via-secondary/10 to-transparent blur-2xl -z-10"></div>
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