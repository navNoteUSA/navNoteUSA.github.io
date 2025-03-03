import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Brain, Server, Cpu, Lock } from 'lucide-react';

const Technology: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const technologies = [
    {
      title: 'On-Device AI Processing',
      description: 'Faster, secure, and private AI processing that keeps your sensitive data on your device.',
      icon: <Cpu className="w-6 h-6 text-blue-400" />,
      delay: 0.1
    },
    {
      title: 'Next-Gen AI Integration',
      description: 'Cutting-edge technology including CNN compression, Diffusion Models, and advanced Sensor Fusion.',
      icon: <Brain className="w-6 h-6 text-blue-400" />,
      delay: 0.2
    },
    {
      title: 'Privacy-First Design',
      description: 'End-to-end encryption and local data processing ensure your information remains secure.',
      icon: <Lock className="w-6 h-6 text-blue-400" />,
      delay: 0.3
    }
  ];

  return (
    <section id="technology" className="py-8 -mt-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-circuit-pattern opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-blue-950/30 to-slate-950"></div>
      
      {/* Animated network connections */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="network-connections"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">The navNote AI System</h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            We've built a cutting-edge AI system that understands context, location, and time to deliver a truly intuitive experience.
          </p>
        </motion.div>
        
        {/* Main technology highlight */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-20 bg-gradient-to-r from-slate-900 to-slate-800 p-8 rounded-2xl shadow-xl border border-slate-700/50 max-w-4xl mx-auto"
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/3 flex justify-center">
              <div className="relative w-48 h-48 flex items-center justify-center">
                <div className="absolute inset-0 bg-blue-500/10 animate-pulse-slow rounded-full"></div>
                <div className="absolute inset-4 bg-blue-500/20 animate-pulse-slow rounded-full" style={{ animationDelay: '0.3s' }}></div>
                <div className="absolute inset-8 bg-blue-500/30 animate-pulse-slow rounded-full" style={{ animationDelay: '0.6s' }}></div>
                <div className="relative bg-gradient-to-br from-blue-600 to-blue-400 p-5 rounded-full shadow-glow-lg">
                  <Brain className="w-14 h-14 text-white" />
                </div>
              </div>
            </div>
            <div className="w-full md:w-2/3">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Advanced AI Architecture</h3>
              <p className="text-lg text-gray-300">
                Our proprietary AI model combines natural language processing, spatial awareness, and temporal reasoning to create a truly contextual assistant that understands not just what you need to do, but when and where you need to do it.
              </p>
            </div>
          </div>
        </motion.div>
        
        {/* Technology features grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: tech.delay }}
              className="bg-slate-900/80 border border-slate-800/50 p-6 rounded-xl hover:shadow-glow-sm transition-all"
            >
              <div className="p-3 bg-gradient-to-br from-slate-800 to-slate-700 rounded-lg inline-flex mb-4">
                {tech.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{tech.title}</h3>
              <p className="text-gray-300">{tech.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Technology;