import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Mission from './components/Mission';
import Technology from './components/Technology';
import Team from './components/Team';
import Partners from './components/Partners';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { motion } from 'framer-motion';

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // Smooth scroll implementation
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A') {
        const href = target.getAttribute('href');
        if (href && href.startsWith('#') && href.length > 1) {
          e.preventDefault();
          const element = document.querySelector(href);
          if (element) {
            window.scrollTo({
              top: element.getBoundingClientRect().top + window.scrollY - 80,
              behavior: 'smooth'
            });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  // Scroll progress indicator
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPosition = window.scrollY;
      const progress = (scrollPosition / totalScroll) * 100;
      setScrollProgress(progress);
      
      // Reveal elements on scroll
      const revealElements = document.querySelectorAll('.reveal-on-scroll');
      revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add('revealed');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Create floating particles
  useEffect(() => {
    const createParticles = () => {
      const particlesContainer = document.createElement('div');
      particlesContainer.className = 'particles-container';
      document.body.appendChild(particlesContainer);

      for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random size between 5px and 15px
        const size = Math.random() * 10 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Random opacity
        particle.style.opacity = `${Math.random() * 0.5 + 0.1}`;
        
        // Animation
        particle.style.animation = `float ${Math.random() * 10 + 5}s ease-in-out infinite`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        
        particlesContainer.appendChild(particle);
      }
    };

    createParticles();
  }, []);

  // Create glowing orbs
  useEffect(() => {
    const createGlowOrbs = () => {
      const sections = document.querySelectorAll('section');
      
      sections.forEach(section => {
        const orb1 = document.createElement('div');
        const orb2 = document.createElement('div');
        
        orb1.className = 'glow-orb';
        orb2.className = 'glow-orb';
        
        // First orb
        const size1 = Math.random() * 300 + 200;
        orb1.style.width = `${size1}px`;
        orb1.style.height = `${size1}px`;
        orb1.style.left = `${Math.random() * 70}%`;
        orb1.style.top = `${Math.random() * 70}%`;
        orb1.style.animation = `pulse ${Math.random() * 5 + 8}s ease-in-out infinite alternate`;
        
        // Second orb
        const size2 = Math.random() * 300 + 200;
        orb2.style.width = `${size2}px`;
        orb2.style.height = `${size2}px`;
        orb2.style.right = `${Math.random() * 70}%`;
        orb2.style.bottom = `${Math.random() * 70}%`;
        orb2.style.animation = `pulse ${Math.random() * 5 + 8}s ease-in-out infinite alternate-reverse`;
        
        // Add to section
        section.style.position = 'relative';
        section.style.overflow = 'hidden';
        section.appendChild(orb1);
        section.appendChild(orb2);
      });
    };

    createGlowOrbs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white relative">
      {/* Scroll progress indicator */}
      <div className="scroll-indicator" style={{ width: `${scrollProgress}%` }}></div>
      
      {/* Rotating background */}
      <div className="rotating-bg"></div>
      
      {/* Circuit lines background */}
      <div className="circuit-lines"></div>
      
      {/* Animated background */}
      <div className="animated-bg"></div>
      
      <Navbar />
      <Hero />
      <Features />
      <Mission />
      <Technology />
      <Team />
      <Partners />
      <Contact />
      <Footer />
      
      {/* Floating elements that follow cursor */}
      <motion.div
        className="fixed w-4 h-4 rounded-full bg-primary-500/20 filter blur-md pointer-events-none z-50"
        animate={{
          x: [0, 100, -100, 0],
          y: [0, -100, 100, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        className="fixed w-6 h-6 rounded-full bg-secondary-500/20 filter blur-md pointer-events-none z-50"
        animate={{
          x: [0, -100, 100, 0],
          y: [0, 100, -100, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
}

export default App;