import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  const parallaxRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!parallaxRef.current) return;
      
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      const layers = parallaxRef.current.querySelectorAll('.parallax-layer');
      layers.forEach((layer, index) => {
        const speed = (index + 1) * 20;
        const htmlLayer = layer as HTMLElement;
        htmlLayer.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 hero-gradient"></div>
      <div className="absolute inset-0 grid-pattern opacity-20"></div>
      
      {/* Parallax background */}
      <div ref={parallaxRef} className="parallax-bg">
        <div className="parallax-layer">
          <motion.div 
            className="absolute top-20 left-20 w-64 h-64 rounded-full bg-primary-500/5 filter blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
        <div className="parallax-layer">
          <motion.div 
            className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-secondary-500/5 filter blur-3xl"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ 
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
        <div className="parallax-layer">
          <motion.div 
            className="absolute top-1/3 right-1/4 w-40 h-40 rounded-full bg-primary-400/5 filter blur-2xl"
            animate={{ 
              scale: [1, 1.4, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ 
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </div>
      
      {/* Digital circuit lines */}
      <motion.div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10 H 90 V 90 H 10 L 10 10' fill='none' stroke='rgba(14, 165, 233, 0.5)' stroke-width='1'/%3E%3Cpath d='M30 30 H 70 V 70 H 30 L 30 30' fill='none' stroke='rgba(139, 92, 246, 0.5)' stroke-width='1'/%3E%3Cpath d='M10 50 H 90' fill='none' stroke='rgba(14, 165, 233, 0.5)' stroke-width='1'/%3E%3Cpath d='M50 10 V 90' fill='none' stroke='rgba(139, 92, 246, 0.5)' stroke-width='1'/%3E%3C/svg%3E")`,
          backgroundSize: '100px 100px'
        }}
        animate={{
          backgroundPosition: ['0px 0px', '100px 100px']
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Your <span className="gradient-text">AI-Powered</span> Virtual Memory
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-300 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              navNote intelligently adapts to your life, seamlessly integrating task management with context-aware AI that evolves with you.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <motion.a 
                href="#contact" 
                className="btn-primary flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Join the Waitlist <ArrowRight size={18} />
              </motion.a>
              <motion.a 
                href="#demo" 
                className="btn-secondary flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Watch Demo <Play size={18} />
              </motion.a>
            </motion.div>
          </motion.div>
          
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <div className="relative">
              <motion.div 
                className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl blur opacity-30"
                animate={{ 
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{ 
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeInOut" 
                }}
              ></motion.div>
              <div className="relative bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 gradient-border">
                <img 
                  src="https://images.unsplash.com/photo-1642427749670-f20e2e76ed8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="navNote AI Interface" 
                  className="w-full h-auto rounded-2xl"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent p-6">
                  <p className="text-lg font-medium">navNote AI Interface</p>
                  <p className="text-sm text-gray-400">Redefining Task Management</p>
                </div>
              </div>
            </div>
            
            <motion.div 
              className="absolute -bottom-6 -right-6 bg-gray-900 p-4 rounded-lg border border-gray-800 shadow-xl"
              initial={{ x: 20, y: 20, opacity: 0 }}
              animate={{ x: 0, y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            >
              <p className="text-sm font-medium">navNote combines AI intelligence with context awareness to create a productivity experience unlike any other.</p>
            </motion.div>
            
            {/* Floating elements */}
            <motion.div
              className="absolute -top-10 -left-10 w-20 h-20 rounded-full bg-primary-500/10 filter blur-xl"
              animate={{
                y: [0, -15, 0],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute -bottom-5 left-1/4 w-16 h-16 rounded-full bg-secondary-500/10 filter blur-xl"
              animate={{
                y: [0, 15, 0],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
          </motion.div>
        </div>
      </div>
      
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
      >
        <a href="#features" className="flex flex-col items-center gap-2 text-gray-400 hover:text-white transition-colors">
          <span className="text-sm">Scroll to explore</span>
          <motion.svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <path d="M12 5V19M12 19L19 12M12 19L5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </motion.svg>
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;