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
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content - Text */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-left"
          >
            <motion.div variants={itemVariants} className="mb-2">
              <span className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-lg font-semibold px-3 py-1 rounded-full bg-opacity-10 border border-blue-500/30">
                Location-Aware • AI-Powered
              </span>
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            >
              AI-Driven <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Virtual Memory</span> That Evolves With You
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-xl text-gray-300 mb-8"
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
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium flex items-center gap-2 shadow-lg shadow-blue-500/30 transition-all"
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
            className="relative"
          >
            <div className="relative overflow-hidden rounded-3xl border-8 border-gray-800 shadow-2xl mx-auto max-w-xs sm:max-w-sm">
              <div className="absolute top-0 inset-x-0 h-2 bg-gray-800 z-10"></div>
              
              {/* App screen mockup */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 aspect-[9/16] overflow-hidden relative">
                {/* App header */}
                <div className="p-5 bg-blue-600/20 backdrop-blur-sm border-b border-white/10">
                  <h3 className="font-bold text-lg mb-1">navNote</h3>
                  <p className="text-sm text-gray-300">Your location-based tasks</p>
                </div>
                
                {/* Tasks with location markers */}
                <div className="p-4">
                  <motion.div 
                    variants={fadeInUpVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.7 }}
                    className="mb-4 p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 relative"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-blue-400">Grocery Shopping</h4>
                        <p className="text-sm text-gray-400 mt-1">Whole Foods Market</p>
                      </div>
                      <div className="bg-blue-500/20 p-1 rounded-full">
                        <MapPin className="h-4 w-4 text-blue-400" />
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2 italic">Will activate when you're nearby</p>
                    <div className="mt-2 flex gap-1">
                      <span className="text-xs px-2 py-0.5 bg-blue-500/20 rounded-full">Groceries</span>
                      <span className="text-xs px-2 py-0.5 bg-purple-500/20 rounded-full">5pm</span>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    variants={fadeInUpVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.9 }}
                    className="mb-4 p-4 bg-gradient-to-r from-purple-500/20 to-blue-500/10 backdrop-blur-sm rounded-lg border border-white/10"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-purple-300">Team Meeting</h4>
                        <p className="text-sm text-gray-400 mt-1">Office - Conference Room</p>
                      </div>
                      <div className="bg-purple-500/20 p-1 rounded-full">
                        <Clock className="h-4 w-4 text-purple-400" />
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Starts in 45 minutes</p>
                    <div className="mt-2 flex gap-1">
                      <span className="text-xs px-2 py-0.5 bg-purple-500/20 rounded-full">Work</span>
                      <span className="text-xs px-2 py-0.5 bg-blue-500/20 rounded-full">Important</span>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    variants={fadeInUpVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 1.1 }}
                    className="p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-teal-400">Dentist Appointment</h4>
                        <p className="text-sm text-gray-400 mt-1">Dr. Smith's Clinic</p>
                      </div>
                      <div className="bg-teal-500/20 p-1 rounded-full">
                        <MapPin className="h-4 w-4 text-teal-400" />
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2 italic">Tomorrow at 10:00 AM</p>
                    <div className="mt-2 flex gap-1">
                      <span className="text-xs px-2 py-0.5 bg-teal-500/20 rounded-full">Health</span>
                      <span className="text-xs px-2 py-0.5 bg-red-500/20 rounded-full">Priority</span>
                    </div>
                  </motion.div>
                </div>
                
                {/* Floating action button */}
                <div className="absolute bottom-4 right-4">
                  <motion.div 
                    animate={{ 
                      scale: [1, 1.1, 1],
                      boxShadow: [
                        "0 0 0 0 rgba(59, 130, 246, 0.5)",
                        "0 0 0 10px rgba(59, 130, 246, 0)",
                        "0 0 0 0 rgba(59, 130, 246, 0.5)",
                      ]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      repeatType: "loop"
                    }}
                    className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center shadow-lg"
                  >
                    <div className="text-white text-2xl font-bold">+</div>
                  </motion.div>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <motion.div 
              className="absolute -top-16 -right-16 w-32 h-32 bg-purple-600/30 rounded-full blur-3xl"
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
              className="absolute -bottom-20 -left-10 w-40 h-40 bg-blue-600/30 rounded-full blur-3xl"
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