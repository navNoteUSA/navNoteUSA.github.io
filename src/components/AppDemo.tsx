import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const AppDemo: React.FC = () => {
  const phoneRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Add a subtle floating animation to the phone
    if (phoneRef.current) {
      const phone = phoneRef.current;
      
      const floatAnimation = () => {
        let startTime = Date.now();
        
        const animate = () => {
          const elapsed = Date.now() - startTime;
          const y = Math.sin(elapsed / 1000) * 10; // Subtle floating effect
          const rotate = Math.sin(elapsed / 2000) * 2; // Subtle rotation
          
          phone.style.transform = `translateY(${y}px) rotateY(${rotate}deg)`;
          requestAnimationFrame(animate);
        };
        
        animate();
      };
      
      floatAnimation();
    }
  }, []);
  
  return (
    <section id="demo" className="py-24 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-hex-pattern opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-primary to-dark"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="section-heading">Experience navNote</h2>
          <p className="section-subheading">
            See how our AI-powered platform transforms your task management experience
          </p>
        </motion.div>
        
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* iPhone mockup */}
          <div className="lg:w-1/2 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              className="perspective-800"
            >
              <div 
                ref={phoneRef} 
                className="relative transition-transform duration-300"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* iPhone frame */}
                <div className="w-[280px] h-[580px] rounded-[40px] bg-black p-3 shadow-2xl relative z-10">
                  {/* Screen */}
                  <div className="w-full h-full rounded-[32px] bg-primary overflow-hidden relative">
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[120px] h-[30px] bg-black rounded-b-[14px] flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-gray-700 mx-2"></div>
                    </div>
                    
                    {/* App demo content - animated interface */}
                    <div className="pt-8 px-4 h-full">
                      {/* Navigation bar */}
                      <div className="flex justify-between items-center mb-4">
                        <div className="text-white text-lg font-bold">navNote</div>
                        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                            <path d="M12 5v14M5 12h14" />
                          </svg>
                        </div>
                      </div>
                      
                      {/* Life Map visualization (simplified) */}
                      <div className="bg-primary/50 rounded-xl h-[220px] mb-4 flex items-center justify-center relative overflow-hidden">
                        {/* Center hexagon */}
                        <div className="w-16 h-16 relative">
                          <div className="absolute inset-0" style={{
                            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                            background: 'rgba(77, 157, 224, 0.6)',
                            animation: 'pulse 2s infinite'
                          }}></div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-white text-sm">Now</span>
                          </div>
                        </div>
                        
                        {/* Surrounding hexagons with tasks */}
                        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                          <div key={i} className="absolute" style={{
                            left: `calc(50% + ${Math.cos(angle * Math.PI / 180) * 80}px)`,
                            top: `calc(50% + ${Math.sin(angle * Math.PI / 180) * 80}px)`,
                            transform: 'translate(-50%, -50%)',
                            animation: `float ${3 + i % 2}s ease-in-out infinite`,
                            animationDelay: `${i * 0.2}s`,
                          }}>
                            <div className="w-12 h-12 relative">
                              <div className="absolute inset-0" style={{
                                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                                background: i % 3 === 0 ? 'rgba(77, 157, 224, 0.5)' : 
                                           i % 3 === 1 ? 'rgba(120, 192, 145, 0.5)' : 
                                           'rgba(255, 255, 255, 0.3)',
                              }}></div>
                            </div>
                          </div>
                        ))}
                        
                        {/* Connecting lines */}
                        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                          <div key={`line-${i}`} className="absolute left-1/2 top-1/2 w-[80px] h-[1px]" style={{
                            background: 'rgba(255, 255, 255, 0.2)',
                            transformOrigin: '0 0',
                            transform: `rotate(${angle}deg)`,
                          }}></div>
                        ))}
                      </div>
                      
                      {/* Task list */}
                      <div className="space-y-3">
                        {['Team Meeting', 'Grocery Shopping', 'Project Deadline'].map((task, i) => (
                          <div key={i} className="bg-white/5 rounded-lg p-3 flex items-center justify-between border border-white/10">
                            <div>
                              <div className="text-white text-sm">{task}</div>
                              <div className="text-white/50 text-xs">{i === 0 ? 'Today, 10:00 AM' : i === 1 ? 'Supermarket' : 'Tomorrow'}</div>
                            </div>
                            <div className="w-6 h-6 rounded-full" style={{
                              background: i === 0 ? 'rgba(77, 157, 224, 0.5)' : 
                                         i === 1 ? 'rgba(120, 192, 145, 0.5)' : 
                                         'rgba(239, 68, 68, 0.5)',
                            }}></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-radial from-secondary/30 via-transparent to-transparent rounded-[40px] blur-xl -z-10"></div>
              </div>
            </motion.div>
          </div>
          
          {/* Features */}
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h3 className="text-3xl font-bold mb-6">Revolutionize Your Productivity</h3>
              <p className="text-xl text-gray-300 mb-8">
                navNote makes task management intuitive and contextual, helping you focus on what matters most.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-secondary/20 p-3 rounded-full mr-4 flex-shrink-0">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-secondary">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-medium mb-1">Time-Aware Organization</h4>
                    <p className="text-gray-300">Tasks dynamically reorganize based on time, priority, and relevance.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-accent/20 p-3 rounded-full mr-4 flex-shrink-0">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-medium mb-1">Location Intelligence</h4>
                    <p className="text-gray-300">Smart suggestions based on your location and previous behavior patterns.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-secondary/20 p-3 rounded-full mr-4 flex-shrink-0">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-secondary">
                      <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
                      <line x1="16" y1="8" x2="2" y2="22"></line>
                      <line x1="17.5" y1="15" x2="9" y2="15"></line>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-medium mb-1">Personalized Experience</h4>
                    <p className="text-gray-300">The more you use navNote, the better it understands your preferences.</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <a 
                  href="#contact" 
                  className="btn-primary group"
                >
                  Request Demo Access
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppDemo; 