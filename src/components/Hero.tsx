import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Clock, Brain, Shield, ChevronRight } from 'lucide-react';

interface HeroProps {
  openDemoForm?: () => void;
  openAuthForm?: () => void;
}

const Hero: React.FC<HeroProps> = ({ openDemoForm, openAuthForm }) => {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };
  
  const buttonVariants = {
    hover: { 
      scale: 1.05,
      boxShadow: "0 10px 25px rgba(59, 130, 246, 0.5)",
      transition: { type: "spring", stiffness: 400, damping: 10 }
    },
    tap: { scale: 0.95 }
  };
  
  const iconVariants = {
    initial: { scale: 1 },
    animate: { 
      scale: [1, 1.2, 1],
      transition: { 
        repeat: Infinity,
        repeatType: "reverse",
        duration: 2
      }
    }
  };
  
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };
  
  // Handle scroll effect for parallax
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleDemoRequest = () => {
    if (openDemoForm) {
      openDemoForm();
    }
  };

  const handleGetStarted = () => {
    if (openAuthForm) {
      openAuthForm();
    }
  };
  
  return (
    <section 
      ref={heroRef}
      className="min-h-screen flex items-center relative overflow-hidden pt-16 pb-16"
      style={{
        background: "linear-gradient(to bottom, rgb(15, 23, 42), rgb(23, 31, 56))"
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        
        {/* Floating orbs */}
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-xl opacity-20"
            style={{
              background: i % 2 === 0 ? 
                "radial-gradient(circle, rgba(59,130,246,0.8) 0%, rgba(37,99,235,0.4) 70%)" : 
                "radial-gradient(circle, rgba(139,92,246,0.8) 0%, rgba(124,58,237,0.4) 70%)",
              height: `${Math.random() * 200 + 100}px`,
              width: `${Math.random() * 200 + 100}px`,
              top: `${Math.random() * 100}vh`,
              left: `${Math.random() * 100}vw`,
              transform: `translateY(${scrollY * (Math.random() * 0.2)}px)`
            }}
            animate={{
              x: [0, Math.random() * 30 - 15],
              y: [0, Math.random() * 30 - 15],
            }}
            transition={{
              duration: Math.random() * 5 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 relative z-10 pt-8 md:pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-12 md:pt-16 lg:pt-20">
          {/* Left Content - Text */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-left"
          >
            <motion.h1 
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-[var(--text-primary)]"
            >
              AI-Driven <span className="bg-gradient-to-r from-[var(--text-gradient-start)] to-[var(--text-gradient-end)] bg-clip-text text-transparent">Virtual Memory</span> That Evolves With You
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-xl text-[var(--text-tertiary)] mb-8"
            >
              navNote intelligently adapts to your life, dynamically organizing tasks based on location, time, and context—because your tasks evolve with you.
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap gap-4 mb-12"
            >
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={handleDemoRequest}
                className="px-8 py-4 bg-[var(--text-accent)] hover:bg-blue-700 rounded-lg text-[var(--text-primary)] font-medium flex items-center gap-2 shadow-lg shadow-blue-500/30 transition-all"
              >
                Request Demo <ArrowRight className="h-5 w-5" />
              </motion.button>
              
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={handleGetStarted}
                className="px-8 py-4 bg-slate-800 hover:bg-slate-700 rounded-lg text-white font-medium border border-slate-700 flex items-center gap-2 transition-all"
              >
                Early Access
              </motion.button>
            </motion.div>
            
            {/* Feature highlights */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <motion.div 
                  variants={iconVariants}
                  initial="initial"
                  animate="animate"
                  className="p-2 bg-blue-500/10 rounded-lg text-blue-500"
                >
                  <MapPin className="h-5 w-5" />
                </motion.div>
                <div>
                  <h3 className="font-semibold mb-1">Location-Aware</h3>
                  <p className="text-gray-400 text-sm">Tasks that appear when you need them, where you need them</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <motion.div 
                  variants={iconVariants}
                  initial="initial"
                  animate="animate"
                  className="p-2 bg-indigo-500/10 rounded-lg text-indigo-500"
                >
                  <Clock className="h-5 w-5" />
                </motion.div>
                <div>
                  <h3 className="font-semibold mb-1">Time-Optimized</h3>
                  <p className="text-gray-400 text-sm">Dynamic rescheduling based on your real-time availability</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <motion.div 
                  variants={iconVariants}
                  initial="initial"
                  animate="animate"
                  className="p-2 bg-purple-500/10 rounded-lg text-purple-500"
                >
                  <Brain className="h-5 w-5" />
                </motion.div>
                <div>
                  <h3 className="font-semibold mb-1">AI-Powered</h3>
                  <p className="text-gray-400 text-sm">Advanced neural networks that learn your habits and preferences</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <motion.div 
                  variants={iconVariants}
                  initial="initial"
                  animate="animate"
                  className="p-2 bg-teal-500/10 rounded-lg text-teal-500"
                >
                  <Shield className="h-5 w-5" />
                </motion.div>
                <div>
                  <h3 className="font-semibold mb-1">Privacy-First</h3>
                  <p className="text-gray-400 text-sm">On-device processing keeps your data private and secure</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Right Content - App Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="relative flex justify-center"
          >
            {/* 3D Phone Perspective Container */}
            <motion.div
              className="relative perspective-1000 w-full max-w-xs sm:max-w-sm mx-auto"
              animate={{ 
                rotateY: [0, 3, 0, -3, 0],
                rotateX: [0, -2, 0, 2, 0]
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut"
              }}
            >
              {/* Phone Frame with subtle, professional design */}
              <div className="relative overflow-hidden rounded-[32px] border-[8px] border-gray-900 shadow-xl mx-auto max-w-xs sm:max-w-sm">
                {/* Status Bar */}
                <div className="absolute top-0 inset-x-0 h-5 bg-gray-900 z-10 flex justify-center items-end">
                  <div className="w-16 h-[3px] bg-gray-800 rounded-full mb-0.5"></div>
                </div>
                
                {/* Subtle screen reflection */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-transparent z-20 pointer-events-none"></div>
                
                {/* App screen mockup with focused Life Map */}
                <div className="bg-slate-950 aspect-[9/19] overflow-hidden relative">
                  {/* Clean, minimalist app header */}
                  <div className="p-4 bg-slate-900 border-b border-slate-800/80 flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-base text-white">navNote</h3>
                      <p className="text-[10px] text-slate-400">Life Map</p>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-blue-500/10 flex items-center justify-center">
                      <MapPin className="h-3.5 w-3.5 text-blue-400" />
                    </div>
                  </div>
                  
                  {/* Enhanced Life Map Visualization - Core feature */}
                  <div className="relative h-52 bg-slate-950 overflow-hidden">
                    {/* Map background */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(30,41,59,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(30,41,59,0.8)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20"></div>
                    
                    {/* Life Map visualization - more organized with clear paths */}
                    <div className="absolute inset-0">
                      {/* Path lines - simplified and more structured */}
                      <svg className="absolute inset-0 w-full h-full opacity-60" style={{ zIndex: 0 }}>
                        {/* Home to Work Path */}
                        <motion.path
                          d="M110 80 C 140 50, 160 50, 190 80"
                          stroke="#60a5fa"
                          strokeWidth="1.5"
                          fill="none"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{
                            duration: 8,
                            repeat: Infinity,
                            repeatType: "loop",
                            ease: "easeInOut"
                          }}
                        />
                        
                        {/* Home to Store Path */}
                        <motion.path
                          d="M110 80 C 90 130, 90 150, 110 170"
                          stroke="#818cf8"
                          strokeWidth="1.5"
                          fill="none"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{
                            duration: 10,
                            repeat: Infinity,
                            repeatType: "loop",
                            ease: "easeInOut",
                            delay: 1
                          }}
                        />
                        
                        {/* Work to Meeting Path */}
                        <motion.path
                          d="M190 80 C 240 100, 240 120, 220 160"
                          stroke="#a78bfa"
                          strokeWidth="1.5"
                          fill="none" 
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{
                            duration: 12,
                            repeat: Infinity,
                            repeatType: "loop",
                            ease: "easeInOut",
                            delay: 2
                          }}
                        />
                      </svg>
                      
                      {/* Location Points - Consistent, meaningful locations */}
                      {/* Home Location */}
                      <motion.div
                        className="absolute w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center"
                        style={{ top: '80px', left: '110px' }}
                        animate={{ 
                          boxShadow: ['0 0 0 0 rgba(59, 130, 246, 0)', '0 0 0 8px rgba(59, 130, 246, 0.1)', '0 0 0 0 rgba(59, 130, 246, 0)']
                        }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
                      </motion.div>
                      
                      {/* Work Location */}
                      <motion.div
                        className="absolute w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center"
                        style={{ top: '80px', left: '190px' }}
                        animate={{ 
                          boxShadow: ['0 0 0 0 rgba(99, 102, 241, 0)', '0 0 0 8px rgba(99, 102, 241, 0.1)', '0 0 0 0 rgba(99, 102, 241, 0)']
                        }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 1
                        }}
                      >
                        <div className="w-2.5 h-2.5 rounded-full bg-indigo-500"></div>
                      </motion.div>
                      
                      {/* Store Location */}
                      <motion.div
                        className="absolute w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center"
                        style={{ top: '170px', left: '110px' }}
                        animate={{ 
                          boxShadow: ['0 0 0 0 rgba(34, 197, 94, 0)', '0 0 0 8px rgba(34, 197, 94, 0.1)', '0 0 0 0 rgba(34, 197, 94, 0)']
                        }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 2
                        }}
                      >
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                      </motion.div>
                      
                      {/* Meeting Location */}
                      <motion.div
                        className="absolute w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center"
                        style={{ top: '160px', left: '220px' }}
                        animate={{ 
                          boxShadow: ['0 0 0 0 rgba(168, 85, 247, 0)', '0 0 0 8px rgba(168, 85, 247, 0.1)', '0 0 0 0 rgba(168, 85, 247, 0)']
                        }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 3
                        }}
                      >
                        <div className="w-2.5 h-2.5 rounded-full bg-purple-500"></div>
                      </motion.div>
                      
                      {/* Current Location Indicator - Subtle pulse */}
                      <motion.div
                        className="absolute w-8 h-8 rounded-full"
                        style={{
                          top: '80px',
                          left: '110px',
                          backgroundColor: 'rgba(59, 130, 246, 0.15)'
                        }}
                        animate={{ 
                          scale: [1, 1.5, 1],
                          opacity: [0.5, 0.2, 0.5]
                        }}
                        transition={{
                          duration: 6,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    </div>
                    
                    {/* Professional UI Overlay */}
                    <div className="absolute top-3 left-3 bg-slate-900/70 backdrop-blur-sm rounded px-2 py-1 text-[10px] text-slate-300 border border-slate-800">
                      <span>Home</span>
                    </div>
                    
                    <div className="absolute bottom-3 right-3 bg-slate-900/70 backdrop-blur-sm rounded-lg px-2 py-1 text-[10px] text-slate-300 border border-slate-800">
                      <div className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                        <span>Life Map Active</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Task Section - Simplified and more professional */}
                  <div className="px-4 pt-2 pb-12">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-xs font-medium text-slate-400">LOCATION-BASED TASKS</h4>
                    </div>
                    
                    {/* Home Task */}
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className="mb-2 p-3 bg-slate-900 rounded-lg border border-slate-800 relative"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                            <h4 className="font-medium text-sm text-white">Morning Routine</h4>
                          </div>
                          <p className="text-[10px] text-slate-400 mt-1 ml-3">Current location: Home</p>
                        </div>
                        <div className="text-[10px] px-1.5 py-0.5 bg-blue-500/10 rounded text-blue-400 font-medium">
                          Now
                        </div>
                      </div>
                    </motion.div>
                    
                    {/* Work Task */}
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1, delay: 0.3 }}
                      className="mb-2 p-3 bg-slate-900 rounded-lg border border-slate-800 relative"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                            <h4 className="font-medium text-sm text-white">Team Meeting</h4>
                          </div>
                          <p className="text-[10px] text-slate-400 mt-1 ml-3">Office - Conference Room</p>
                        </div>
                        <div className="text-[10px] px-1.5 py-0.5 bg-indigo-500/10 rounded text-indigo-400 font-medium">
                          9:30 AM
                        </div>
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* Minimal Navigation Bar */}
                  <div className="absolute bottom-0 inset-x-0 h-12 bg-slate-900 border-t border-slate-800 flex items-center justify-around px-6">
                    <div className="w-6 h-6 flex items-center justify-center opacity-50">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-slate-400">
                        <rect x="3" y="3" width="18" height="18" rx="2"></rect>
                        <line x1="9" y1="3" x2="9" y2="21"></line>
                      </svg>
                    </div>
                    
                    <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center relative">
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        animate={{
                          boxShadow: [
                            '0 0 0 0 rgba(59, 130, 246, 0)',
                            '0 0 0 3px rgba(59, 130, 246, 0.3)',
                            '0 0 0 0 rgba(59, 130, 246, 0)'
                          ]
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          repeatType: "loop",
                          ease: "easeInOut"
                        }}
                      />
                      <MapPin className="h-5 w-5 text-blue-400" />
                    </div>
                    
                    <div className="w-6 h-6 flex items-center justify-center opacity-50">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-slate-400">
                        <path d="M12 20h9"></path>
                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Subtle light reflection - simplified */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[32px]">
                <motion.div 
                  className="absolute -inset-full bg-gradient-to-tr from-blue-500/10 via-white/5 to-transparent transform rotate-12"
                  animate={{
                    left: ['-100%', '100%'],
                    top: ['-100%', '100%']
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut"
                  }}
                />
              </div>
            </motion.div>
            
            {/* Simplified decorative elements - just two subtle glows */}
            <motion.div 
              className="absolute -top-10 -right-10 w-40 h-40 bg-blue-600/20 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.3, 0.2]
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            />
            
            <motion.div 
              className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-600/20 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.3, 0.2]
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <p className="text-sm text-gray-400 mb-2">Scroll to explore</p>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronRight size={20} className="text-gray-400 transform rotate-90" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;