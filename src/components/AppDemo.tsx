import React, { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const AppDemo: React.FC = () => {
  const phoneRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  
  useEffect(() => {
    // Add a subtle floating animation to the phone, but skip for reduced motion preference
    if (phoneRef.current && !prefersReducedMotion) {
      const phone = phoneRef.current;
      
      let animationFrame: number;
      const floatAnimation = () => {
        let startTime = Date.now();
        
        const animate = () => {
          const elapsed = Date.now() - startTime;
          const y = Math.sin(elapsed / 1000) * 10; // Subtle floating effect
          const rotate = Math.sin(elapsed / 2000) * 2; // Subtle rotation
          
          phone.style.transform = `translateY(${y}px) rotateY(${rotate}deg)`;
          animationFrame = requestAnimationFrame(animate);
        };
        
        animate();
      };
      
      // Only apply animations on non-mobile devices
      const isMobile = window.innerWidth < 768;
      if (!isMobile) {
        floatAnimation();
      }
      
      // Cleanup animation frame on unmount
      return () => {
        cancelAnimationFrame(animationFrame);
      };
    }
  }, [prefersReducedMotion]);
  
  return (
    <section id="demo" className="py-16 md:py-24 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-lines opacity-10"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-heading text-3xl md:text-5xl mb-4">Experience navNote</h2>
          <p className="section-subheading text-base md:text-lg max-w-2xl mx-auto">
            See how navNote transforms the way you organize your tasks, goals, and digital life.
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* iPhone mockup - centered on mobile */}
          <div className="w-full lg:w-1/2 flex justify-center mb-10 lg:mb-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.2,
                ease: [0.25, 0.1, 0.25, 1.0] // Improved bezier curve for smoother motion
              }}
              viewport={{ once: true, margin: "-100px" }}
              className="perspective-800"
            >
              <div 
                ref={phoneRef} 
                className="relative transition-transform duration-300"
                style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
              >
                {/* iPhone frame - smaller on mobile */}
                <div className="w-[240px] sm:w-[280px] h-[500px] sm:h-[580px] rounded-[40px] bg-black p-3 shadow-2xl relative z-10">
                  {/* Screen */}
                  <div className="w-full h-full rounded-[36px] overflow-hidden bg-primary relative">
                    {/* App UI */}
                    <div className="relative h-full w-full">
                      {/* Status bar */}
                      <div className="h-12 px-6 flex items-center justify-between bg-dark">
                        <div className="text-xs font-medium">9:41</div>
                        <div className="flex items-center space-x-2">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 10a6 6 0 0 0-12 0v8h12v-8z" />
                            <path d="M12 2v2" />
                            <path d="M4.93 5.93l1.41 1.41" />
                            <path d="M2 12h2" />
                            <path d="M19.07 5.93l-1.41 1.41" />
                            <path d="M22 12h-2" />
                          </svg>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12.55a11 11 0 0 1 14.08 0" />
                            <path d="M1.42 9a16 16 0 0 1 21.16 0" />
                            <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
                            <circle cx="12" cy="20" r="1" />
                          </svg>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M23 6v16h-7a2 2 0 0 1-2-2v-12a2 2 0 0 1 2-2h7z" />
                            <path d="M1 6v16h7a2 2 0 0 0 2-2v-12a2 2 0 0 0-2-2h-7z" />
                          </svg>
                        </div>
                      </div>
                      
                      {/* App header */}
                      <div className="p-6">
                        <div className="flex justify-between items-center mb-6">
                          <h1 className="text-xl font-bold text-gradient">navNote</h1>
                          <div className="w-8 h-8 rounded-full bg-dark/50 flex items-center justify-center">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <circle cx="12" cy="12" r="10" />
                              <path d="M12 8v8" />
                              <path d="M8 12h8" />
                            </svg>
                          </div>
                        </div>
                        
                        {/* Search */}
                        <div className="relative mb-8">
                          <input type="text" className="w-full bg-dark/50 rounded-full py-3 px-5 pl-10 text-sm" placeholder="Search tasks..." disabled />
                          <svg className="absolute left-3 top-3" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.3-4.3" />
                          </svg>
                        </div>
                      </div>
                      
                      {/* Life map visualization */}
                      <div className="px-6 pb-6">
                        <div className="rounded-2xl p-4 bg-dark/30 mb-5">
                          <h2 className="text-sm font-medium mb-3">Life Map</h2>
                          <div className="relative h-40 w-full rounded-lg overflow-hidden bg-black/30">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="relative w-32 h-32">
                                {/* Center hexagon */}
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-secondary/30 rounded-lg"></div>
                                
                                {/* Surrounding hexagons */}
                                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-accent/20 rounded-lg"></div>
                                <div className="absolute top-1/4 right-0 w-8 h-8 bg-purple/20 rounded-lg"></div>
                                <div className="absolute bottom-1/4 right-0 w-8 h-8 bg-secondary/20 rounded-lg"></div>
                                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-accent/20 rounded-lg"></div>
                                <div className="absolute bottom-1/4 left-0 w-8 h-8 bg-purple/20 rounded-lg"></div>
                                <div className="absolute top-1/4 left-0 w-8 h-8 bg-secondary/20 rounded-lg"></div>
                                
                                {/* Connecting lines */}
                                <div className="absolute inset-0 connectivity-dots"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Task list */}
                      <div className="px-6 pb-6">
                        <h2 className="text-sm font-medium mb-3">Today's Tasks</h2>
                        <div className="space-y-3">
                          <div className="p-4 rounded-xl bg-secondary/10 border border-secondary/20">
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium">Team Meeting</span>
                              <span className="text-xs">10:30 AM</span>
                            </div>
                            <div className="text-xs text-gray-400">Zoom - Product Planning</div>
                          </div>
                          <div className="p-4 rounded-xl bg-dark/30 border border-white/5">
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium">Grocery Shopping</span>
                              <span className="text-xs">4:00 PM</span>
                            </div>
                            <div className="text-xs text-gray-400">Whole Foods Market</div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Navigation bar */}
                      <div className="absolute bottom-0 left-0 right-0 h-16 bg-dark/80 backdrop-blur-md border-t border-white/5 px-6 flex items-center justify-around">
                        <div className="flex flex-col items-center">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-secondary">
                            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                            <polyline points="9 22 9 12 15 12 15 22" />
                          </svg>
                          <span className="text-[10px] mt-1">Home</span>
                        </div>
                        <div className="flex flex-col items-center text-gray-500">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                          </svg>
                          <span className="text-[10px] mt-1">Tasks</span>
                        </div>
                        <div className="flex flex-col items-center text-gray-500">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                            <circle cx="12" cy="10" r="3" />
                          </svg>
                          <span className="text-[10px] mt-1">Map</span>
                        </div>
                        <div className="flex flex-col items-center text-gray-500">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 16v-4" />
                            <path d="M12 8h.01" />
                          </svg>
                          <span className="text-[10px] mt-1">Info</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Highlights/reflections */}
                <div className="absolute inset-0 rounded-[40px] pointer-events-none">
                  <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white/10 to-transparent rounded-t-[40px]"></div>
                  <div className="absolute bottom-0 left-[10%] right-[10%] h-3/4 bg-gradient-to-t from-blue-900/10 to-transparent blur-xl rounded-b-[40px]"></div>
                </div>
              </div>
            </motion.div>
          </div>
          
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.4,
                ease: [0.25, 0.1, 0.25, 1.0]
              }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h3 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Revolutionize Your Productivity</h3>
              <p className="text-base md:text-xl text-gray-300 mb-6 md:mb-8">
                navNote makes task management intuitive and contextual, helping you focus on what matters most.
              </p>
              
              <div className="space-y-4 md:space-y-6">
                <div className="flex items-start">
                  <div className="bg-secondary/20 p-2 md:p-3 rounded-lg mr-3 md:mr-4 flex-shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-secondary">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg md:text-xl font-medium mb-1">Time-Aware Organization</h4>
                    <p className="text-sm md:text-base text-gray-300">Tasks dynamically reorganize based on time, priority, and relevance.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-accent/20 p-2 md:p-3 rounded-lg mr-3 md:mr-4 flex-shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg md:text-xl font-medium mb-1">Location Context</h4>
                    <p className="text-sm md:text-base text-gray-300">See and manage tasks based on their real-world location.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-purple/20 p-2 md:p-3 rounded-lg mr-3 md:mr-4 flex-shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-purple">
                      <path d="M12 2a10 10 0 1 0 10 10 4 4 0 1 1-8 0 2 2 0 1 0 4 0 6 6 0 1 0-6 6c.5 0 .9 0 1.4-.1"></path>
                      <circle cx="12" cy="12" r="4"></circle>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg md:text-xl font-medium mb-1">AI-Powered Recommendations</h4>
                    <p className="text-sm md:text-base text-gray-300">Get smart suggestions based on your habits and preferences.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppDemo; 