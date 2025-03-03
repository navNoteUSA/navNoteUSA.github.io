import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AppDemo from './components/AppDemo';
import Features from './components/Features';
import LifeMap from './components/LifeMap';
import Technology from './components/Technology';
import Partners from './components/Partners';
import Privacy from './components/Privacy';
import ParticleBackground from './components/ParticleBackground';
import Footer from './components/Footer';
import ContactPage from './components/ContactPage';
import TeamPage from './components/TeamPage';
import DemoForm from './components/DemoForm';
import Auth from './components/Auth';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showDemoForm, setShowDemoForm] = useState(false);
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).tagName === 'A' || 
          (e.target as HTMLElement).tagName === 'BUTTON' ||
          (e.target as HTMLElement).closest('a') ||
          (e.target as HTMLElement).closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    
    const onMouseMove = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };
    
    const onMouseDown = () => {
      cursor.classList.add('cursor-clicked');
    };
    
    const onMouseUp = () => {
      cursor.classList.remove('cursor-clicked');
    };
    
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  useEffect(() => {
    const container = document.querySelector('.particle-container');
    if (!container) return;
    
    // Clear existing particles
    container.innerHTML = '';
    
    // Create particles
    const particleCount = 50;
    const colors = ['#4D9DE0', '#78C091', '#3e6ef5', '#00ccff'];
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      
      // Random properties
      const size = Math.random() * 4 + 1;
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      // Set styles
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.backgroundColor = color;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.opacity = `${Math.random() * 0.3 + 0.1}`;
      
      // Animation
      particle.style.animationDuration = `${Math.random() * 20 + 10}s`;
      particle.style.animationDelay = `${Math.random() * 5}s`;
      
      container.appendChild(particle);
    }
  }, []);

  const handleOpenPrivacyPolicy = () => {
    setShowPrivacyPolicy(true);
    // Scroll to top when opening modal
    window.scrollTo(0, 0);
  };

  const handleClosePrivacyPolicy = () => {
    setShowPrivacyPolicy(false);
  };

  const openDemoForm = () => {
    setShowDemoForm(true);
  };

  const closeDemoForm = () => {
    setShowDemoForm(false);
  };

  const openAuthForm = (mode: 'signin' | 'signup' = 'signin') => {
    setAuthMode(mode);
    setShowAuthForm(true);
  };

  const closeAuthForm = () => {
    setShowAuthForm(false);
  };

  // Home page component
  const HomePage = () => (
    <>
      <Navbar 
        openDemoForm={() => setShowDemoForm(true)}
        openAuthForm={() => setShowAuthForm(true)}
      />
      <Hero 
        openDemoForm={() => setShowDemoForm(true)}
        openAuthForm={() => setShowAuthForm(true)}
      />
      <AppDemo />
      <Features />
      <LifeMap />
      <Technology />
      <Privacy 
        showFullPolicy={showPrivacyPolicy} 
        onClose={handleClosePrivacyPolicy} 
      />
      <Partners />
      <Footer onOpenPrivacyPolicy={handleOpenPrivacyPolicy} />
    </>
  );

  return (
    <Router>
      <div className="relative min-h-screen bg-primary text-white overflow-x-hidden">
        {/* Custom cursor (visible only on desktop) */}
        <div 
          ref={cursorRef}
          className="custom-cursor hidden md:block fixed w-8 h-8 pointer-events-none z-50"
        ></div>
        
        {/* Particle background */}
        <div className="particle-container fixed inset-0 z-0"></div>
        
        {/* Modals */}
        <DemoForm isOpen={showDemoForm} onClose={closeDemoForm} />
        <Auth isOpen={showAuthForm} onClose={closeAuthForm} />
        
        {/* Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/team" element={<TeamPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;