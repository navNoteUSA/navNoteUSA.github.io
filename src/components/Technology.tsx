import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Brain, Server, Cpu, Lock, Shield, Zap } from 'lucide-react';

// Define types for Vanta and window
declare global {
  interface Window {
    VANTA: any;
    THREE: any;
    technologyEffect: any;
  }
}

const Technology: React.FC = () => {
  // Create a ref for the section element
  const sectionRef = useRef<HTMLElement>(null);

  // Add useEffect for Vanta initialization and cleanup
  useEffect(() => {
    // Make sure window, VANTA, and the section element exist
    if (typeof window !== 'undefined' && window.VANTA && sectionRef.current) {
      // Check if screen is mobile size
      const isMobile = window.matchMedia('(max-width: 768px)').matches;
      
      // Only initialize Vanta effect on non-mobile devices
      if (!isMobile) {
        // Function to initialize or reinitialize the effect
        const initVantaEffect = () => {
          // Cleanup previous effect if it exists
          if (window.technologyEffect && typeof window.technologyEffect.destroy === 'function') {
            window.technologyEffect.destroy();
          }

          // Initialize the HALO effect for desktop only
          window.technologyEffect = window.VANTA.HALO({
            el: sectionRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            baseColor: 0x172957,
            backgroundColor: 0x040509,
            amplitudeFactor: 0.30,
            xOffset: undefined,
            yOffset: 0.05,
            size: 2.00
          });
        };

        // Initialize the effect
        initVantaEffect();

        // Add resize listener to update effect on screen size change
        const handleResize = () => {
          const isNowMobile = window.matchMedia('(max-width: 768px)').matches;
          
          // If view changed to mobile, destroy the effect
          if (isNowMobile) {
            if (window.technologyEffect && typeof window.technologyEffect.destroy === 'function') {
              window.technologyEffect.destroy();
              window.technologyEffect = null;
            }
          } else {
            // If changed to desktop, initialize the effect
            initVantaEffect();
          }
        };

        window.addEventListener('resize', handleResize);

        // Return cleanup function to remove event listener and destroy effect
        return () => {
          window.removeEventListener('resize', handleResize);
          if (window.technologyEffect && typeof window.technologyEffect.destroy === 'function') {
            window.technologyEffect.destroy();
          }
        };
      }
    }

    // Cleanup function for Vanta effect when component unmounts
    return () => {
      if (window.technologyEffect && typeof window.technologyEffect.destroy === 'function') {
        window.technologyEffect.destroy();
      }
    };
  }, []);

  const [mainRef, mainInView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const [titleRef, titleInView] = useInView({
    triggerOnce: false,
    threshold: 0.5,
    rootMargin: "-50px 0px"
  });

  const [archRef, archInView] = useInView({
    triggerOnce: false,
    threshold: 0.4,
  });

  const [featuresRef, featuresInView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  // Scroll-based parallax effect
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const titleY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const technologies = [
    {
      title: 'On-Device AI Processing',
      description: 'Advanced edge computing architecture delivers real-time intelligence while maintaining complete data sovereignty.',
      icon: <Cpu className="w-7 h-7 text-cyan-400" />,
      color: 'from-cyan-600 to-cyan-400',
      bgColor: 'bg-cyan-500/10',
      delay: 0.1
    },
    {
      title: 'Next-Gen AI Integration',
      description: 'Leveraging state-of-the-art transformer networks, quantum-inspired ML models, and advanced neural prediction algorithms.',
      icon: <Zap className="w-7 h-7 text-indigo-400" />,
      color: 'from-indigo-600 to-indigo-400',
      bgColor: 'bg-indigo-500/10',
      delay: 0.2
    },
    {
      title: 'Privacy-First Design',
      description: 'Military-grade encryption and sandboxed execution environment with zero data harvesting or third-party access.',
      icon: <Shield className="w-7 h-7 text-emerald-400" />,
      color: 'from-emerald-600 to-emerald-400',
      bgColor: 'bg-emerald-500/10',
      delay: 0.3
    }
  ];

  const hexagons = Array.from({ length: 20 }, (_, i) => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 60 + 20,
    delay: Math.random() * 10,
    duration: Math.random() * 20 + 10,
  }));

  const titleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        ease: "easeOut"
      }
    })
  };

  return (
    <section id="technology" ref={sectionRef} className="pt-8 pb-20 relative overflow-hidden">
      {/* Background elements now simplified to not interfere with Vanta */}
      <div className="absolute inset-0 z-0"></div>
      
      {/* Container with improved styling for text readability */}
      <div className="container mx-auto px-4 relative z-20">
        <motion.div
          ref={titleRef}
          className="text-center mb-20"
        >
          <motion.div 
            className="inline-flex items-center justify-center px-4 py-1.5 bg-gradient-to-r from-blue-900/60 to-purple-900/60 rounded-full mb-6 backdrop-blur-md border border-blue-500/30"
            variants={titleVariants}
            initial="hidden"
            animate={titleInView ? "visible" : "hidden"}
            custom={0}
          >
            <motion.div 
              className="w-2 h-2 rounded-full bg-blue-400 mr-2"
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            ></motion.div>
            <span className="text-blue-400 text-sm font-medium">State-of-the-Art Technology</span>
          </motion.div>
          
          <motion.h2 
            className="text-3xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-100 via-blue-300 to-indigo-200 drop-shadow-md"
            variants={titleVariants}
            initial="hidden"
            animate={titleInView ? "visible" : "hidden"}
            custom={1}
          >
            The navNote Intelligence Platform
          </motion.h2>
          
          <motion.p 
            className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed shadow-sm"
            variants={titleVariants}
            initial="hidden"
            animate={titleInView ? "visible" : "hidden"}
            custom={2}
          >
            Our proprietary AI platform integrates contextual awareness, geospatial intelligence, and temporal dynamics to deliver an experience that anticipates your needs with unparalleled precision.
          </motion.p>
        </motion.div>
        
        {/* Main technology highlight with enhanced visuals */}
        <motion.div
          ref={archRef}
          initial={{ opacity: 0, y: 50 }}
          animate={archInView ? { 
            opacity: 1, 
            y: 0,
            transition: { 
              duration: 0.8,
              type: "spring",
              stiffness: 100
            }
          } : {
            opacity: 0,
            y: 50
          }}
          className="mb-24 bg-gradient-to-r from-slate-900/80 to-slate-800/80 p-0.5 rounded-2xl shadow-2xl max-w-5xl mx-auto overflow-hidden backdrop-blur-md border border-slate-700/30"
        >
          <div className="relative backdrop-blur-lg bg-slate-900/70 rounded-2xl p-10 overflow-hidden">
            {/* Decorative elements */}
            <motion.div 
              className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full filter blur-3xl transform translate-x-1/2 -translate-y-1/2"
              animate={archInView ? {
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              } : {}}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            ></motion.div>
            <motion.div 
              className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/5 rounded-full filter blur-3xl transform -translate-x-1/2 translate-y-1/2"
              animate={archInView ? {
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.5, 0.3],
              } : {}}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            ></motion.div>
            
            {/* Content */}
            <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
              <div className="w-full md:w-2/5 flex justify-center">
                <div className="relative w-64 h-64 flex items-center justify-center">
                  {/* Animated rings */}
                  {[1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      className="absolute inset-0 rounded-full border-2 border-blue-500/20"
                      animate={archInView ? {
                        scale: [1, 1.1, 1],
                        opacity: [0.1, 0.3, 0.1],
                      } : {
                        scale: 1,
                        opacity: 0.1
                      }}
                      transition={{
                        duration: 3,
                        delay: i * 0.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      style={{ margin: `${i * 20}px` }}
                    />
                  ))}
                  
                  {/* Center icon */}
                  <motion.div
                    className="relative w-24 h-24 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg flex items-center justify-center transform rotate-45 z-10"
                    animate={archInView ? { 
                      rotate: 45, 
                      scale: [1, 1.05, 1],
                      boxShadow: [
                        "0px 0px 15px 0px rgba(37, 99, 235, 0.3)",
                        "0px 0px 30px 5px rgba(37, 99, 235, 0.5)",
                        "0px 0px 15px 0px rgba(37, 99, 235, 0.3)"
                      ]
                    } : {
                      rotate: 45,
                      scale: 1
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                  >
                    <motion.div 
                      className="transform -rotate-45"
                      animate={archInView ? { rotate: -45 } : {}}
                      transition={{ 
                        duration: 4, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                      }}
                    >
                      <Brain className="w-14 h-14 text-white" />
                    </motion.div>
                  </motion.div>
                  
                  {/* Floating particles */}
                  {Array.from({ length: 8 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-blue-400 rounded-full"
                      style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                      }}
                      animate={archInView ? {
                        y: [0, -10, 0],
                        opacity: [0, 1, 0],
                      } : {
                        opacity: 0
                      }}
                      transition={{
                        duration: 2 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                      }}
                    />
                  ))}
                </div>
              </div>
              
              <div className="w-full md:w-3/5">
                <motion.h3 
                  className="text-2xl md:text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300"
                  initial={{ opacity: 0, x: 50 }}
                  animate={archInView ? { 
                    opacity: 1, 
                    x: 0,
                    transition: { 
                      duration: 0.6, 
                      delay: 0.2,
                      type: "spring"
                    }
                  } : {
                    opacity: 0,
                    x: 50
                  }}
                >
                  Advanced AI Architecture
                </motion.h3>
                
                <motion.p 
                  className="text-lg text-gray-300 leading-relaxed"
                  initial={{ opacity: 0, x: 50 }}
                  animate={archInView ? { 
                    opacity: 1, 
                    x: 0,
                    transition: { 
                      duration: 0.6, 
                      delay: 0.4 
                    }
                  } : {
                    opacity: 0,
                    x: 50
                  }}
                >
                  Our flagship architecture combines adaptive neural networks with multimodal context processing for unprecedented intelligence. This breakthrough system integrates advanced NLP algorithms with proprietary spatial reasoning models to create a truly cognizant digital assistant that goes beyond simple task management.
                </motion.p>
                
                {/* Tech specs indicator */}
                <motion.div 
                  className="mt-8 flex items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={archInView ? { 
                    opacity: 1, 
                    y: 0,
                    transition: { 
                      duration: 0.6, 
                      delay: 0.6 
                    }
                  } : {
                    opacity: 0,
                    y: 20
                  }}
                >
                  <div className="relative mr-4">
                    <div className="w-12 h-3 bg-slate-700 rounded-full"></div>
                    <motion.div 
                      className="absolute top-0 left-0 h-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                      animate={archInView ? { 
                        width: ['0%', '75%', '60%', '85%', '75%'] 
                      } : {
                        width: "0%"
                      }}
                      transition={{ 
                        duration: 5, 
                        repeat: Infinity 
                      }}
                    ></motion.div>
                  </div>
                  <span className="text-sm text-blue-300 font-mono">AI PROCESSING</span>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Technology features grid with enhanced cards */}
        <motion.div 
          ref={featuresRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={featuresInView ? { 
                opacity: 1, 
                y: 0,
                transition: { 
                  duration: 0.6, 
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 50
                }
              } : {
                opacity: 0,
                y: 50
              }}
              whileHover={{ 
                y: -10,
                transition: {
                  duration: 0.3,
                  ease: "easeOut"
                }
              }}
              className="group relative p-0.5 rounded-xl bg-gradient-to-r from-slate-800/80 via-blue-900/50 to-slate-800/80 overflow-hidden shadow-lg hover:shadow-blue-900/40 transition-all duration-300 backdrop-blur-md border border-slate-700/30"
            >
              {/* Card background with animation */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className={`absolute inset-0 ${tech.bgColor} blur-xl`}></div>
              </div>
              
              {/* Card content */}
              <div className="relative bg-slate-900/70 backdrop-blur-lg rounded-xl p-8 h-full z-10">
                <div className="flex items-start mb-6">
                  {/* Icon container with animation */}
                  <motion.div
                    className={`p-3 bg-gradient-to-br ${tech.color} rounded-xl shadow-lg`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {tech.icon}
                  </motion.div>
                  
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold mb-2 text-white">{tech.title}</h3>
                    <p className="text-gray-200 leading-relaxed">{tech.description}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Technology;