import React, { useEffect, useState, useRef, useContext } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Clock, Brain, Shield, ChevronRight } from 'lucide-react';
import { MotionContext } from '../App';

interface HeroProps {
  openDemoForm?: () => void;
  openAuthForm?: () => void;
}

declare global {
  interface Window {
    VANTA: any;
  }
}

const Hero: React.FC<HeroProps> = ({ openDemoForm, openAuthForm }) => {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const vantaRef = useRef<any>(null);
  
  // Get values from the context
  const { prefersReducedMotion, isMobile } = useContext(MotionContext);
  
  // Animation variants - simplified for mobile
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.2,
        delayChildren: prefersReducedMotion ? 0 : 0.3
      }
    }
  };
  
  const itemVariants = prefersReducedMotion ? {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  } : {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };
  
  const buttonVariants = prefersReducedMotion ? {
    hover: { scale: 1.02 },
    tap: { scale: 0.98 }
  } : {
    hover: { 
      scale: 1.05,
      boxShadow: "0 10px 25px rgba(59, 130, 246, 0.5)",
      transition: { type: "spring", stiffness: 400, damping: 10 }
    },
    tap: { scale: 0.95 }
  };
  
  // Disable animation on mobile
  const iconVariants = prefersReducedMotion ? {
    initial: { scale: 1 },
    animate: { scale: 1 }
  } : {
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
  
  const fadeInUpVariants = prefersReducedMotion ? {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  } : {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };
  
  // Initialize Vanta.js NET effect only on desktop
  useEffect(() => {
    if (!vantaRef.current && heroRef.current && window.VANTA) {
      vantaRef.current = window.VANTA.NET({
        el: heroRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0x1f1f59,
        backgroundColor: 0x0,
        points: 10.00,
        maxDistance: 20.00,
        spacing: 20.00
      });
    }

    return () => {
      if (vantaRef.current) {
        vantaRef.current.destroy();
      }
    };
  }, []);
  
  // Handle scroll effect for parallax - only add on desktop
  useEffect(() => {
    if (isMobile || prefersReducedMotion) {
      return; // Skip parallax effect on mobile or with reduced motion
    }
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile, prefersReducedMotion]);
  
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
      id="vanta-background"
      className="min-h-screen flex items-center relative overflow-hidden pt-16 pb-16"
      style={{
        backgroundColor: "#141422"
      }}
    >
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
              Revolutionary <span className="bg-gradient-to-r from-[var(--text-gradient-start)] to-[var(--text-gradient-end)] bg-clip-text text-transparent">Contextual Intelligence</span> for Your Digital Life
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-xl text-[var(--text-tertiary)] mb-8"
            >
              navNote seamlessly integrates location, time, and context to transform task management into an intuitive experience that anticipates your needs and evolves with your lifestyle.
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
                className="btn-primary btn-large"
              >
                Request Demo <ArrowRight className="h-5 w-5" />
              </motion.button>
              
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={handleGetStarted}
                className="btn-secondary btn-large"
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
                  <p className="text-gray-400 text-sm">Smart geofencing delivers precise tasks at optimal locations</p>
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
                  <p className="text-gray-400 text-sm">Adaptive scheduling that maximizes productivity and efficiency</p>
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
                  <p className="text-gray-400 text-sm">Proprietary neural networks that learn and predict your optimal workflows</p>
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
                  <p className="text-gray-400 text-sm">End-to-end encryption with secure on-device processing</p>
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
              {/* iPhone 16 Pro frame */}
              <div className="relative mx-auto max-w-xs sm:max-w-sm">
                {/* Phone outer frame with titanium finish */}
                <div className="relative overflow-hidden rounded-[40px] border-[8px] border-[#1C1C1E] bg-gradient-to-b from-[#2B2B2D] to-[#1C1C1E] shadow-2xl mx-auto max-w-xs sm:max-w-sm">
                  {/* Dynamic Island */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[100px] h-7 bg-black rounded-b-[18px] z-20 flex justify-center items-center">
                    <div className="w-3 h-3 rounded-full bg-black border border-[#3A3A3C] mr-8 flex items-center justify-center overflow-hidden">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#3A3A3C]"></div>
                    </div>
                    <div className="w-[8px] h-[8px] rounded-full bg-[#3A3A3C]"></div>
                  </div>
                  
                  {/* Side button */}
                  <div className="absolute right-[-12px] top-[100px] w-[4px] h-[30px] bg-[#1A1A1C] rounded-l-sm"></div>
                  <div className="absolute right-[-12px] top-[140px] w-[4px] h-[60px] bg-[#1A1A1C] rounded-l-sm"></div>
                  <div className="absolute left-[-12px] top-[100px] w-[4px] h-[50px] bg-[#1A1A1C] rounded-r-sm"></div>
                  
                  {/* App screen with gradient background */}
                  <div className="bg-gradient-to-b from-slate-900 to-slate-950 aspect-[9/19.5] overflow-hidden relative">
                    {/* Status bar with iOS style */}
                    <div className="absolute top-0 w-full flex justify-between items-center px-6 py-2 z-10 text-white text-xs">
                      <span className="font-medium">11:42</span>
                      <div className="flex gap-1.5 items-center">
                        <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                          <path d="M1 4.5C1 2.84315 2.34315 1.5 4 1.5H12C13.6569 1.5 15 2.84315 15 4.5V7.5C15 9.15685 13.6569 10.5 12 10.5H4C2.34315 10.5 1 9.15685 1 7.5V4.5Z" stroke="currentColor" />
                          <path d="M5 6H11" stroke="currentColor" strokeLinecap="round" />
                          <path d="M13.5 4.5V7.5" stroke="currentColor" strokeLinecap="round" />
                        </svg>
                        <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                          <path d="M11.8337 1.33334H13.1671C13.6273 1.33334 14 1.70596 14 2.16668V9.83334C14 10.2941 13.6273 10.6667 13.1671 10.6667H11.8337" stroke="currentColor" strokeLinecap="round" />
                          <path d="M8.16683 3.5C8.16683 2.57953 8.91303 1.83334 9.8335 1.83334H11.3335V10.1667H9.8335C8.91303 10.1667 8.16683 9.42047 8.16683 8.5V3.5Z" stroke="currentColor" />
                          <path d="M1.66683 5.5C1.66683 3.38987 3.39004 1.66666 5.50016 1.66666H8.16683V10.3333H5.50016C3.39004 10.3333 1.66683 8.61013 1.66683 6.5V5.5Z" fill="currentColor" />
                        </svg>
                      </div>
                    </div>
                  
                    {/* Custom glassmorphism header with logo */}
                    <div className="p-4 mt-6 bg-gradient-to-r from-slate-900/90 to-slate-800/90 backdrop-blur-md border-b border-slate-700/30 flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-7 h-7 rounded-md bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mr-2">
                          <span className="text-xs font-bold text-white">n</span>
                        </div>
                        <div>
                          <h3 className="font-bold text-base text-white">navNote</h3>
                          <p className="text-[10px] text-blue-400">Life Map</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-slate-800/80 border border-slate-700/50 flex items-center justify-center">
                          <MapPin className="h-3 w-3 text-blue-400" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Enhanced Life Map Visualization - Core feature */}
                    <div className="relative h-52 bg-gradient-to-br from-slate-900 to-slate-950 overflow-hidden">
                      {/* Professional map grid background */}
                      <div className="absolute inset-0 bg-[linear-gradient(rgba(30,41,59,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(30,41,59,0.8)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20"></div>
                      
                      {/* Map overlay with blue glow */}
                      <div className="absolute inset-0 bg-blue-900/5 backdrop-blur-[2px]"></div>
                      
                      {/* Life Map visualization - more organized with clear paths */}
                      <div className="absolute inset-0">
                        {/* Path lines - simplified and more structured */}
                        <svg className="absolute inset-0 w-full h-full opacity-60" style={{ zIndex: 0 }}>
                          {/* Home to Work Path */}
                          <motion.path
                            d="M110 80 C 140 50, 160 50, 190 80"
                            stroke="url(#gradient1)"
                            strokeWidth="2"
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
                            stroke="url(#gradient2)"
                            strokeWidth="2"
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
                            stroke="url(#gradient3)"
                            strokeWidth="2"
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
                          
                          {/* SVG Gradients for paths */}
                          <defs>
                            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#60a5fa" />
                              <stop offset="100%" stopColor="#3b82f6" />
                            </linearGradient>
                            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#818cf8" />
                              <stop offset="100%" stopColor="#6366f1" />
                            </linearGradient>
                            <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#a78bfa" />
                              <stop offset="100%" stopColor="#8b5cf6" />
                            </linearGradient>
                          </defs>
                        </svg>
                        
                        {/* Location Points - Consistent, meaningful locations */}
                        {/* Home Location */}
                        <motion.div
                          className="absolute w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center"
                          style={{ top: '80px', left: '110px' }}
                          animate={{ 
                            boxShadow: ['0 0 0 0 rgba(59, 130, 246, 0)', '0 0 0 10px rgba(59, 130, 246, 0.1)', '0 0 0 0 rgba(59, 130, 246, 0)']
                          }}
                          transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        </motion.div>
                        
                        {/* Work Location */}
                        <motion.div
                          className="absolute w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center"
                          style={{ top: '80px', left: '190px' }}
                          animate={{ 
                            boxShadow: ['0 0 0 0 rgba(99, 102, 241, 0)', '0 0 0 10px rgba(99, 102, 241, 0.1)', '0 0 0 0 rgba(99, 102, 241, 0)']
                          }}
                          transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 1
                          }}
                        >
                          <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                        </motion.div>
                        
                        {/* Store Location */}
                        <motion.div
                          className="absolute w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center"
                          style={{ top: '170px', left: '110px' }}
                          animate={{ 
                            boxShadow: ['0 0 0 0 rgba(34, 197, 94, 0)', '0 0 0 10px rgba(34, 197, 94, 0.1)', '0 0 0 0 rgba(34, 197, 94, 0)']
                          }}
                          transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 2
                          }}
                        >
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </motion.div>
                        
                        {/* Meeting Location */}
                        <motion.div
                          className="absolute w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center"
                          style={{ top: '160px', left: '220px' }}
                          animate={{ 
                            boxShadow: ['0 0 0 0 rgba(168, 85, 247, 0)', '0 0 0 10px rgba(168, 85, 247, 0.1)', '0 0 0 0 rgba(168, 85, 247, 0)']
                          }}
                          transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 3
                          }}
                        >
                          <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                        </motion.div>
                        
                        {/* Current Location Indicator - Pulse with gradient */}
                        <motion.div
                          className="absolute w-10 h-10 rounded-full"
                          style={{
                            top: '77px',
                            left: '107px',
                            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(59, 130, 246, 0) 70%)'
                          }}
                          animate={{ 
                            scale: [1, 1.6, 1],
                            opacity: [0.5, 0.2, 0.5]
                          }}
                          transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                      </div>
                      
                      {/* Professional UI Elements */}
                      <div className="absolute top-3 left-3 bg-slate-800/70 backdrop-blur-md rounded-md px-2 py-1 text-[10px] text-slate-200 border border-slate-700/50 shadow-lg">
                        <div className="flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                          <span>Home Location</span>
                        </div>
                      </div>
                      
                      <div className="absolute bottom-3 right-3 bg-slate-800/70 backdrop-blur-md rounded-md px-2 py-1 text-[10px] text-slate-200 border border-slate-700/50 shadow-lg">
                        <div className="flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                          <span>Life Map Active</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Task Section - Redesigned and more modern */}
                    <div className="px-4 pt-2 pb-12">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-xs font-medium text-blue-400">LOCATION-BASED TASKS</h4>
                      </div>
                      
                      {/* Home Task */}
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="mb-2 p-3 bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-700/50 relative shadow-md"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-1.5">
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                              <h4 className="font-medium text-sm text-white">Morning Routine</h4>
                            </div>
                            <p className="text-[10px] text-slate-300 mt-1 ml-3">Current location: Home</p>
                          </div>
                          <div className="text-[10px] px-2 py-1 bg-blue-500/20 rounded-md text-blue-400 font-medium border border-blue-500/20">
                            Now
                          </div>
                        </div>
                      </motion.div>
                      
                      {/* Work Task */}
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="mb-2 p-3 bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-700/50 relative shadow-md"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-1.5">
                              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                              <h4 className="font-medium text-sm text-white">Team Meeting</h4>
                            </div>
                            <p className="text-[10px] text-slate-300 mt-1 ml-3">Office - Conference Room</p>
                          </div>
                          <div className="text-[10px] px-2 py-1 bg-indigo-500/20 rounded-md text-indigo-400 font-medium border border-indigo-500/20">
                            9:30 AM
                          </div>
                        </div>
                      </motion.div>
                    </div>
                    
                    {/* Modern Action Bar with gradient */}
                    <div className="absolute bottom-0 inset-x-0 h-14 bg-gradient-to-r from-slate-900/90 to-slate-800/90 backdrop-blur-md border-t border-slate-700/30 flex items-center justify-around px-6">
                      <div className="flex flex-col items-center justify-center opacity-70">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-slate-400 mb-1">
                          <rect x="3" y="3" width="18" height="18" rx="2"></rect>
                          <line x1="9" y1="3" x2="9" y2="21"></line>
                        </svg>
                        <span className="text-[8px] text-slate-500">Dashboard</span>
                      </div>
                      
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center relative shadow-lg mb-1">
                          <motion.div
                            className="absolute inset-0 rounded-full"
                            animate={{
                              boxShadow: [
                                '0 0 0 0 rgba(59, 130, 246, 0)',
                                '0 0 0 4px rgba(59, 130, 246, 0.3)',
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
                          <MapPin className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-[8px] text-blue-400 font-medium">Life Map</span>
                      </div>
                      
                      <div className="flex flex-col items-center justify-center opacity-70">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-slate-400 mb-1">
                          <path d="M12 20h9"></path>
                          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                        </svg>
                        <span className="text-[8px] text-slate-500">Tasks</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* iPhone Home indicator */}
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-[120px] h-1 bg-white rounded-full z-20"></div>
                </div>
                
                {/* Phone reflection and shadow effects */}
                <div className="absolute inset-x-0 -bottom-10 h-10 bg-gradient-to-t from-black/20 to-transparent rounded-b-full"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent rounded-[40px] pointer-events-none"></div>
                <div className="absolute inset-0 bg-gradient-to-bl from-white/5 to-transparent rounded-[40px] pointer-events-none"></div>
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