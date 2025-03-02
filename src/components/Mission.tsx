import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Mission: React.FC = () => {
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

  return (
    <section ref={sectionRef} className="section bg-gray-900 relative">
      <div className="absolute inset-0 grid-pattern opacity-10"></div>
      
      {/* Animated background elements */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-full"
        style={{ y, opacity }}
      >
        <motion.div 
          className="absolute top-1/3 left-1/3 w-64 h-64 rounded-full bg-primary-500/5 filter blur-3xl"
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
          className="absolute bottom-1/3 right-1/3 w-80 h-80 rounded-full bg-secondary-500/5 filter blur-3xl"
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Our <motion.span 
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
                Mission
              </motion.span>
            </motion.h2>
            <div className="space-y-4 text-gray-300">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                At navNote, we're redefining task management and organization by making reminders effortless, intuitive, and context-aware. We help people stay productive by ensuring they always have the right information at the right time and place.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                By partnering with major retailers like Kroger, Target, and Walmart, navNote is transforming how users interact with their shopping lists, making item searches and in-store navigation seamless.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                Our ultimate goal is to create a fully AI-powered assistant that not only helps users remember things but also anticipates their needs, making everyday life more convenient and efficient.
              </motion.p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-xl overflow-hidden gradient-border">
              <motion.div 
                className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl blur opacity-30"
                animate={{ 
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{ 
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeInOut" 
                }}
              ></motion.div>
              <div className="relative bg-gray-800 p-6 rounded-xl border border-gray-700">
                <h3 className="text-xl font-bold mb-4">Our Progress</h3>
                <ul className="space-y-3">
                  {[
                    "Designed and finalized the concept and core functionality",
                    "Developing the MVP (Minimum Viable Product)",
                    "Established collaboration with Kroger IT Department",
                    "Secured big-tech business advisors with experience in AI, retail, and enterprise software",
                    "Registered as an LLC and obtained an EIN",
                    "Finalizing the award of $3,000 - Wildcat Microfund from Weber State University"
                  ].map((item, index) => (
                    <motion.li 
                      key={index}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                      transition={{ duration: 0.4, delay: 0.3 + (index * 0.1) }}
                      whileHover={{ x: 5, transition: { duration: 0.2 } }}
                    >
                      <motion.div 
                        className="mt-1 h-5 w-5 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center flex-shrink-0"
                        whileHover={{ 
                          scale: 1.2,
                          rotate: 180,
                          transition: { duration: 0.3 }
                        }}
                      >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </motion.div>
                      <span className="text-gray-300">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Floating elements */}
            <motion.div
              className="absolute -top-10 -right-10 w-20 h-20 rounded-full bg-primary-500/10 filter blur-xl"
              animate={{
                y: [0, -15, 0],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute -bottom-5 left-1/4 w-16 h-16 rounded-full bg-secondary-500/10 filter blur-xl"
              animate={{
                y: [0, 15, 0],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Mission;

export default Mission