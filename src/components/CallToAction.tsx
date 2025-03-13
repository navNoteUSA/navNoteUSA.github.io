import React from 'react';
import { motion } from 'framer-motion';

interface CallToActionProps {
  onOpenDemo: () => void;
  onOpenAuth: (mode: string) => void;
}

const CallToAction: React.FC<CallToActionProps> = ({ onOpenDemo, onOpenAuth }) => {
  return (
    <section id="cta" className="py-12 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-black z-0"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full filter blur-3xl"></div>
        
        {/* Floating circles */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div 
            key={i} 
            className="absolute bg-white/5 rounded-full animate-float-slow"
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 10 + 15}s`,
              animationDelay: `${Math.random() * 5}s`
            }}
          ></div>
        ))}
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="bg-gradient-to-r from-slate-900/80 to-slate-800/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-slate-700/50 shadow-glow-lg text-center"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Ready to See navNote in Action?
            </h2>
            
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Experience the future of task management with our interactive demo. See how navNote can transform your productivity.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
              <motion.button
                onClick={onOpenDemo}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-gradient btn-large"
              >
                Get a Demo
              </motion.button>
              
              <motion.button
                onClick={() => onOpenAuth('signup')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-glass btn-large"
              >
                Sign In / Sign Up
              </motion.button>
            </div>
            
            <div className="flex items-center justify-center">
              <div className="flex -space-x-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div 
                    key={i} 
                    className="w-10 h-10 rounded-full border-2 border-slate-800 overflow-hidden"
                    style={{ 
                      backgroundColor: `hsl(${210 + i * 15}, 70%, 60%)`,
                      zIndex: 5 - i 
                    }}
                  ></div>
                ))}
              </div>
              <p className="ml-4 text-gray-300 text-sm">
                <span className="text-white font-bold">2500+</span> users already on board
              </p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 text-center"
          >
            {/* Removed "Trusted by Organizations Worldwide" section */}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction; 