import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import gsap from 'gsap';

const Mission: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bgRef.current) {
      gsap.to(bgRef.current, {
        backgroundPosition: '100% 100%',
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
  }, []);

  return (
    <section id="mission" className="py-20 relative overflow-hidden">
      {/* Animated background */}
      <div 
        ref={bgRef}
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.2"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          backgroundSize: '60px 60px',
        }}
      ></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="section-heading">Our Mission</h2>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass p-8 rounded-xl"
          >
            <p className="text-lg mb-6">
              At navNote, we're redefining task management and organization by making reminders effortless, intuitive, and context-aware. We help people stay productive by ensuring they always have the right information at the right time and place.
            </p>
            <p className="text-lg mb-6">
              By partnering with major retailers like Kroger, Target, and Walmart, navNote is transforming how users interact with their shopping lists, making item searches and in-store navigation seamless.
            </p>
            <p className="text-lg">
              Our ultimate goal is to create a fully AI-powered assistant that not only helps users remember things but also anticipates their needs, making everyday life more convenient and efficient.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-secondary to-accent rounded-xl blur opacity-30"></div>
              <div className="relative glass p-8 rounded-xl h-full">
                <h3 className="text-2xl font-bold mb-6 text-gradient">navNote leverages advanced AI and machine learning to create a truly intelligent assistant.</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xl font-semibold mb-2">On-Device AI Processing</h4>
                    <p className="text-gray-300">
                      Instead of relying on costly and privacy-risky cloud-based LLM APIs, navNote is developing an on-device Small Language Model (SLM) to perform core AI tasks locally.
                    </p>
                    <ul className="mt-2 space-y-1 text-gray-300">
                      <li className="flex items-center gap-2">
                        <span className="text-secondary">•</span> Faster response times
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-secondary">•</span> Higher security and privacy
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-secondary">•</span> Seamless functionality even when offline
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Mission;