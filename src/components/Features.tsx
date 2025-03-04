import React from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Clock, 
  Brain, 
  MessageSquare,
  Shield,
  Users,
  Map,
  Zap,
  Sparkles
} from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      title: 'Spatial Organization',
      description: "Organize tasks by location with smart geofencing that triggers reminders when you're where you need to be.",
      icon: MapPin,
      color: 'from-blue-600 to-blue-400',
      bgColor: 'bg-blue-500',
      delay: 0
    },
    {
      title: 'Time-Aware Tasks',
      description: "Tasks that adapt to your schedule, automatically prioritizing based on time constraints and proximity.",
      icon: Clock, 
      color: 'from-purple-600 to-purple-400',
      bgColor: 'bg-purple-500',
      delay: 0.1
    },
    {
      title: 'AI-Powered Insights',
      description: "Advanced neural networks analyze your patterns and suggest the optimal times and places for completing tasks.",
      icon: Brain,
      color: 'from-indigo-600 to-indigo-400',
      bgColor: 'bg-indigo-500',
      delay: 0.2
    },
    {
      title: 'Rapid Input',
      description: "Voice-to-task conversion with natural language processing - simply speak and we'll organize it for you.",
      icon: MessageSquare,
      color: 'from-green-600 to-green-400',
      bgColor: 'bg-green-500',
      delay: 0.3
    },
    {
      title: 'Privacy-Focused',
      description: "On-device processing and end-to-end encryption ensure your personal data stays private and secure.",
      icon: Shield,
      color: 'from-cyan-600 to-cyan-400',
      bgColor: 'bg-cyan-500',
      delay: 0.4
    },
    {
      title: 'Collaborative Spaces',
      description: "Share location-based task lists with family, teams, or event attendees - perfect for coordinated activities.",
      icon: Users,
      color: 'from-amber-600 to-amber-400',
      bgColor: 'bg-amber-500',
      delay: 0.5
    },
    {
      title: 'Life Map',
      description: "Visualize your tasks and routines on an interactive map, revealing patterns and opportunities for optimization.",
      icon: Map,
      color: 'from-teal-600 to-teal-400',
      bgColor: 'bg-teal-500',
      delay: 0.6
    },
    {
      title: 'Smart Notifications',
      description: "Context-aware alerts that know when to notify you - and when to stay quiet.",
      icon: Zap,
      color: 'from-orange-600 to-orange-400',
      bgColor: 'bg-orange-500',
      delay: 0.7
    },
    {
      title: 'Intelligent Suggestions',
      description: "AI that learns your preferences and suggests the optimal organization of your tasks and time.",
      icon: Sparkles,
      color: 'from-rose-600 to-rose-400',
      bgColor: 'bg-rose-500',
      delay: 0.8
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  const iconVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.15,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="features" className="py-10 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-slate-900"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      {/* Subtle animated particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div 
            key={i} 
            className="absolute bg-blue-500/20 rounded-full blur-xl"
            style={{
              width: `${Math.random() * 80 + 30}px`,
              height: `${Math.random() * 80 + 30}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`
            }}
            animate={{
              x: [0, Math.random() * 30 - 15],
              y: [0, Math.random() * 30 - 15],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center mb-2">
            <div className="h-0.5 w-6 bg-blue-500/50 rounded mr-3"></div>
            <span className="text-blue-400 text-xs font-medium tracking-wider uppercase">Features</span>
            <div className="h-0.5 w-6 bg-blue-500/50 rounded ml-3"></div>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-[var(--text-primary)]">Transforming Productivity Through Intelligent Design</h2>
          <p className="text-base md:text-lg text-[var(--text-tertiary)] max-w-2xl mx-auto">
            navNote's proprietary AI engine integrates with spatial awareness to create a revolutionary task management platform.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              transition={{ duration: 0.3, delay: feature.delay }}
              whileHover={{ 
                y: -3, 
                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.15)', 
                transition: { duration: 0.2 } 
              }}
              className="bg-slate-900/80 backdrop-blur-sm border border-slate-800/70 rounded-lg p-4 shadow-sm hover:border-slate-700/80 transition-all"
            >
              <div className="flex items-start mb-2.5">
                <div className="relative w-7 h-7 mr-2">
                  <div className={`absolute inset-0 ${feature.bgColor} rounded-full opacity-10 blur-sm`}></div>
                  <motion.div 
                    className={`w-7 h-7 rounded-full bg-gradient-to-br ${feature.color} flex items-center justify-center`}
                    variants={iconVariants}
                    whileHover="hover"
                  >
                    <feature.icon size={14} className="text-white" />
                  </motion.div>
                </div>
                <h3 className="text-sm font-semibold text-[var(--text-primary)]">{feature.title}</h3>
              </div>
              
              <p className="text-xs text-[var(--text-tertiary)] ml-9 leading-relaxed">{feature.description}</p>
              
              {/* Tech indicator dots */}
              <div className="flex space-x-1 mt-2 ml-9">
                <div className={`w-1 h-1 rounded-full ${feature.bgColor} opacity-60`}></div>
                <div className={`w-1 h-1 rounded-full ${feature.bgColor} opacity-30`}></div>
                <div className={`w-1 h-1 rounded-full ${feature.bgColor} opacity-10`}></div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;