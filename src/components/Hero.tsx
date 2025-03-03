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
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative flex justify-center"
          >
            {/* 3D Phone Perspective Container */}
            <motion.div
              className="relative perspective-1000 w-full max-w-xs sm:max-w-sm mx-auto"
              animate={{ 
                rotateY: [0, 5, 0, -5, 0],
                rotateX: [0, -3, 0, 3, 0]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut"
              }}
            >
              {/* Phone Frame with realistic shadows and reflections */}
              <div className="relative overflow-hidden rounded-[40px] border-[10px] border-gray-900 shadow-2xl mx-auto max-w-xs sm:max-w-sm transform rotate-0 transition-all duration-500 hover:rotate-1">
                {/* Phone Notch */}
                <div className="absolute top-0 inset-x-0 h-6 bg-gray-900 z-10 flex justify-center items-end pb-1 rounded-b-xl">
                  <div className="w-20 h-[5px] bg-gray-800 rounded-full"></div>
                </div>
                
                {/* Reflective screen effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-transparent z-20 pointer-events-none"></div>
                
                {/* App screen mockup with Life Map visualization */}
                <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 aspect-[9/19] overflow-hidden relative">
                  {/* App header with redesigned navNote branding */}
                  <div className="p-5 bg-gradient-to-r from-blue-900/40 to-indigo-900/40 backdrop-blur-md border-b border-white/10 flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-lg mb-0 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">navNote</h3>
                      <p className="text-xs text-blue-300/80">Life Map Dashboard</p>
                    </div>
                    <div className="flex space-x-2">
                      <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        >
                          <MapPin className="h-4 w-4 text-blue-400" />
                        </motion.div>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Life Map Visualization with animated connections */}
                  <div className="relative h-48 bg-slate-900/60 overflow-hidden">
                    <div className="absolute inset-0">
                      {/* Map Grid Lines */}
                      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBzdHJva2U9InJnYmEoMTQ2LCAxNzEsIDI1NSwgMC4wNSkiIGQ9Ik0wIDBMMjAgMjBNMjAgMEwwIDIwIi8+PC9nPjwvc3ZnPg==')] opacity-30"></div>
                      
                      {/* Animated Map Points */}
                      {Array.from({ length: 6 }).map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-3 h-3 rounded-full"
                          style={{
                            backgroundColor: i % 3 === 0 ? '#60a5fa' : i % 3 === 1 ? '#818cf8' : '#a78bfa',
                            top: `${20 + Math.random() * 60}%`,
                            left: `${10 + Math.random() * 80}%`,
                          }}
                          initial={{ scale: 0.5, opacity: 0.5 }}
                          animate={{ 
                            scale: [0.5, 1, 0.5],
                            opacity: [0.5, 1, 0.5],
                            boxShadow: [
                              '0 0 0 0 rgba(96, 165, 250, 0)',
                              '0 0 0 4px rgba(96, 165, 250, 0.3)',
                              '0 0 0 0 rgba(96, 165, 250, 0)'
                            ]
                          }}
                          transition={{
                            duration: 3 + i,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.5
                          }}
                        />
                      ))}
                      
                      {/* Connecting Lines */}
                      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: -1 }}>
                        {Array.from({ length: 5 }).map((_, i) => (
                          <motion.path
                            key={i}
                            d={`M${20 + Math.random() * 80} ${20 + Math.random() * 60} Q ${40 + Math.random() * 40} ${20 + Math.random() * 60}, ${20 + Math.random() * 80} ${20 + Math.random() * 60}`}
                            stroke={i % 2 === 0 ? '#60a5fa' : '#818cf8'}
                            strokeWidth="1"
                            fill="none"
                            strokeDasharray="5,5"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ 
                              pathLength: [0, 1],
                              opacity: [0, 0.3, 0]
                            }}
                            transition={{
                              duration: 4,
                              repeat: Infinity,
                              ease: "easeInOut",
                              delay: i * 0.7
                            }}
                          />
                        ))}
                      </svg>
                      
                      {/* Current Location Pulse */}
                      <motion.div
                        className="absolute w-6 h-6 rounded-full"
                        style={{
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          backgroundColor: 'rgba(59, 130, 246, 0.3)'
                        }}
                        animate={{ 
                          scale: [1, 2, 1],
                          opacity: [0.7, 0, 0.7]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                      <div className="absolute w-3 h-3 rounded-full bg-blue-500"
                        style={{
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)'
                        }}
                      />
                    </div>
                    
                    {/* Map Labels */}
                    <div className="absolute bottom-3 left-3 bg-black/30 backdrop-blur-sm rounded-lg px-2 py-1 text-xs text-blue-300 border border-blue-500/30">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span>Life Map Active</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Smart Task Cards */}
                  <div className="px-4 pt-2 pb-16">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-xs font-medium text-gray-400">NEARBY TASKS</h4>
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        className="h-4 w-4 text-blue-400"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                          <circle cx="12" cy="12" r="10"></circle>
                          <path d="M12 2a14 14 0 0 0 0 20 14 14 0 0 0 0-20"></path>
                          <path d="M2 12h20"></path>
                        </svg>
                      </motion.div>
                    </div>
                    
                    <motion.div 
                      variants={fadeInUpVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: 0.7 }}
                      className="mb-2.5 p-3 bg-gradient-to-r from-blue-900/20 to-blue-800/10 backdrop-blur-sm rounded-lg border border-blue-500/20 relative overflow-hidden"
                    >
                      <div className="absolute right-0 top-0 w-20 h-20 bg-blue-500/10 rounded-full blur-xl -mr-10 -mt-10"></div>
                      <div className="flex justify-between items-start relative">
                        <div>
                          <h4 className="font-medium text-blue-400">Grocery Shopping</h4>
                          <p className="text-[10px] text-gray-400 mt-0.5 flex items-center gap-1">
                            <MapPin className="h-3 w-3" /> Whole Foods Market
                          </p>
                        </div>
                        <div className="bg-blue-500/20 p-1.5 rounded-full">
                          <span className="block h-2 w-2 bg-blue-400 rounded-full"></span>
                        </div>
                      </div>
                      <div className="mt-1.5 flex gap-1">
                        <span className="text-[10px] px-2 py-0.5 bg-blue-500/20 rounded-full">5m away</span>
                        <span className="text-[10px] px-2 py-0.5 bg-purple-500/20 rounded-full">5pm</span>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      variants={fadeInUpVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: 0.9 }}
                      className="mb-2.5 p-3 bg-gradient-to-r from-indigo-900/20 to-violet-800/10 backdrop-blur-sm rounded-lg border border-indigo-500/20 relative overflow-hidden"
                    >
                      <div className="absolute right-0 top-0 w-16 h-16 bg-indigo-500/10 rounded-full blur-xl -mr-8 -mt-8"></div>
                      <div className="flex justify-between items-start relative">
                        <div>
                          <h4 className="font-medium text-indigo-400">Team Meeting</h4>
                          <p className="text-[10px] text-gray-400 mt-0.5 flex items-center gap-1">
                            <Clock className="h-3 w-3" /> Office - Conference Room
                          </p>
                        </div>
                        <div className="bg-indigo-500/20 p-1.5 rounded-full">
                          <span className="block h-2 w-2 bg-indigo-400 rounded-full"></span>
                        </div>
                      </div>
                      <div className="mt-1.5 flex gap-1">
                        <span className="text-[10px] px-2 py-0.5 bg-indigo-500/20 rounded-full">Work</span>
                        <span className="text-[10px] px-2 py-0.5 bg-blue-500/20 rounded-full">45m</span>
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* Navigation Bar with Glowing Effects */}
                  <div className="absolute bottom-0 inset-x-0 h-16 bg-slate-900/80 backdrop-blur-lg border-t border-white/5 flex items-center justify-around px-6">
                    <motion.div 
                      whileHover={{ scale: 1.2 }}
                      className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-blue-400">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="3" y1="9" x2="21" y2="9"></line>
                        <line x1="9" y1="21" x2="9" y2="9"></line>
                      </svg>
                    </motion.div>
                    
                    <motion.div 
                      whileHover={{ scale: 1.2 }}
                      className="w-10 h-10 rounded-full bg-indigo-900/40 flex items-center justify-center relative"
                    >
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        animate={{
                          boxShadow: [
                            '0 0 0 0 rgba(79, 70, 229, 0)',
                            '0 0 0 3px rgba(79, 70, 229, 0.3)',
                            '0 0 0 0 rgba(79, 70, 229, 0)'
                          ]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatType: "loop"
                        }}
                      />
                      <MapPin className="h-5 w-5 text-indigo-400" />
                    </motion.div>
                    
                    <motion.div 
                      whileHover={{ scale: 1.2 }}
                      className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-blue-400">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M12 16v-4"></path>
                        <path d="M12 8h.01"></path>
                      </svg>
                    </motion.div>
                  </div>
                </div>
              </div>
              
              {/* Phone Light Reflection */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[40px]">
                <motion.div 
                  className="absolute -inset-full bg-gradient-to-tr from-blue-500/20 via-white/10 to-transparent transform rotate-12"
                  animate={{
                    left: ['-100%', '100%'],
                    top: ['-100%', '100%']
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut"
                  }}
                />
              </div>
            </motion.div>
            
            {/* Decorative elements - more tech-focused */}
            <motion.div 
              className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-blue-600/30 to-indigo-600/30 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            
            <motion.div 
              className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-indigo-600/30 to-purple-600/30 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            
            {/* Tech dots surrounding the phone */}
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full bg-blue-400"
                style={{
                  top: `${30 + Math.sin(i * 45 * Math.PI / 180) * 150}%`,
                  left: `${50 + Math.cos(i * 45 * Math.PI / 180) * 150}%`,
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.7, 0.3]
                }}
                transition={{
                  duration: 2 + i % 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: i * 0.2
                }}
              />
            ))}
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