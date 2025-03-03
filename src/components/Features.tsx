import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Brain, Zap, Lock, MessageSquare } from 'lucide-react';

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
          {/* Feature 1 */}
          <motion.div 
            className="feature-card"
            variants={itemVariant}
          >
            <div className="hexagon bg-secondary/10">
              <div className="hexagon-content">
                <div className="w-12 h-12 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-secondary" />
                </div>
              </div>
            </div>
            <h3 className="text-xl font-semibold mt-6 mb-3">Spatial Organization</h3>
            <p className="text-gray-300">
              Arrange tasks and notes by location, creating a spatial map of your digital life that mirrors the real world.
            </p>
          </motion.div>
          
          {/* Feature 2 */}
          <motion.div 
            className="feature-card"
            variants={itemVariant}
          >
            <div className="hexagon bg-accent/10">
              <div className="hexagon-content">
                <div className="w-12 h-12 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-accent" />
                </div>
              </div>
            </div>
            <h3 className="text-xl font-semibold mt-6 mb-3">Time-Aware Tasks</h3>
            <p className="text-gray-300">
              Tasks adjust based on time proximity, bringing upcoming events closer and creating a dynamic planning experience.
            </p>
          </motion.div>
          
          {/* Feature 3 */}
          <motion.div 
            className="feature-card"
            variants={itemVariant}
          >
            <div className="hexagon bg-purple/10">
              <div className="hexagon-content">
                <div className="w-12 h-12 flex items-center justify-center">
                  <Brain className="w-6 h-6 text-purple" />
                </div>
              </div>
            </div>
            <h3 className="text-xl font-semibold mt-6 mb-3">AI-Powered Insights</h3>
            <p className="text-gray-300">
              Advanced AI analyzes your tasks and habits to provide personalized suggestions and optimize your workflow.
            </p>
          </motion.div>
          
          {/* Feature 4 */}
          <motion.div 
            className="feature-card"
            variants={itemVariant}
          >
            <div className="hexagon bg-secondary/10">
              <div className="hexagon-content">
                <div className="w-12 h-12 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-secondary" />
                </div>
              </div>
            </div>
            <h3 className="text-xl font-semibold mt-6 mb-3">Rapid Input</h3>
            <p className="text-gray-300">
              Natural language processing lets you add tasks conversationally, with automatic categorization and priority setting.
            </p>
          </motion.div>
          
          {/* Feature 5 */}
          <motion.div 
            className="feature-card"
            variants={itemVariant}
          >
            <div className="hexagon bg-accent/10">
              <div className="hexagon-content">
                <div className="w-12 h-12 flex items-center justify-center">
                  <Lock className="w-6 h-6 text-accent" />
                </div>
              </div>
            </div>
            <h3 className="text-xl font-semibold mt-6 mb-3">Privacy-Focused</h3>
            <p className="text-gray-300">
              Your data stays on your device with end-to-end encryption, ensuring your personal information remains private.
            </p>
          </motion.div>
          
          {/* Feature 6 */}
          <motion.div 
            className="feature-card"
            variants={itemVariant}
          >
            <div className="hexagon bg-purple/10">
              <div className="hexagon-content">
                <div className="w-12 h-12 flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-purple" />
                </div>
              </div>
            </div>
            <h3 className="text-xl font-semibold mt-6 mb-3">Collaborative Spaces</h3>
            <p className="text-gray-300">
              Share and collaborate on projects with team members while maintaining granular control over permissions.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;