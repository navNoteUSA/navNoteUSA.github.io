import React from 'react';
import { motion } from 'framer-motion';

interface Partner {
  name: string;
  category: 'retail' | 'tech' | 'education';
}

const Partners: React.FC = () => {
  const partners: Partner[] = [
    { 
      name: 'Kroger Inc.',
      category: 'retail' 
    },
    { 
      name: 'Perplexity AI',
      category: 'tech' 
    },
    { 
      name: "Smith's",
      category: 'retail' 
    },
    { 
      name: 'Fred Meyer',
      category: 'retail' 
    },
    { 
      name: 'Weber State University',
      category: 'education'
    }
  ];

  // Animation variants for the scrolling marquee effect
  const containerVariants = {
    animate: {
      x: [0, -1000],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 20,
          ease: "linear"
        }
      }
    }
  };

  // Duplicate the partners for continuous scrolling effect
  const scrollingPartners = [...partners, ...partners, ...partners];

  return (
    <section id="partners" className="py-2 -mt-12 mb-0 relative overflow-hidden">
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
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-[var(--text-primary)]">Our Partners & Collaborators</h2>
          <p className="text-lg text-[var(--text-tertiary)] max-w-3xl mx-auto">
            We're proud to work with leading institutions across academia, research, and industry to push the boundaries of AI and task management.
          </p>
        </motion.div>
        
        {/* Scrolling partners marquee */}
        <div className="relative w-full overflow-hidden py-10">
          <motion.div
            className="flex whitespace-nowrap"
            variants={containerVariants}
            animate="animate"
          >
            {scrollingPartners.map((partner, index) => (
              <div 
                key={index} 
                className="inline-flex flex-col items-center justify-center mx-12 min-w-[200px]"
              >
                <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800/50 rounded-xl p-6 w-full flex flex-col items-center justify-center hover:shadow-glow-sm transition-all">
                  <h3 className="text-base md:text-xl font-medium text-center text-[var(--text-primary)]">{partner.name}</h3>
                  <span className={`text-sm mt-2 px-3 py-1 rounded-full ${
                    partner.category === 'retail' ? 'bg-green-900/30 text-green-300' :
                    partner.category === 'tech' ? 'bg-blue-900/30 text-blue-300' :
                    'bg-purple-900/30 text-purple-300'
                  }`}>
                    {partner.category.charAt(0).toUpperCase() + partner.category.slice(1)}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-lg text-[var(--text-accent)] font-medium">Interested in partnering with us?</p>
          <a href="mailto:sales@navNote.net" className="inline-block mt-4 px-6 py-3 bg-[var(--text-accent)] hover:bg-blue-700 text-[var(--text-primary)] font-medium rounded-lg transition-colors">
            Get in Touch
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Partners;