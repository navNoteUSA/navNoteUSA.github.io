import React from 'react';
import { motion, useInView } from 'framer-motion';
import { Check, MapPin, Clock, Navigation, Calendar, BarChart } from 'lucide-react';

const AppDemo: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    {
      icon: <MapPin className="w-5 h-5 text-blue-400" />,
      title: "Location Awareness",
      description: "Intelligently suggests tasks based on your current location"
    },
    {
      icon: <Clock className="w-5 h-5 text-green-400" />,
      title: "Time Optimization",
      description: "Schedules your day to minimize wasted time between tasks"
    },
    {
      icon: <Check className="w-5 h-5 text-purple-400" />,
      title: "Contextual Task Creation",
      description: "Understands the context of your tasks for better organization"
    },
    {
      icon: <Navigation className="w-5 h-5 text-orange-400" />,
      title: "Route Planning",
      description: "Plans efficient routes between your scheduled activities"
    },
    {
      icon: <Calendar className="w-5 h-5 text-pink-400" />,
      title: "Smart Reminders",
      description: "Sends notifications at the right time and right place"
    },
    {
      icon: <BarChart className="w-5 h-5 text-blue-400" />,
      title: "Progress Tracking",
      description: "Visualizes your productivity and task completion patterns"
    }
  ];

  return (
    <section id="app-demo" className="py-2 -mt-16 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-blue-950/20 to-slate-950"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      {/* Animated particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="particles-container">
          {Array.from({ length: 10 }).map((_, i) => (
            <div 
              key={i} 
              className="particle bg-blue-500/20"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 30 + 10}px`,
                height: `${Math.random() * 30 + 10}px`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 10 + 15}s`
              }}
            ></div>
          ))}
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Experience navNote</h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            See how navNote transforms the way you organize tasks, making life more productive and less stressful.
          </p>
        </motion.div>
        
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
          {/* Phone mockup */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full md:w-1/2 flex justify-center"
          >
            <div className="relative">
              {/* Phone frame */}
              <div className="w-[280px] h-[580px] bg-gray-900 rounded-[36px] p-3 shadow-glow-lg relative">
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-full"></div>
                <div className="w-full h-full bg-gray-800 rounded-[28px] overflow-hidden relative">
                  {/* App UI */}
                  <div className="w-full h-full flex flex-col">
                    {/* App header */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-white font-bold text-lg">navNote</h3>
                          <p className="text-blue-100 text-xs">Monday, October 7</p>
                        </div>
                        <div className="w-8 h-8 bg-white/20 rounded-full"></div>
                      </div>
                    </div>
                    
                    {/* App content */}
                    <div className="flex-grow bg-gray-900 p-3">
                      {/* Map section */}
                      <div className="bg-gray-800 rounded-lg h-[140px] mb-3 relative overflow-hidden">
                        <div className="absolute inset-0 bg-map-pattern opacity-70"></div>
                        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center animate-pulse">
                            <div className="w-3 h-3 bg-white rounded-full"></div>
                          </div>
                        </div>
                        <div className="absolute right-3 bottom-3">
                          <div className="bg-gray-900/80 backdrop-blur-sm p-1 rounded">
                            <Navigation className="w-4 h-4 text-blue-400" />
                          </div>
                        </div>
                      </div>
                      
                      {/* Tasks */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                      >
                        <div className="space-y-2">
                          {/* Task item 1 */}
                          <motion.div 
                            initial={{ x: -20, opacity: 0 }}
                            animate={inView ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
                            transition={{ duration: 0.4, delay: 1 }}
                            className="bg-gray-800 p-3 rounded-lg border-l-4 border-green-500"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium text-white text-sm">Grocery Shopping</h4>
                                <div className="flex items-center mt-1">
                                  <MapPin className="w-3 h-3 text-gray-400 mr-1" />
                                  <span className="text-xs text-gray-400">Whole Foods (0.8 mi)</span>
                                </div>
                              </div>
                              <span className="text-xs bg-gray-700 px-2 py-1 rounded text-gray-300">11:30 AM</span>
                            </div>
                          </motion.div>
                          
                          {/* Task item 2 */}
                          <motion.div 
                            initial={{ x: -20, opacity: 0 }}
                            animate={inView ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
                            transition={{ duration: 0.4, delay: 1.2 }}
                            className="bg-gray-800 p-3 rounded-lg border-l-4 border-blue-500"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium text-white text-sm">Client Meeting</h4>
                                <div className="flex items-center mt-1">
                                  <MapPin className="w-3 h-3 text-gray-400 mr-1" />
                                  <span className="text-xs text-gray-400">Downtown Office</span>
                                </div>
                              </div>
                              <span className="text-xs bg-gray-700 px-2 py-1 rounded text-gray-300">2:00 PM</span>
                            </div>
                          </motion.div>
                          
                          {/* Task item 3 */}
                          <motion.div 
                            initial={{ x: -20, opacity: 0 }}
                            animate={inView ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
                            transition={{ duration: 0.4, delay: 1.4 }}
                            className="bg-gray-800 p-3 rounded-lg border-l-4 border-purple-500"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium text-white text-sm">Pick up kids</h4>
                                <div className="flex items-center mt-1">
                                  <MapPin className="w-3 h-3 text-gray-400 mr-1" />
                                  <span className="text-xs text-gray-400">Westside School</span>
                                </div>
                              </div>
                              <span className="text-xs bg-gray-700 px-2 py-1 rounded text-gray-300">3:30 PM</span>
                            </div>
                          </motion.div>
                        </div>
                      </motion.div>
                    </div>
                    
                    {/* App navigation */}
                    <div className="bg-gray-800 p-2 flex justify-around">
                      <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-gray-300" />
                      </div>
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center -mt-6 border-4 border-gray-800">
                        <Plus className="w-6 h-6 text-white" />
                      </div>
                      <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                        <BarChart className="w-5 h-5 text-gray-300" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Animated glowing elements */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-[50px] blur-xl opacity-70 -z-10 animate-pulse-slow"></div>
              <div className="absolute top-1/4 -right-20 w-16 h-16 bg-blue-500/30 rounded-full blur-xl animate-float"></div>
              <div className="absolute bottom-1/4 -left-16 w-12 h-12 bg-purple-500/30 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
            </div>
          </motion.div>
          
          {/* Features */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full md:w-1/2"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                  transition={{ duration: 0.5, delay: 0.6 + (index * 0.1) }}
                  className="bg-slate-900/80 border border-slate-800/50 rounded-xl p-4 hover:shadow-glow-sm transition-all"
                >
                  <div className="flex items-start">
                    <div className="p-2 bg-gradient-to-br from-slate-800 to-slate-700 rounded-lg mr-3">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{feature.title}</h3>
                      <p className="text-gray-400 text-sm">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="mt-8 bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-6 rounded-2xl border border-blue-500/20"
            >
              <h3 className="text-xl font-bold mb-2">Why Users Love navNote</h3>
              <p className="text-gray-300 mb-4">
                "navNote has completely transformed how I organize my day. The location-aware features and smart scheduling save me hours every week."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mr-3"></div>
                <div>
                  <p className="font-medium">Sarah Johnson</p>
                  <p className="text-xs text-gray-400">Product Manager</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Plus icon component
const Plus = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
  >
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

export default AppDemo; 