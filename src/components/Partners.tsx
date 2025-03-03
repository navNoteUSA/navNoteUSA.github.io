import React from 'react';
import { motion } from 'framer-motion';

interface Partner {
  name: string;
  logo: string;
  category: 'academic' | 'industry' | 'research';
}

const Partners: React.FC = () => {
  const partners: Partner[] = [
    { 
      name: 'Stanford University',
      logo: '/partners/stanford.svg',
      category: 'academic' 
    },
    { 
      name: 'MIT Media Lab',
      logo: '/partners/mit.svg',
      category: 'research' 
    },
    { 
      name: 'Google AI',
      logo: '/partners/google.svg',
      category: 'industry' 
    },
    { 
      name: 'Microsoft Research',
      logo: '/partners/microsoft.svg',
      category: 'research' 
    },
    { 
      name: 'IBM Watson',
      logo: '/partners/ibm.svg',
      category: 'industry'
    },
    { 
      name: 'Harvard Innovation Labs',
      logo: '/partners/harvard.svg',
      category: 'academic'
    },
    { 
      name: 'OpenAI',
      logo: '/partners/openai.svg',
      category: 'research'
    },
    { 
      name: 'UC Berkeley',
      logo: '/partners/berkeley.svg',
      category: 'academic'
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

  return (
    <section id="partners" className="py-12 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-600/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-600/10 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Our Partners & Collaborators</h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            We're proud to work with leading institutions across academia, research, and industry to push the boundaries of AI and task management.
          </p>
        </motion.div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
        >
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-slate-900/80 backdrop-blur-sm border border-slate-800/50 rounded-xl p-6 flex flex-col items-center justify-center hover:shadow-glow-sm transition-all"
            >
              <div className="h-16 md:h-20 w-full flex items-center justify-center mb-4 relative grayscale hover:grayscale-0 transition-all duration-300">
                <div className="bg-gradient-to-r from-slate-800 to-slate-700 absolute inset-0 rounded-md opacity-30"></div>
                <img 
                  src={partner.logo} 
                  alt={`${partner.name} logo`} 
                  className="h-12 md:h-16 object-contain relative z-10" 
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder-logo.svg';
                  }}
                />
              </div>
              <h3 className="text-base md:text-lg font-medium text-center">{partner.name}</h3>
              <span className={`text-xs mt-2 px-3 py-1 rounded-full ${
                partner.category === 'academic' ? 'bg-blue-900/30 text-blue-300' :
                partner.category === 'industry' ? 'bg-green-900/30 text-green-300' :
                'bg-purple-900/30 text-purple-300'
              }`}>
                {partner.category.charAt(0).toUpperCase() + partner.category.slice(1)}
              </span>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-lg text-blue-300 font-medium">Interested in partnering with us?</p>
          <a href="#contact" className="inline-block mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
            Get in Touch
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Partners;