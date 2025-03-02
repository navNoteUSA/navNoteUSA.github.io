import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import gsap from 'gsap';

const Partners: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (carouselRef.current && inView) {
      const logos = carouselRef.current.children;
      
      gsap.to(logos, {
        xPercent: -100,
        ease: "none",
        duration: 20,
        repeat: -1,
        modifiers: {
          xPercent: gsap.utils.wrap(-100, 100)
        }
      });
    }
  }, [inView]);

  const partners = [
    { name: "Kroger Inc.", logo: "K" },
    { name: "Perplexity AI", logo: "P" },
    { name: "Smith's", logo: "S" },
    { name: "Fred Meyer", logo: "F" },
    { name: "Weber State University", logo: "W" }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
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
          <h2 className="section-heading">Our Partners & Collaborators</h2>
          <p className="section-subheading">
            We're working with industry leaders to create a seamless, integrated experience.
          </p>
        </motion.div>
        
        {/* Partners Carousel */}
        <div className="overflow-hidden mb-16">
          <div 
            ref={carouselRef}
            className="flex gap-16 py-8"
            style={{ width: "fit-content" }}
          >
            {[...partners, ...partners].map((partner, index) => (
              <div 
                key={index} 
                className="glass w-48 h-48 flex items-center justify-center rounded-xl"
              >
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-secondary to-accent rounded-full flex items-center justify-center mb-4">
                    <span className="text-4xl font-bold">{partner.logo}</span>
                  </div>
                  <p className="font-medium">{partner.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h3 className="text-2xl font-semibold mb-6">What Our Advisors Say</h3>
          <div className="glass p-8 rounded-xl">
            <p className="text-xl italic mb-6">
              "Industry experts are excited about the potential of navNote to transform productivity."
            </p>
            <div className="w-16 h-1 bg-gradient-to-r from-secondary to-accent mx-auto"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Partners;