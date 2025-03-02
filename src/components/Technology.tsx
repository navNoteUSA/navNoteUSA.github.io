import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Cpu, Shield, Database, Smartphone } from 'lucide-react';

interface TechCardProps {
  icon: React.ReactNode;
  title: string;
  items: string[];
  index: number;
}

const TechCard: React.FC<TechCardProps> = ({ icon, title, items, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      className="card"
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
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <motion.li 
            key={i} 
            className="flex items-start gap-2 text-gray-300"
            initial={{ opacity: 0, x: -10 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
            transition={{ duration: 0.3, delay: 0.5 + (i * 0.1) }}
          >
            <motion.span 
              className="text-primary-400 mt-1"
              animate={{ 
                scale: [1, 1.2, 1],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatDelay: i * 0.5
              }}
            >•</motion.span>
            <span>{item}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

const Technology: React.FC = () => {
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

  const techCards = [
    {
      icon: <Smartphone className="h-6 w-6 text-primary-400" />,
      title: "On-Device AI Processing",
      items: [
        "Faster response times",
        "Higher security and privacy",
        "Seamless functionality even when offline"
      ]
    },
    {
      icon: <Cpu className="h-6 w-6 text-primary-400" />,
      title: "Next-Gen AI Integration",
      items: [
        "Convolutional Neural Networks (CNN) compression",
        "Diffusion Models for intelligent predictions",
        "Advanced location accuracy with sensor fusion"
      ]
    },
    {
      icon: <Shield className="h-6 w-6 text-primary-400" />,
      title: "Privacy-First Design",
      items: [
        "End-to-end encryption for all your data",
        "Local processing minimizes data transmission",
        "Transparent data policies and user control"
      ]
    },
    {
      icon: <Database className="h-6 w-6 text-primary-400" />,
      title: "Retail & Enterprise Integrations",
      items: [
        "Generate dynamic, location-aware shopping lists",
        "Search for in-stock items at partner stores",
        "Get aisle-specific directions for a seamless in-store experience"
      ]
    }
  ];

  return (
    <section id="technology" ref={sectionRef} className="section bg-gray-950 relative">
      <div className="absolute inset-0 grid-pattern opacity-10"></div>
      
      {/* Animated background elements */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-full"
        style={{ y, opacity }}
      >
        <motion.div 
          className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-primary-500/5 filter blur-3xl"
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
          className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-secondary-500/5 filter blur-3xl"
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
      
      {/* Digital circuit animation */}
      <motion.div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10 H 90 V 90 H 10 L 10 10' fill='none' stroke='rgba(14, 165, 233, 0.5)' stroke-width='1'/%3E%3Cpath d='M30 30 H 70 V 70 H 30 L 30 30' fill='none' stroke='rgba(139, 92, 246, 0.5)' stroke-width='1'/%3E%3Cpath d='M10 50 H 90' fill='none' stroke='rgba(14, 165, 233, 0.5)' stroke-width='1'/%3E%3Cpath d='M50 10 V 90' fill='none' stroke='rgba(139, 92, 246, 0.5)' stroke-width='1'/%3E%3C/svg%3E")`,
          backgroundSize: '100px 100px'
        }}
        animate={{
          backgroundPosition: ['0px 0px', '100px 100px']
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
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
              className="inline-block"
              animate={{ 
                color: ['#0ea5e9', '#8b5cf6', '#0ea5e9']
              }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Cutting-Edge
            </motion.span> Technology
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            navNote leverages advanced AI and machine learning to create a truly intelligent assistant.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {techCards.map((card, index) => (
            <TechCard
              key={index}
              icon={card.icon}
              title={card.title}
              items={card.items}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Technology;