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
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    },
    hover: {
      y: -10,
      transition: { 
        type: "spring", 
        stiffness: 500, 
        damping: 15,
        duration: 0.1
      }
    }
  };

  const iconVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: { 
      scale: 1.2,
      rotate: [0, 10, -10, 0],
      transition: {
        duration: 0.5,
        repeat: 0,
      }
    },
    pulse: {
      scale: [1, 1.1, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  return (
    <section id="features" className="py-12 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-slate-900"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      {/* Animated particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div 
            key={i} 
            className="absolute bg-blue-500/30 rounded-full blur-2xl"
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`
            }}
            animate={{
              x: [0, Math.random() * 50 - 25],
              y: [0, Math.random() * 50 - 25],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Redefining Task Management with AI</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            navNote combines AI intelligence with location awareness to transform how you organize your life.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              transition={{ duration: 0.5, delay: feature.delay }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 shadow-lg hover:shadow-glow-sm transition-all"
            >
              <div className="relative mb-6 w-16 h-16">
                <motion.div 
                  className={`absolute inset-0 ${feature.bgColor} rounded-full opacity-20`}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.3, 0.2]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
                <motion.div 
                  className={`w-14 h-14 rounded-full bg-gradient-to-br ${feature.color} flex items-center justify-center`}
                  variants={iconVariants}
                  initial="initial"
                  whileHover="hover"
                  animate="pulse"
                >
                  <feature.icon size={24} className="text-white" />
                </motion.div>
              </div>
              
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;