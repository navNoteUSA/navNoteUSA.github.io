import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, BrainCircuit, MessageSquareText, ShieldCheck, Users } from 'lucide-react';

// Custom variants for smoother animations
const containerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  }
};

const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0.0, 0.2, 1] // Improved easing for smoother motion
    }
  }
};

// Icon animation variants
const iconContainerVariant = {
  rest: { 
    scale: 1,
    rotate: 0,
    transition: { 
      duration: 0.2, 
      ease: "easeInOut",
      type: "tween"
    }
  },
  hover: { 
    scale: 1.1,
    rotate: 5,
    transition: { 
      duration: 0.3, 
      ease: "easeOut",
      type: "spring",
      stiffness: 300
    }
  }
};

const iconElementVariant = {
  rest: { 
    y: 0,
    opacity: 0.8,
    transition: { 
      duration: 0.2, 
      ease: "easeInOut" 
    }
  },
  hover: { 
    y: -2,
    opacity: 1,
    transition: { 
      duration: 0.3, 
      ease: "easeOut" 
    }
  }
};

// Special mobile check for performance
const FeatureIcon = ({ children, color }) => {
  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={iconContainerVariant}
      className={`relative w-16 h-16 rounded-2xl flex items-center justify-center ${color} shadow-lg overflow-hidden feature-icon-shine`}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br opacity-20"></div>
      
      {/* Animated circles in background */}
      <div className="absolute w-24 h-24 rounded-full bg-white/5 animate-pulse-slow"></div>
      <div className="absolute w-14 h-14 rounded-full bg-white/10" style={{animationDelay: '1s'}}></div>
      
      {/* Icon with animation */}
      <motion.div variants={iconElementVariant} className="relative">
        {children}
      </motion.div>
    </motion.div>
  );
};

const Features: React.FC = () => {
  return (
    <section id="features" className="py-16 md:py-24 bg-gradient-to-b from-black to-slate-900 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="section-heading text-3xl md:text-5xl">Core Features</h2>
          <p className="section-subheading text-base md:text-lg max-w-2xl mx-auto">
            navNote combines AI intelligence with location awareness to transform how you organize your life.
          </p>
        </motion.div>
        
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Feature 1 - Spatial Organization */}
          <motion.div 
            className="feature-card transition-smooth"
            variants={itemVariant}
          >
            <div className="p-8 glass-card rounded-xl hover:shadow-blue-glow transition-all duration-300 h-full">
              <div className="flex justify-center mb-6">
                <FeatureIcon color="from-blue-600/20 to-blue-400/40">
                  <MapPin size={28} className="text-secondary" strokeWidth={1.5} />
                </FeatureIcon>
              </div>
              <h3 className="text-xl font-semibold text-center mb-4">Spatial Organization</h3>
              <p className="text-gray-300 text-center">
                Arrange tasks and notes by location, creating a spatial map of your digital life that mirrors the real world.
              </p>
            </div>
          </motion.div>
          
          {/* Feature 2 - Time-Aware Tasks */}
          <motion.div 
            className="feature-card transition-smooth"
            variants={itemVariant}
          >
            <div className="p-8 glass-card rounded-xl hover:shadow-blue-glow transition-all duration-300 h-full">
              <div className="flex justify-center mb-6">
                <FeatureIcon color="from-teal-600/20 to-teal-400/40">
                  <Clock size={28} className="text-accent" strokeWidth={1.5} />
                </FeatureIcon>
              </div>
              <h3 className="text-xl font-semibold text-center mb-4">Time-Aware Tasks</h3>
              <p className="text-gray-300 text-center">
                Tasks adjust based on time proximity, bringing upcoming events closer and creating a dynamic planning experience.
              </p>
            </div>
          </motion.div>
          
          {/* Feature 3 - AI-Powered Insights */}
          <motion.div 
            className="feature-card transition-smooth"
            variants={itemVariant}
          >
            <div className="p-8 glass-card rounded-xl hover:shadow-blue-glow transition-all duration-300 h-full">
              <div className="flex justify-center mb-6">
                <FeatureIcon color="from-purple-600/20 to-purple-400/40">
                  <BrainCircuit size={28} className="text-purple" strokeWidth={1.5} />
                </FeatureIcon>
              </div>
              <h3 className="text-xl font-semibold text-center mb-4">AI-Powered Insights</h3>
              <p className="text-gray-300 text-center">
                Advanced AI analyzes your tasks and habits to provide personalized suggestions and optimize your workflow.
              </p>
            </div>
          </motion.div>
          
          {/* Feature 4 - Rapid Input */}
          <motion.div 
            className="feature-card transition-smooth"
            variants={itemVariant}
          >
            <div className="p-8 glass-card rounded-xl hover:shadow-blue-glow transition-all duration-300 h-full">
              <div className="flex justify-center mb-6">
                <FeatureIcon color="from-blue-600/20 to-blue-400/40">
                  <MessageSquareText size={28} className="text-secondary" strokeWidth={1.5} />
                </FeatureIcon>
              </div>
              <h3 className="text-xl font-semibold text-center mb-4">Rapid Input</h3>
              <p className="text-gray-300 text-center">
                Natural language processing lets you add tasks conversationally, with automatic categorization and priority setting.
              </p>
            </div>
          </motion.div>
          
          {/* Feature 5 - Privacy-Focused */}
          <motion.div 
            className="feature-card transition-smooth"
            variants={itemVariant}
          >
            <div className="p-8 glass-card rounded-xl hover:shadow-blue-glow transition-all duration-300 h-full">
              <div className="flex justify-center mb-6">
                <FeatureIcon color="from-teal-600/20 to-teal-400/40">
                  <ShieldCheck size={28} className="text-accent" strokeWidth={1.5} />
                </FeatureIcon>
              </div>
              <h3 className="text-xl font-semibold text-center mb-4">Privacy-Focused</h3>
              <p className="text-gray-300 text-center">
                Your data stays on your device with end-to-end encryption, ensuring your personal information remains private.
              </p>
            </div>
          </motion.div>
          
          {/* Feature 6 - Collaborative Spaces */}
          <motion.div 
            className="feature-card transition-smooth"
            variants={itemVariant}
          >
            <div className="p-8 glass-card rounded-xl hover:shadow-blue-glow transition-all duration-300 h-full">
              <div className="flex justify-center mb-6">
                <FeatureIcon color="from-purple-600/20 to-purple-400/40">
                  <Users size={28} className="text-purple" strokeWidth={1.5} />
                </FeatureIcon>
              </div>
              <h3 className="text-xl font-semibold text-center mb-4">Collaborative Spaces</h3>
              <p className="text-gray-300 text-center">
                Share and collaborate on projects with team members while maintaining granular control over permissions.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;