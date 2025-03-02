import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MapPin, Video, Search, ShoppingCart, Lightbulb, Wifi } from 'lucide-react';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      className="card feature-gradient-hover"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ 
        y: -10,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        transition: { duration: 0.2 }
      }}
    >
      <motion.div 
        className="mb-4 p-3 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-lg inline-block"
        whileHover={{ 
          scale: 1.1,
          rotate: 5,
          transition: { duration: 0.2 }
        }}
      >
        {icon}
      </motion.div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
};

const Features: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const features = [
    {
      icon: <MapPin className="h-6 w-6 text-primary-400" />,
      title: "Location-Based Reminders",
      description: "Get reminded of tasks exactly when and where you need them with our hyper-accurate location tracking system."
    },
    {
      icon: <Video className="h-6 w-6 text-primary-400" />,
      title: "Video Memory Triggers",
      description: "Record quick videos as memory triggers that play automatically when you arrive at relevant locations."
    },
    {
      icon: <Search className="h-6 w-6 text-primary-400" />,
      title: "Smart Search Engine",
      description: "Instantly find any note, reminder, or media file with our powerful internal search functionality."
    },
    {
      icon: <ShoppingCart className="h-6 w-6 text-primary-400" />,
      title: "Retail Integration",
      description: "Connect with major retailers for seamless shopping lists, in-store navigation, and item search."
    },
    {
      icon: <Lightbulb className="h-6 w-6 text-primary-400" />,
      title: "AI-Powered Suggestions",
      description: "Receive intelligent task suggestions based on your habits, location, and previous activities."
    },
    {
      icon: <Wifi className="h-6 w-6 text-primary-400" />,
      title: "Offline Functionality",
      description: "Access all features even without internet connection thanks to our on-device AI processing."
    }
  ];

  return (
    <section id="features" ref={sectionRef} className="section bg-gray-950 relative">
      <div className="absolute inset-0 grid-pattern opacity-10"></div>
      
      {/* Animated background elements */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-full"
        style={{ y, opacity }}
      >
        <motion.div 
          className="absolute top-10 left-1/4 w-64 h-64 rounded-full bg-primary-500/5 filter blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-10 right-1/4 w-80 h-80 rounded-full bg-secondary-500/5 filter blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
      
      <div className="container-custom relative z-10">
        <motion.div
          ref={ref}
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.span 
              className="gradient-text inline-block"
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              What you want,
            </motion.span> where you want, when you want
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            navNote combines AI intelligence with context awareness to create a productivity experience unlike any other.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Feature
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;