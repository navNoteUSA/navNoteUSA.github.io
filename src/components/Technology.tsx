import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Brain, Server, Cpu, Lock, Shield, Zap } from 'lucide-react';

const Technology: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const technologies = [
    {
      title: 'On-Device AI Processing',
      description: 'Faster, secure, and private AI processing that keeps your sensitive data on your device.',
      icon: <Cpu className="w-7 h-7 text-cyan-400" />,
      color: 'from-cyan-600 to-cyan-400',
      bgColor: 'bg-cyan-500/10',
      delay: 0.1
    },
    {
      title: 'Next-Gen AI Integration',
      description: 'Cutting-edge technology including CNN compression, Diffusion Models, and advanced Sensor Fusion.',
      icon: <Zap className="w-7 h-7 text-indigo-400" />,
      color: 'from-indigo-600 to-indigo-400',
      bgColor: 'bg-indigo-500/10',
      delay: 0.2
    },
    {
      title: 'Privacy-First Design',
      description: 'End-to-end encryption and local data processing ensure your information remains secure.',
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

  return (
    <section id="technology" className="py-20 relative overflow-hidden">
      {/* Advanced background elements */}
      <div className="absolute inset-0 bg-circuit-pattern opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-blue-950/20 to-slate-950"></div>
      
      {/* Animated technological hexagons */}
      <div className="absolute inset-0 overflow-hidden">
        {hexagons.map((hex, index) => (
          <motion.div
            key={index}
            className="absolute opacity-10"
            style={{
              top: `${hex.y}%`,
              left: `${hex.x}%`,
              width: `${hex.size}px`,
              height: `${hex.size}px`,
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              background: `linear-gradient(45deg, rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.3))`,
            }}
            animate={{
              opacity: [0.05, 0.2, 0.05],
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: hex.duration,
              repeat: Infinity,
              delay: hex.delay,
              ease: "linear",
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center justify-center px-4 py-1.5 bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-full mb-6 backdrop-blur-sm border border-blue-500/20">
            <div className="w-2 h-2 rounded-full bg-blue-400 mr-2 animate-pulse"></div>
            <span className="text-blue-400 text-sm font-medium">AI-Powered Innovation</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-100 via-blue-300 to-indigo-200">The navNote AI System</h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We've built a cutting-edge AI system that understands context, location, and time to deliver a truly intuitive experience.
          </p>
        </motion.div>
        
        {/* Main technology highlight with enhanced visuals */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-24 bg-gradient-to-r from-slate-900 to-slate-800 p-0.5 rounded-2xl shadow-2xl max-w-5xl mx-auto overflow-hidden"
        >
          <div className="relative backdrop-blur-sm bg-slate-900/90 rounded-2xl p-10 overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full filter blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/5 rounded-full filter blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
            
            {/* Content */}
            <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
              <div className="w-full md:w-2/5 flex justify-center">
                <div className="relative w-64 h-64 flex items-center justify-center">
                  {/* Animated rings */}
                  {[1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      className="absolute inset-0 rounded-full border-2 border-blue-500/20"
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.1, 0.3, 0.1],
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
                    animate={{ rotate: 45, scale: [1, 1.05, 1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <motion.div 
                      className="transform -rotate-45"
                      animate={{ rotate: -45 }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
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
                      animate={{
                        y: [0, -10, 0],
                        opacity: [0, 1, 0],
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
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300">Advanced AI Architecture</h3>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Our proprietary AI model combines natural language processing, spatial awareness, and temporal reasoning to create a truly contextual assistant that understands not just what you need to do, but when and where you need to do it.
                </p>
                
                {/* Tech specs indicator */}
                <div className="mt-8 flex items-center">
                  <div className="relative mr-4">
                    <div className="w-12 h-3 bg-slate-700 rounded-full"></div>
                    <motion.div 
                      className="absolute top-0 left-0 h-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                      animate={{ width: ['0%', '75%', '60%', '85%', '75%'] }}
                      transition={{ duration: 5, repeat: Infinity }}
                    ></motion.div>
                  </div>
                  <span className="text-sm text-blue-300 font-mono">AI PROCESSING</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Technology features grid with enhanced cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: tech.delay }}
              className="group relative p-0.5 rounded-xl bg-gradient-to-r from-slate-800 via-blue-900/30 to-slate-800 overflow-hidden shadow-lg hover:shadow-blue-900/20 transition-all duration-300"
            >
              {/* Card background with animation */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className={`absolute inset-0 ${tech.bgColor} blur-xl`}></div>
              </div>
              
              {/* Card content */}
              <div className="relative bg-slate-900 rounded-xl p-8 h-full z-10">
                <div className="flex items-start mb-6">
                  {/* Icon container with animation */}
                  <motion.div
                    className={`p-3 bg-gradient-to-br ${tech.color} rounded-xl shadow-lg`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {tech.icon}
                  </motion.div>
                  
                  {/* Tech specification indicator */}
                  <div className="ml-auto flex space-x-1">
                    {[1, 2, 3].map(i => (
                      <div 
                        key={i} 
                        className={`w-1 h-4 rounded-full ${i <= 2 ? tech.bgColor : 'bg-slate-700'}`}
                      ></div>
                    ))}
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold mb-3">{tech.title}</h3>
                <p className="text-gray-300">{tech.description}</p>
                
                {/* Hover indicator */}
                <motion.div 
                  className="absolute bottom-3 right-3 w-6 h-6 flex items-center justify-center"
                  whileHover={{ scale: 1.2 }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 group-hover:bg-blue-300 transition-colors"></div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Technology;