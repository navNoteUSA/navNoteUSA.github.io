import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Shield, Cpu, Database, Building } from 'lucide-react';

interface TechCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  items: string[];
  index: number;
}

const TechCard: React.FC<TechCardProps> = ({ icon, title, description, items, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass p-6 rounded-xl hover:shadow-lg hover:shadow-accent/10 transition-all"
    >
      <div className="mb-4 text-secondary">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400 mb-4">{description}</p>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="text-accent mt-1">•</span>
            <span>{item}</span>
          </li>
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

  const techCards = [
    {
      icon: <Cpu size={32} />,
      title: "Next-Gen AI Integration",
      description: "navNote isn't just another AI-powered app. We're pioneering the use of advanced neural networks and models to optimize performance.",
      items: [
        "Convolutional Neural Networks (CNN) compression",
        "Diffusion Models for intelligent predictions",
        "Advanced location accuracy with sensor fusion"
      ]
    },
    {
      icon: <Shield size={32} />,
      title: "Privacy-First Design",
      description: "We believe your data belongs to you. navNote is built from the ground up with privacy as a core principle.",
      items: [
        "End-to-end encryption for all your data",
        "Local processing minimizes data transmission",
        "Transparent data policies and user control"
      ]
    },
    {
      icon: <Building size={32} />,
      title: "Retail & Enterprise Integrations",
      description: "By partnering with major retailers, navNote transforms shopping into a personalized, AI-driven experience.",
      items: [
        "Generate dynamic, location-aware shopping lists",
        "Search for in-stock items at partner stores",
        "Get aisle-specific directions for a seamless in-store experience"
      ]
    },
    {
      icon: <Database size={32} />,
      title: "On-Device AI Processing",
      description: "Instead of relying on costly and privacy-risky cloud-based LLM APIs, navNote is developing an on-device Small Language Model (SLM).",
      items: [
        "Faster response times with local processing",
        "Higher security and privacy protection",
        "Seamless functionality even when offline"
      ]
    }
  ];

  return (
    <section id="technology" className="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary to-dark opacity-70"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="section-heading">Technology Stack</h2>
          <p className="section-subheading">
            Our cutting-edge technology combines AI, privacy, and seamless integrations to create a truly intelligent assistant.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {techCards.map((card, index) => (
            <TechCard
              key={index}
              icon={card.icon}
              title={card.title}
              description={card.description}
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