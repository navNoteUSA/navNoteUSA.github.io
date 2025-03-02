import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight } from 'lucide-react';

const Contact: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send this to your backend
    console.log('Email submitted:', email);
    setSubmitted(true);
    setEmail('');
  };

  return (
    <section id="contact" ref={sectionRef} className="section bg-gray-900 relative">
      <div className="absolute inset-0 grid-pattern opacity-10"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent"></div>
      
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
      
      <div className="container-custom relative z-10">
        <motion.div
          ref={ref}
          className="max-w-3xl mx-auto text-center"
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
            Ready to <motion.span 
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
              Transform
            </motion.span> Your Productivity?
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-400 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Join our waitlist to be among the first to experience the future of intelligent task management.
          </motion.p>
          
          <motion.div 
            className="bg-gray-800/50 p-8 rounded-xl border border-gray-700 backdrop-blur-sm gradient-border"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            whileHover={{ 
              boxShadow: "0 0 30px rgba(14, 165, 233, 0.1)",
              transition: { duration: 0.3 }
            }}
          >
            {!submitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
                <motion.input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-grow px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  whileFocus={{ 
                    boxShadow: "0 0 0 2px rgba(14, 165, 233, 0.3)",
                    borderColor: "#0ea5e9",
                    transition: { duration: 0.2 }
                  }}
                />
                <motion.button
                  type="submit"
                  className="btn-primary whitespace-nowrap flex items-center justify-center gap-2"
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ 
                    scale: 0.95,
                    transition: { duration: 0.2 }
                  }}
                >
                  Join Waitlist <ArrowRight size={18} />
                </motion.button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="text-center py-3"
              >
                <motion.p 
                  className="text-xl font-medium text-primary-400"
                  animate={{ 
                    color: ['#38bdf8', '#a78bfa', '#38bdf8']
                  }}
                  transition={{ 
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  Thank you for joining our waitlist!
                </motion.p>
                <p className="text-gray-400 mt-2">We'll keep you updated on our launch.</p>
              </motion.div>
            )}
            <p className="text-gray-500 text-sm mt-4">We respect your privacy. No spam, just updates about our launch.</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;