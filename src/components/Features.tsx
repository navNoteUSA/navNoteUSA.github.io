import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MapPin, Video, Search, ShoppingCart, Lightbulb, Wifi } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, index }) => {
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
      className="feature-card group"
    >
      <div className="mb-4 text-secondary group-hover:text-accent transition-colors duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
};

const Features: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    {
      icon: <MapPin size={40} />,
      title: "Location-Based Reminders",
      description: "Get reminded of tasks exactly when and where you need them with our hyper-accurate location tracking system."
    },
    {
      icon: <Video size={40} />,
      title: "Video Memory Triggers",
      description: "Record quick videos as memory triggers that play automatically when you arrive at relevant locations."
    },
    {
      icon: <Search size={40} />,
      title: "Smart Search Engine",
      description: "Instantly find any note, reminder, or media file with our powerful internal search functionality."
    },
    {
      icon: <ShoppingCart size={40} />,
      title: "Retail Integration",
      description: "Connect with major retailers for seamless shopping lists, in-store navigation, and item search."
    },
    {
      icon: <Lightbulb size={40} />,
      title: "AI-Powered Suggestions",
      description: "Receive intelligent task suggestions based on your habits, location, and previous activities."
    },
    {
      icon: <Wifi size={40} />,
      title: "Offline Functionality",
      description: "Access all features even without internet connection thanks to our on-device AI processing."
    }
  ];

  return (
    <section id="features" className="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark to-primary opacity-50"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="section-heading">Redefining Task Management</h2>
          <p className="section-subheading">
            navNote combines AI intelligence with context awareness to create a productivity experience unlike any other.
          </p>
          <div className="mt-6 p-4 glass rounded-lg inline-block">
            <p className="italic text-lg">&lt;nav&gt; What you want, where you want, when you want, it is on me. &lt;/nav&gt;</p>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
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