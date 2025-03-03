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
  const hexMapRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [hoveredTaskId, setHoveredTaskId] = useState<number | null>(null);

  // Add our custom keyframes to the document
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = keyframeAnimation;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  useEffect(() => {
    // Create the hexagon map animation
    if (hexMapRef.current) {
      const hexMap = hexMapRef.current;
      
      // Clear existing content first (for re-renders)
      hexMap.innerHTML = '';
      
      const width = hexMap.clientWidth;
      const height = hexMap.clientHeight;
      
      // Center coordinates
      const centerX = width / 2;
      const centerY = height / 2;
      
      // Create center hexagon (represents current time/location)
      const centerHex = document.createElement('div');
      centerHex.className = 'hexagon hexagon-center absolute transition-all duration-500';
      centerHex.style.setProperty('--hexagon-size', '80px');
      centerHex.style.top = `${centerY - 40}px`;
      centerHex.style.left = `${centerX - 40}px`;
      centerHex.style.animation = 'pulse-glow 3s ease-in-out infinite';
      centerHex.style.zIndex = '10';
      
      // Add center content
      const centerContent = document.createElement('div');
      centerContent.className = 'hexagon-content z-10 flex items-center justify-center';
      centerContent.innerHTML = `
        <div class="bg-secondary text-white w-12 h-12 rounded-full flex items-center justify-center shadow-blue-glow">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
        </div>
      `;
      centerHex.appendChild(centerContent);
      hexMap.appendChild(centerHex);
      
      // Create task hexagons around the center in a spiral pattern
      const taskHexagons: HTMLElement[] = [];
      
      sampleTasks.forEach((task, index) => {
        // Calculate position in a spiral pattern
        const angle = (index * ((2 * Math.PI) / sampleTasks.length)) + (index * 0.2);
        const radiusMultiplier = 1 + (index * 0.08); // Increase radius for spiral effect
        const radius = Math.min(width, height) * 0.28 * radiusMultiplier;
        const x = centerX + radius * Math.cos(angle) - 30;
        const y = centerY + radius * Math.sin(angle) - 30;
        
        // Create task hexagon
        const taskHex = document.createElement('div');
        taskHex.className = 'hexagon absolute transition-all duration-500';
        taskHex.style.setProperty('--hexagon-size', '60px');
        taskHex.style.top = `${y}px`;
        taskHex.style.left = `${x}px`;
        taskHex.dataset.taskId = String(task.id);
        
        // Color based on priority
        let bgColor = 'rgba(77, 157, 224, 0.2)';
        let iconColor = '#4D9DE0';
        
        if (task.priority === 'high') {
          bgColor = 'rgba(239, 68, 68, 0.2)';
          iconColor = '#EF4444';
        } else if (task.priority === 'medium') {
          bgColor = 'rgba(120, 192, 145, 0.2)';
          iconColor = '#78C091';
        }
        
        taskHex.style.backgroundColor = bgColor;
        
        // Add task content
        const taskContent = document.createElement('div');
        taskContent.className = 'hexagon-content z-10 flex items-center justify-center flex-col';
        
        // Icon based on type
        let icon = '';
        if (task.type === 'calendar') {
          icon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${iconColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>`;
        } else if (task.type === 'location') {
          icon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${iconColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`;
        } else {
          icon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${iconColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>`;
        }
        
        taskContent.innerHTML = `
          <div class="mb-1">${icon}</div>
          <div class="text-xs text-white font-medium max-w-[50px] truncate text-center">${task.title}</div>
        `;
        
        taskHex.appendChild(taskContent);
        hexMap.appendChild(taskHex);
        taskHexagons.push(taskHex);
        
        // Add connecting line with animated gradient
        const line = document.createElement('div');
        line.className = 'absolute bg-white/10 rounded-full';
        
        // Calculate angle for rotation
        const lineAngle = angle * (180 / Math.PI);
        const lineLength = radius;
        
        line.style.width = `${lineLength}px`;
        line.style.height = '2px';
        line.style.top = `${centerY}px`;
        line.style.left = `${centerX}px`;
        line.style.transformOrigin = '0 0';
        line.style.transform = `rotate(${lineAngle}deg)`;
        line.style.animation = 'connection-pulse 3s ease-in-out infinite';
        line.style.animationDelay = `${index * 0.3}s`;
        
        hexMap.appendChild(line);
        
        // Add event listeners for hover effect
        taskHex.addEventListener('mouseenter', () => {
          setHoveredTaskId(task.id);
        });
        
        taskHex.addEventListener('mouseleave', () => {
          setHoveredTaskId(null);
        });
      });
      
      // Add dynamic animations
      taskHexagons.forEach((hex, index) => {
        // Random floating animation with more dynamic movement
        hex.style.animation = `hexagon-hover ${3 + (index % 4)}s ease-in-out infinite`;
        hex.style.animationDelay = `${index * 0.3}s`;
      });
      
      // Add click interactions for more dynamism
      hexMap.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        const taskHex = target.closest('.hexagon:not(.hexagon-center)') as HTMLElement;
        
        if (taskHex) {
          // Create a ripple effect on click
          const ripple = document.createElement('div');
          ripple.className = 'absolute w-full h-full bg-white/20 rounded-full scale-0 z-0';
          ripple.style.top = '0';
          ripple.style.left = '0';
          ripple.style.transformOrigin = 'center';
          ripple.style.animation = 'ripple 1s ease-out forwards';
          taskHex.appendChild(ripple);
          
          // Remove after animation completes
          setTimeout(() => {
            ripple.remove();
          }, 1000);
          
          // Also make the hexagon "jump" slightly
          taskHex.style.transform = 'scale(1.2) translateY(-5px)';
          setTimeout(() => {
            taskHex.style.transform = '';
          }, 300);
        }
      });
    }
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
          <h2 className="section-heading text-3xl md:text-5xl font-bold">Life Map Visualization</h2>
          <p className="section-subheading text-base md:text-xl max-w-2xl mx-auto">
            A dynamic, spatial view of your tasks and reminders that intelligently adapts to your life.
          </p>
        </motion.div>
        
        <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12">
          {/* Life Map Visualization - Shown vertically stacked on mobile */}
          <motion.div 
            className="w-full lg:w-3/5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="relative bg-primary/50 border border-white/10 rounded-2xl p-6 md:p-8 shadow-blue-glow overflow-hidden h-[350px] md:h-[500px]">
              {/* The hexagon map */}
              <div ref={hexMapRef} className="w-full h-full relative">
                {/* Hexagons will be created dynamically */}
              </div>
              
              {/* Radial glow in the center */}
              <div className="absolute inset-0 bg-gradient-radial from-secondary/30 via-transparent to-transparent pointer-events-none"></div>
              
              {/* Task detail panel that appears when hovering over a task */}
              {hoveredTaskId && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-4 right-4 bg-dark/80 backdrop-blur-md p-4 rounded-xl border border-white/10 max-w-[250px] shadow-blue-glow"
                >
                  {(() => {
                    const task = sampleTasks.find(t => t.id === hoveredTaskId);
                    if (!task) return null;
                    
                    return (
                      <div>
                        <h3 className="font-bold text-lg mb-2">{task.title}</h3>
                        <div className="flex items-center text-sm mb-1">
                          {task.type === 'calendar' && (
                            <>
                              <Clock className="w-4 h-4 mr-2 text-secondary" />
                              <span>{task.date}</span>
                            </>
                          )}
                          {task.type === 'location' && (
                            <>
                              <MapPin className="w-4 h-4 mr-2 text-accent" />
                              <span>{task.location}</span>
                            </>
                          )}
                        </div>
                        <div className="mt-3 text-xs text-gray-300">
                          Tap to view details and actions
                        </div>
                      </div>
                    );
                  })()}
                </motion.div>
              )}
            </div>
          </motion.div>
          
          {/* Mobile Phone Display - New Addition */}
          <motion.div 
            className="w-full lg:w-2/5 mt-10 lg:mt-0 flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Phone container */}
            <div 
              ref={phoneRef} 
              className="perspective-800 will-change-transform"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Phone frame */}
              <div className="w-[220px] sm:w-[260px] h-[460px] sm:h-[520px] rounded-[36px] bg-black p-3 shadow-2xl relative">
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
                      
                      {/* Mini hexagon map */}
                      <div className="relative h-32 w-full rounded-lg overflow-hidden bg-primary/30 mb-2">
                        <div className="absolute inset-0">
                          {/* Dynamically created mini-version of the hexagon map */}
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-secondary/50 rounded-lg animate-pulse"></div>
                          
                          {/* Surrounding hexagons with animations */}
                          <div className="absolute top-[30%] left-[35%] w-6 h-6 bg-accent/30 rounded-lg animate-[float_4s_ease-in-out_infinite]" style={{ animationDelay: '0.1s' }}></div>
                          <div className="absolute top-[30%] right-[35%] w-6 h-6 bg-purple/30 rounded-lg animate-[float_5s_ease-in-out_infinite]" style={{ animationDelay: '0.3s' }}></div>
                          <div className="absolute bottom-[30%] left-[35%] w-6 h-6 bg-secondary/30 rounded-lg animate-[float_3s_ease-in-out_infinite]" style={{ animationDelay: '0.5s' }}></div>
                          <div className="absolute bottom-[30%] right-[35%] w-6 h-6 bg-accent/30 rounded-lg animate-[float_4.5s_ease-in-out_infinite]" style={{ animationDelay: '0.7s' }}></div>
                          
                          {/* Connecting lines */}
                          <div className="absolute inset-0 bg-grid-lines opacity-20"></div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="text-xs font-medium">8 Active Tasks</div>
                        <button className="text-xs text-secondary">Expand</button>
                      </div>
                    </div>
                    
                    {/* Tasks list preview */}
                    <div className="space-y-3">
                      {sampleTasks.slice(0, 3).map((task) => (
                        <div key={task.id} className="flex items-center p-2 rounded-lg bg-dark/30 hover:bg-dark/50 transition-all">
                          <div className={`w-2 h-2 rounded-full mr-2 ${
                            task.priority === 'high' ? 'bg-red-500' : 
                            task.priority === 'medium' ? 'bg-green-500' : 'bg-blue-500'
                          }`}></div>
                          <div className="flex-1 truncate">{task.title}</div>
                          <div className="text-xs text-gray-400">
                            {task.type === 'calendar' ? task.date : task.type === 'location' ? task.location : ''}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Bottom tab bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-14 bg-black/40 backdrop-blur-md flex items-center justify-around px-6">
                    <div className="flex flex-col items-center">
                      <div className="w-6 h-6 rounded-full bg-secondary/80 flex items-center justify-center mb-1">
                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                          <polyline points="9 22 9 12 15 12 15 22"></polyline>
                        </svg>
                      </div>
                      <span className="text-[10px]">Home</span>
                    </div>
                    <div className="flex flex-col items-center opacity-60">
                      <div className="w-6 h-6 rounded-full bg-dark flex items-center justify-center mb-1">
                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                      </div>
                      <span className="text-[10px]">Profile</span>
                    </div>
                    <div className="flex flex-col items-center opacity-60">
                      <div className="w-6 h-6 rounded-full bg-dark flex items-center justify-center mb-1">
                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="1"></circle>
                          <circle cx="12" cy="5" r="1"></circle>
                          <circle cx="12" cy="19" r="1"></circle>
                        </svg>
                      </div>
                      <span className="text-[10px]">More</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <p className="text-center text-sm mt-6 max-w-sm text-gray-300">
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
                  <h3 className="text-lg md:text-xl font-bold mb-2">Time-Based Dynamics</h3>
                  <p className="text-sm md:text-base text-gray-300">
                    Events reorganize in real-time as deadlines approach, visually representing their importance.
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
                  <h3 className="text-lg md:text-xl font-bold mb-2">Spatial Context</h3>
                  <p className="text-sm md:text-base text-gray-300">
                    Tasks tied to locations move dynamically as you navigate, showing proximity and relevance.
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
                  <h3 className="text-lg md:text-xl font-bold mb-2">Intelligent Movement</h3>
                  <p className="text-sm md:text-base text-gray-300">
                    Watch as AI-powered algorithms find relationships between tasks and animate them meaningfully.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="feature-card">
              <div className="flex items-start">
                <div className="bg-accent/20 p-3 rounded-lg mr-4 flex-shrink-0">
                  <Calendar className="text-accent w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold mb-2">Living Calendar</h3>
                  <p className="text-sm md:text-base text-gray-300">
                    Your calendar isn't static anymore—watch events flow and adjust based on your changing schedule.
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