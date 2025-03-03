import React from 'react';
import { motion } from 'framer-motion';

const Partners: React.FC = () => {
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
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center py-16"
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