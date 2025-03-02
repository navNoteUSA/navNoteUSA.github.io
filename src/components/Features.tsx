import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Brain, Zap, Lock, MessageSquare } from 'lucide-react';

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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Feature 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="feature-card p-6 md:p-8 rounded-2xl bg-black/30 backdrop-blur-sm border border-slate-800"
          >
            <div className="feature-icon-wrapper mb-4 md:mb-6 w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
              <MapPin className="text-blue-400 w-5 h-5 md:w-6 md:h-6" />
            </div>
            <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">Location Intelligence</h3>
            <p className="text-sm md:text-base text-slate-300">
              Automatically prioritize tasks based on your location and suggest optimal times for completion. Never forget to pick up groceries when you're near the store.
            </p>
          </motion.div>
          
          {/* Feature 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="feature-card p-6 md:p-8 rounded-2xl bg-black/30 backdrop-blur-sm border border-slate-800"
          >
            <div className="feature-icon-wrapper mb-4 md:mb-6 w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
              <Calendar className="text-purple-400 w-5 h-5 md:w-6 md:h-6" />
            </div>
            <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">Smart Calendar Integration</h3>
            <p className="text-sm md:text-base text-slate-300">
              Effortlessly sync with your calendar and intelligently schedule tasks around existing appointments, accounting for travel time and preparation needs.
            </p>
          </motion.div>
          
          {/* Feature 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true, margin: "-100px" }}
            className="feature-card p-6 md:p-8 rounded-2xl bg-black/30 backdrop-blur-sm border border-slate-800"
          >
            <div className="feature-icon-wrapper mb-4 md:mb-6 w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <Brain className="text-emerald-400 w-5 h-5 md:w-6 md:h-6" />
            </div>
            <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">AI Task Planner</h3>
            <p className="text-sm md:text-base text-slate-300">
              The AI algorithm learns your habits and preferences to suggest the most efficient daily schedule, adapting in real-time to changes in your routine.
            </p>
          </motion.div>
          
          {/* Feature 4 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true, margin: "-100px" }}
            className="feature-card p-6 md:p-8 rounded-2xl bg-black/30 backdrop-blur-sm border border-slate-800"
          >
            <div className="feature-icon-wrapper mb-4 md:mb-6 w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center">
              <Zap className="text-amber-400 w-5 h-5 md:w-6 md:h-6" />
            </div>
            <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">Quick Task Creation</h3>
            <p className="text-sm md:text-base text-slate-300">
              Add tasks with natural language input. Simply type or speak your task, and the AI will interpret deadlines, priorities, and required resources.
            </p>
          </motion.div>
          
          {/* Feature 5 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="feature-card p-6 md:p-8 rounded-2xl bg-black/30 backdrop-blur-sm border border-slate-800"
          >
            <div className="feature-icon-wrapper mb-4 md:mb-6 w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
              <Lock className="text-red-400 w-5 h-5 md:w-6 md:h-6" />
            </div>
            <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">Privacy-First Design</h3>
            <p className="text-sm md:text-base text-slate-300">
              Your data stays on your device. Our local-first architecture ensures your personal information never leaves your control without explicit permission.
            </p>
          </motion.div>
          
          {/* Feature 6 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="feature-card p-6 md:p-8 rounded-2xl bg-black/30 backdrop-blur-sm border border-slate-800"
          >
            <div className="feature-icon-wrapper mb-4 md:mb-6 w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center">
              <MessageSquare className="text-cyan-400 w-5 h-5 md:w-6 md:h-6" />
            </div>
            <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">Context-Aware Reminders</h3>
            <p className="text-sm md:text-base text-slate-300">
              Receive reminders exactly when they're most actionable, based on time, location, and activity status. No more missed opportunities or poorly timed alerts.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Features;