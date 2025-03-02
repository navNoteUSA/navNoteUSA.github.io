import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Zap } from 'lucide-react';

// Sample task data for the Life Map visualization
const sampleTasks = [
  { id: 1, title: 'Team Meeting', type: 'calendar', priority: 'high', date: '10:00 AM' },
  { id: 2, title: 'Grocery Shopping', type: 'location', priority: 'medium', location: 'Supermarket' },
  { id: 3, title: 'Pick up Kids', type: 'location', priority: 'high', location: 'School' },
  { id: 4, title: 'Workout', type: 'calendar', priority: 'medium', date: '5:30 PM' },
  { id: 5, title: 'Call Mom', type: 'reminder', priority: 'low', date: 'Today' },
  { id: 6, title: 'Project Deadline', type: 'calendar', priority: 'high', date: 'Tomorrow' },
];

const LifeMap: React.FC = () => {
  const hexMapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create the hexagon map animation
    if (hexMapRef.current) {
      const hexMap = hexMapRef.current;
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
        hexMap.appendChild(taskHex);
        
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
        
        hexMap.appendChild(line);
      });
      
      // Add animations
      const hexagons = hexMap.querySelectorAll('.hexagon');
      hexagons.forEach((hex, index) => {
        if (index === 0) return; // Skip center
        
        // Random floating animation
        (hex as HTMLElement).style.animation = `hexagon-hover ${3 + index % 3}s ease-in-out infinite`;
        (hex as HTMLElement).style.animationDelay = `${index * 0.5}s`;
      });
    }
  }, []);

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
          className="text-center mb-16"
        >
          <h2 className="section-heading">Life Map Visualization</h2>
          <p className="section-subheading">
            A dynamic, spatial view of your tasks and reminders that intelligently adapts to your life.
          </p>
        </motion.div>
        
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left side: Visualization */}
          <motion.div 
            className="lg:w-3/5"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="relative bg-primary/50 border border-white/10 rounded-2xl p-8 shadow-blue-glow overflow-hidden h-[500px]">
              {/* The hexagon map */}
              <div ref={hexMapRef} className="w-full h-full relative">
                {/* Hexagons will be created dynamically */}
              </div>
              
              {/* Radial glow in the center */}
              <div className="absolute inset-0 bg-gradient-radial from-secondary/10 via-transparent to-transparent pointer-events-none"></div>
            </div>
          </motion.div>
          
          {/* Right side: Features */}
          <motion.div 
            className="lg:w-2/5"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="space-y-8">
              <div className="feature-card">
                <div className="flex items-start">
                  <div className="bg-secondary/20 p-3 rounded-lg mr-4">
                    <Clock className="text-secondary w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Time-Based Relationships</h3>
                    <p className="text-gray-300">
                      Events reorganize based on time proximity, bringing upcoming tasks closer to center as they approach.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="feature-card">
                <div className="flex items-start">
                  <div className="bg-accent/20 p-3 rounded-lg mr-4">
                    <MapPin className="text-accent w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Location Awareness</h3>
                    <p className="text-gray-300">
                      Tasks tied to specific locations move dynamically as you navigate through your day.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="feature-card">
                <div className="flex items-start">
                  <div className="bg-secondary/20 p-3 rounded-lg mr-4">
                    <Zap className="text-secondary w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">AI-Powered Connections</h3>
                    <p className="text-gray-300">
                      Intelligent algorithms discover relationships between tasks and visually connect related items.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="feature-card">
                <div className="flex items-start">
                  <div className="bg-accent/20 p-3 rounded-lg mr-4">
                    <Calendar className="text-accent w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Calendar Integration</h3>
                    <p className="text-gray-300">
                      Seamlessly syncs with your calendar events and gives them spatial context in your Life Map.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LifeMap; 