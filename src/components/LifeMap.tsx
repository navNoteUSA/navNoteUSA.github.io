import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Calendar, Clock, MapPin, Zap } from 'lucide-react';

// Sample task data for the Life Map visualization
const sampleTasks = [
  { id: 1, title: 'Team Meeting', type: 'calendar', priority: 'high', date: '10:00 AM' },
  { id: 2, title: 'Grocery Shopping', type: 'location', priority: 'medium', location: 'Supermarket' },
  { id: 3, title: 'Pick up Kids', type: 'location', priority: 'high', location: 'School' },
  { id: 4, title: 'Workout', type: 'calendar', priority: 'medium', date: '5:30 PM' },
  { id: 5, title: 'Call Mom', type: 'reminder', priority: 'low', date: 'Today' },
  { id: 6, title: 'Project Deadline', type: 'calendar', priority: 'high', date: 'Tomorrow' },
  { id: 7, title: 'Dentist Appointment', type: 'calendar', priority: 'high', date: 'Friday' },
  { id: 8, title: 'Coffee with Alex', type: 'location', priority: 'medium', location: 'Starbucks' },
];

// For the keyframe animation of hexagons
const keyframeAnimation = `
  @keyframes hexagon-hover {
    0% { transform: translateY(0px) translateX(0px) rotate(0deg); }
    25% { transform: translateY(-10px) translateX(5px) rotate(2deg); }
    50% { transform: translateY(0px) translateX(10px) rotate(0deg); }
    75% { transform: translateY(8px) translateX(3px) rotate(-2deg); }
    100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
  }
  
  @keyframes pulse-glow {
    0% { box-shadow: 0 0 8px 2px rgba(77, 157, 224, 0.3); }
    50% { box-shadow: 0 0 15px 5px rgba(77, 157, 224, 0.5); }
    100% { box-shadow: 0 0 8px 2px rgba(77, 157, 224, 0.3); }
  }
  
  @keyframes connection-pulse {
    0% { opacity: 0.1; }
    50% { opacity: 0.4; }
    100% { opacity: 0.1; }
  }
  
  @keyframes phone-float {
    0%, 100% { transform: translateY(0) rotateY(0deg); }
    25% { transform: translateY(-8px) rotateY(1deg); }
    75% { transform: translateY(8px) rotateY(-1deg); }
  }
`;

const LifeMap: React.FC = () => {
  const phoneRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Add our custom keyframes to the document
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = keyframeAnimation;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  // Phone floating animation
  useEffect(() => {
    if (phoneRef.current && !prefersReducedMotion) {
      const phone = phoneRef.current;
      
      // Only apply animations on non-mobile devices
      const isMobile = window.innerWidth < 768;
      if (!isMobile) {
        phone.style.animation = 'phone-float 6s ease-in-out infinite';
      }
    }
  }, [prefersReducedMotion]);

  return (
    <section id="lifemap" className="py-24 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-hex-pattern opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-dark to-primary"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="section-heading text-3xl md:text-5xl font-bold">Life Map Intelligence Platform</h2>
          <p className="section-subheading text-base md:text-xl max-w-2xl mx-auto">
            Experience the world's first spatiotemporal task ecosystem that adapts to your environment, schedule, and cognitive patterns in real-time.
          </p>
        </motion.div>
        
        <div className="flex flex-col items-center">
          {/* Mobile Phone Display - Now centered */}
          <motion.div 
            className="w-full max-w-md"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Phone container */}
            <div 
              ref={phoneRef} 
              className="perspective-800 will-change-transform mx-auto"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Phone frame */}
              <div className="w-[280px] sm:w-[320px] h-[560px] sm:h-[620px] rounded-[36px] bg-black p-3 shadow-2xl relative mx-auto">
                {/* Phone screen */}
                <div className="w-full h-full rounded-[32px] overflow-hidden bg-dark relative">
                  {/* Status bar */}
                  <div className="h-10 px-5 flex items-center justify-between bg-black/50">
                    <div className="text-xs font-medium">9:41</div>
                    <div className="flex items-center space-x-2">
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 10a6 6 0 0 0-12 0v8h12v-8z" />
                        <path d="M12 2v2" />
                      </svg>
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12.55a11 11 0 0 1 14.08 0" />
                        <circle cx="12" cy="20" r="1" />
                      </svg>
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M23 6v16h-7a2 2 0 0 1-2-2v-12a2 2 0 0 1 2-2h7z" />
                        <path d="M1 6v16h7a2 2 0 0 0 2-2v-12a2 2 0 0 0-2-2h-7z" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* App header */}
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-bold text-gradient">navNote</h3>
                      <div className="w-7 h-7 rounded-full bg-dark/50 flex items-center justify-center">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 8v8" />
                          <path d="M8 12h8" />
                        </svg>
                      </div>
                    </div>
                    
                    {/* Life Map mini view */}
                    <div className="rounded-xl bg-primary/20 p-3 mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-sm font-medium">Life Map</h4>
                        <span className="text-xs text-gray-400">Now</span>
                      </div>
                      
                      {/* Full-featured hexagon map */}
                      <div className="relative h-48 w-full rounded-lg overflow-hidden bg-primary/30 mb-2">
                        <div className="absolute inset-0">
                          {/* Center element */}
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-secondary/50 rounded-full flex items-center justify-center shadow-blue-glow z-10">
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                              <circle cx="12" cy="12" r="10"></circle>
                              <polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                          </div>
                          
                          {/* Surrounding hexagons with animations */}
                          {sampleTasks.map((task, idx) => {
                            // Calculate position in a spiral pattern
                            const angle = (idx * ((2 * Math.PI) / sampleTasks.length)) + (idx * 0.2);
                            const radius = 70 + (idx * 5); // Adjust based on the container size
                            const x = 50 + (radius * Math.cos(angle) / 2);
                            const y = 50 + (radius * Math.sin(angle) / 2);
                            
                            // Determine color based on priority
                            let bgColor = 'rgba(77, 157, 224, 0.4)';
                            if (task.priority === 'high') bgColor = 'rgba(239, 68, 68, 0.4)';
                            else if (task.priority === 'medium') bgColor = 'rgba(120, 192, 145, 0.4)';
                            
                            return (
                              <div 
                                key={task.id}
                                className="absolute w-9 h-9 hexagon flex items-center justify-center"
                                style={{ 
                                  top: `${y}%`, 
                                  left: `${x}%`, 
                                  backgroundColor: bgColor,
                                  transform: 'translate(-50%, -50%)',
                                  animation: `hexagon-hover ${3 + (idx % 4)}s ease-in-out infinite`,
                                  animationDelay: `${idx * 0.3}s`
                                }}
                              >
                                <div className="text-white text-[10px] truncate max-w-[30px] text-center">
                                  {task.title.substring(0, 8)}
                                </div>
                              </div>
                            );
                          })}
                          
                          {/* Connecting lines */}
                          <div className="absolute inset-0 bg-grid-lines opacity-20"></div>
                          
                          {/* Radial glow in the center */}
                          <div className="absolute inset-0 bg-gradient-radial from-secondary/30 via-transparent to-transparent pointer-events-none"></div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="text-xs font-medium">8 Active Tasks</div>
                        <button className="text-xs text-secondary">Expand</button>
                      </div>
                    </div>
                    
                    {/* Tasks list preview */}
                    <div className="space-y-3">
                      {sampleTasks.slice(0, 4).map((task) => (
                        <div key={task.id} className="flex items-center p-3 rounded-lg bg-dark/30 hover:bg-dark/50 transition-all">
                          <div className={`w-2 h-2 rounded-full mr-3 ${
                            task.priority === 'high' ? 'bg-red-500' : 
                            task.priority === 'medium' ? 'bg-green-500' : 'bg-blue-500'
                          }`}></div>
                          <div className="flex-1 truncate font-medium text-sm">{task.title}</div>
                          <div className="text-xs text-gray-400">
                            {task.type === 'calendar' ? task.date : task.type === 'location' ? task.location : ''}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Bottom tab bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-black/40 backdrop-blur-md flex items-center justify-around px-6">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-secondary/80 flex items-center justify-center mb-1">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                          <polyline points="9 22 9 12 15 12 15 22"></polyline>
                        </svg>
                      </div>
                      <span className="text-[10px]">Home</span>
                    </div>
                    <div className="flex flex-col items-center opacity-60">
                      <div className="w-8 h-8 rounded-full bg-dark flex items-center justify-center mb-1">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10"></circle>
                          <path d="M12 8v8"></path>
                          <path d="M8 12h8"></path>
                        </svg>
                      </div>
                      <span className="text-[10px]">Add</span>
                    </div>
                    <div className="flex flex-col items-center opacity-60">
                      <div className="w-8 h-8 rounded-full bg-dark flex items-center justify-center mb-1">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                      </div>
                      <span className="text-[10px]">Profile</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <p className="text-center text-lg mt-8 max-w-md mx-auto text-gray-300">
              Experience a revolutionary way to visualize your tasks and goals spatially on your phone
            </p>
          </motion.div>
        </div>
        
        {/* Features - Now below the visualization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mt-16 lg:mt-24"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <div className="feature-card">
              <div className="flex items-start">
                <div className="bg-secondary/20 p-3 rounded-lg mr-4 flex-shrink-0">
                  <Clock className="text-secondary w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold mb-2">Temporal Intelligence</h3>
                  <p className="text-sm md:text-base text-gray-300">
                    Quantum-inspired decision matrices reorganize your priorities with millisecond precision as contexts evolve.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="feature-card">
              <div className="flex items-start">
                <div className="bg-accent/20 p-3 rounded-lg mr-4 flex-shrink-0">
                  <MapPin className="text-accent w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold mb-2">Geospatial Framework</h3>
                  <p className="text-sm md:text-base text-gray-300">
                    Proprietary multi-layered proximity algorithms with adaptive geofencing technology for unparalleled location awareness.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="feature-card">
              <div className="flex items-start">
                <div className="bg-secondary/20 p-3 rounded-lg mr-4 flex-shrink-0">
                  <Zap className="text-secondary w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold mb-2">Neural Orchestration</h3>
                  <p className="text-sm md:text-base text-gray-300">
                    Advanced deep learning networks continuously analyze behavioral patterns to optimize task coordination and workflow efficiency.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="feature-card">
              <div className="flex items-start">
                <div className="bg-purple/20 p-3 rounded-lg mr-4 flex-shrink-0">
                  <Calendar className="text-purple w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold mb-2">Adaptive System Architecture</h3>
                  <p className="text-sm md:text-base text-gray-300">
                    Self-evolving microservices infrastructure with real-time priority adjustments based on your changing context and goals.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LifeMap; 