import React, { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Clock, MapPin, Zap, Calendar } from 'lucide-react';

const AppDemo: React.FC = () => {
  const lifeMapRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  
  useEffect(() => {
    // Create the Life Map visualization instead of phone animation
    if (lifeMapRef.current && !prefersReducedMotion) {
      const lifeMap = lifeMapRef.current;
      const width = lifeMap.clientWidth;
      const height = lifeMap.clientHeight;
      
      // Center coordinates
      const centerX = width / 2;
      const centerY = height / 2;
      
      // Create center hexagon (represents current time/location)
      const centerHex = document.createElement('div');
      centerHex.className = 'hexagon hexagon-center absolute transition-all duration-500';
      centerHex.style.setProperty('--hexagon-size', '80px');
      centerHex.style.top = `${centerY - 40}px`;
      centerHex.style.left = `${centerX - 40}px`;
      
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
      lifeMap.appendChild(centerHex);
      
      // Sample task data for the Life Map visualization
      const sampleTasks = [
        { id: 1, title: 'Team Meeting', type: 'calendar', priority: 'high', date: '10:00 AM' },
        { id: 2, title: 'Grocery Shopping', type: 'location', priority: 'medium', location: 'Supermarket' },
        { id: 3, title: 'Pick up Kids', type: 'location', priority: 'high', location: 'School' },
        { id: 4, title: 'Workout', type: 'calendar', priority: 'medium', date: '5:30 PM' },
        { id: 5, title: 'Call Mom', type: 'reminder', priority: 'low', date: 'Today' },
        { id: 6, title: 'Project Deadline', type: 'calendar', priority: 'high', date: 'Tomorrow' },
      ];
      
      // Create task hexagons around the center
      const radius = Math.min(width, height) * 0.35;
      
      sampleTasks.forEach((task, index) => {
        // Calculate position in a circle around center
        const angle = (index * (2 * Math.PI / sampleTasks.length));
        const x = centerX + radius * Math.cos(angle) - 30;
        const y = centerY + radius * Math.sin(angle) - 30;
        
        // Create task hexagon
        const taskHex = document.createElement('div');
        taskHex.className = 'hexagon absolute transition-all duration-500';
        taskHex.style.setProperty('--hexagon-size', '60px');
        taskHex.style.top = `${y}px`;
        taskHex.style.left = `${x}px`;
        
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
        lifeMap.appendChild(taskHex);
        
        // Add connecting line
        const line = document.createElement('div');
        line.className = 'absolute bg-white/10 rounded-full';
        
        // Calculate angle for rotation
        const lineAngle = angle * (180 / Math.PI);
        const lineLength = radius;
        
        line.style.width = `${lineLength}px`;
        line.style.height = '1px';
        line.style.top = `${centerY}px`;
        line.style.left = `${centerX}px`;
        line.style.transformOrigin = '0 0';
        line.style.transform = `rotate(${lineAngle}deg)`;
        
        lifeMap.appendChild(line);
      });
      
      // Add animations
      const hexagons = lifeMap.querySelectorAll('.hexagon');
      let animationFrames: number[] = [];
      
      hexagons.forEach((hex, index) => {
        if (index === 0) return; // Skip center
        
        // Random floating animation
        const element = hex as HTMLElement;
        let startTime = Date.now();
        
        const animate = () => {
          const elapsed = Date.now() - startTime;
          const y = Math.sin(elapsed / (1000 + index * 200)) * 10;
          const rotate = Math.sin(elapsed / (2000 + index * 100)) * 2;
          
          element.style.transform = `translateY(${y}px) rotate(${rotate}deg)`;
          animationFrames[index] = requestAnimationFrame(animate);
        };
        
        animate();
      });
      
      // Cleanup animation frames on unmount
      return () => {
        animationFrames.forEach(frame => cancelAnimationFrame(frame));
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
          {/* Life Map Visualization - replaces iPhone mockup */}
          <div className="w-full lg:w-1/2 flex justify-center mb-10 lg:mb-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.2,
                ease: [0.25, 0.1, 0.25, 1.0]
              }}
              viewport={{ once: true, margin: "-100px" }}
              className="perspective-800"
            >
              <div className="relative bg-primary/50 border border-white/10 rounded-2xl p-6 md:p-8 shadow-blue-glow overflow-hidden h-[350px] md:h-[450px] w-full md:w-[400px]">
                {/* The hexagon map */}
                <div ref={lifeMapRef} className="w-full h-full relative">
                  {/* Hexagons will be created dynamically */}
                </div>
                
                {/* Radial glow in the center */}
                <div className="absolute inset-0 bg-gradient-radial from-secondary/10 via-transparent to-transparent pointer-events-none"></div>
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