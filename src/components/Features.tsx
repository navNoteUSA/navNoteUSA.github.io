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
  ShoppingBag,
  Video,
  Search,
  Wifi,
  Store
} from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      title: 'Location-Based Reminders',
      description: 'Get reminded when and where you need it with our intelligent location-aware system.',
      icon: MapPin,
      color: 'from-blue-600 to-blue-400',
      bgColor: 'bg-blue-500',
      delay: 0
    },
    {
      title: 'Video Memory Triggers',
      description: 'Capture quick videos as memory aids for locations to enhance your recall and task context.',
      icon: Video,
      color: 'from-purple-600 to-purple-400',
      bgColor: 'bg-purple-500',
      delay: 0.1
    },
    {
      title: 'Smart Search Engine',
      description: 'Instantly find notes, reminders, and files with our powerful AI-driven search capabilities.',
      icon: Search,
      color: 'from-cyan-600 to-cyan-400',
      bgColor: 'bg-cyan-500',
      delay: 0.2
    },
    {
      title: 'Retail Integration',
      description: 'Connect with major stores for AI-driven shopping lists that know what you need and where to find it.',
      icon: Store,
      color: 'from-green-600 to-green-400',
      bgColor: 'bg-green-500',
      delay: 0.3
    },
    {
      title: 'AI-Powered Suggestions',
      description: 'Smart task predictions based on your habits, creating a truly personalized experience.',
      icon: Brain,
      color: 'from-orange-600 to-orange-400',
      bgColor: 'bg-orange-500',
      delay: 0.4
    },
    {
      title: 'Offline Functionality',
      description: "Seamless AI experience without an internet connection, ensuring you're never without your virtual memory.",
      icon: Wifi,
      color: 'from-red-600 to-red-400',
      bgColor: 'bg-red-500',
      delay: 0.5
    }
  ];

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  // Animation for icon hover effect
  const iconVariants = {
    hidden: { scale: 1 },
    visible: { scale: 1 },
    hover: { scale: 1.1, rotate: 5, transition: { duration: 0.3 } }
  };

  return (
    <section id="features" className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-slate-900"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      {/* Animated particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 6 }).map((_, i) => (
          <div 
            key={i} 
            className="absolute bg-blue-500/30 rounded-full blur-2xl animate-float-slow"
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 10 + 15}s`,
              animationDelay: `${Math.random() * 5}s`
            }}
          ></div>
        ))}
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
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
                <div className={`absolute inset-0 ${feature.bgColor} rounded-full opacity-20 animate-pulse-slow`}></div>
                <motion.div 
                  className={`w-14 h-14 rounded-full bg-gradient-to-br ${feature.color} flex items-center justify-center`}
                  variants={iconVariants}
                  whileHover="hover"
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