import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Cpu, Network, Bot, Globe, LineChart } from 'lucide-react';

const Technology: React.FC = () => {
  return (
    <section id="technology" className="py-16 md:py-24 bg-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-circuit-pattern opacity-5"></div>
      <div className="radial-gradient absolute inset-0 bg-gradient-radial from-blue-900/20 to-transparent"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="section-heading text-3xl md:text-5xl">Our Technology</h2>
          <p className="section-subheading text-base md:text-lg max-w-2xl mx-auto">
            We've built a cutting-edge AI system that understands context, location, and time to deliver a truly intuitive experience.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="tech-content p-6 md:p-8 rounded-2xl border border-slate-800 bg-black/30 backdrop-blur-sm order-2 md:order-1"
          >
            <h3 className="text-xl md:text-2xl font-bold mb-4 text-white">Advanced AI Architecture</h3>
            <p className="text-sm md:text-base text-slate-300 mb-6">
              Our proprietary AI model combines natural language processing, spatial awareness, and temporal reasoning to create a truly contextual assistant that understands not just what you need to do, but when and where you need to do it.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="mr-3 bg-blue-500/20 p-2 rounded-full">
                  <Brain size={20} className="text-blue-400" />
                </div>
                <div>
                  <h4 className="text-base md:text-lg font-medium mb-1">Neural Network</h4>
                  <p className="text-xs md:text-sm text-slate-400">
                    Custom-trained neural networks that learn your habits and preferences to provide increasingly personalized suggestions.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-3 bg-purple-500/20 p-2 rounded-full">
                  <Cpu size={20} className="text-purple-400" />
                </div>
                <div>
                  <h4 className="text-base md:text-lg font-medium mb-1">On-Device Processing</h4>
                  <p className="text-xs md:text-sm text-slate-400">
                    Advanced edge computing allows most AI operations to run locally on your device, enhancing privacy and reducing latency.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-3 bg-green-500/20 p-2 rounded-full">
                  <Network size={20} className="text-green-400" />
                </div>
                <div>
                  <h4 className="text-base md:text-lg font-medium mb-1">Adaptive Learning</h4>
                  <p className="text-xs md:text-sm text-slate-400">
                    The system continuously improves based on your interactions, becoming more accurate and helpful over time.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-100px" }}
            className="tech-visual flex items-center justify-center p-4 order-1 md:order-2"
          >
            <div className="relative w-full max-w-sm mx-auto">
              <div className="ai-brain-animation">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-3xl opacity-20 animate-pulse"></div>
                <svg className="w-full h-auto" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                  <g className="opacity-20">
                    <path d="M100,10 L150,30 L150,70 L100,90 L50,70 L50,30 Z" fill="none" stroke="#4f46e5" strokeWidth="1" />
                    <path d="M100,90 L150,110 L150,150 L100,170 L50,150 L50,110 Z" fill="none" stroke="#4f46e5" strokeWidth="1" />
                    <path d="M150,30 L190,50 L190,90 L150,110 L150,70 Z" fill="none" stroke="#4f46e5" strokeWidth="1" />
                    <path d="M50,30 L10,50 L10,90 L50,110 L50,70 Z" fill="none" stroke="#4f46e5" strokeWidth="1" />
                    <path d="M100,10 C120,10 140,15 160,30" fill="none" stroke="#4f46e5" strokeWidth="1" />
                    <path d="M100,10 C80,10 60,15 40,30" fill="none" stroke="#4f46e5" strokeWidth="1" />
                    <path d="M100,170 C120,175 140,180 160,195" fill="none" stroke="#4f46e5" strokeWidth="1" />
                    <path d="M100,170 C80,175 60,180 40,195" fill="none" stroke="#4f46e5" strokeWidth="1" />
                  </g>
                  <g className="opacity-60">
                    <circle cx="100" cy="50" r="10" fill="#4338ca" className="animate-pulse" />
                    <circle cx="75" cy="70" r="8" fill="#4338ca" className="animate-pulse" style={{ animationDelay: "0.2s" }} />
                    <circle cx="125" cy="70" r="8" fill="#4338ca" className="animate-pulse" style={{ animationDelay: "0.3s" }} />
                    <circle cx="100" cy="130" r="12" fill="#4338ca" className="animate-pulse" style={{ animationDelay: "0.4s" }} />
                    <circle cx="65" cy="110" r="9" fill="#4338ca" className="animate-pulse" style={{ animationDelay: "0.5s" }} />
                    <circle cx="135" cy="110" r="9" fill="#4338ca" className="animate-pulse" style={{ animationDelay: "0.6s" }} />
                  </g>
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="tech-card p-6 rounded-xl bg-slate-900/50 border border-slate-800"
          >
            <div className="mb-4 w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center">
              <Bot size={24} className="text-indigo-400" />
            </div>
            <h3 className="text-lg md:text-xl font-bold mb-2">Natural Language</h3>
            <p className="text-sm md:text-base text-slate-400">
              Communicate with navNote in everyday language. The AI understands context, slang, and even your personal shorthand.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="tech-card p-6 rounded-xl bg-slate-900/50 border border-slate-800"
          >
            <div className="mb-4 w-12 h-12 rounded-full bg-rose-500/20 flex items-center justify-center">
              <Globe size={24} className="text-rose-400" />
            </div>
            <h3 className="text-lg md:text-xl font-bold mb-2">Spatial Awareness</h3>
            <p className="text-sm md:text-base text-slate-400">
              Our algorithm understands physical spaces and geographic context, optimizing your tasks based on location efficiency.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true, margin: "-100px" }}
            className="tech-card p-6 rounded-xl bg-slate-900/50 border border-slate-800"
          >
            <div className="mb-4 w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <LineChart size={24} className="text-emerald-400" />
            </div>
            <h3 className="text-lg md:text-xl font-bold mb-2">Predictive Analytics</h3>
            <p className="text-sm md:text-base text-slate-400">
              The system learns from your behavior patterns to anticipate your needs and suggest optimal scheduling solutions.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Technology;