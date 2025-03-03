import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import LifeMap from './components/LifeMap';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import ContactPage from './components/ContactPage';
import TeamPage from './components/TeamPage';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [showDemoForm, setShowDemoForm] = useState(false);
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [currentPage, setCurrentPage] = useState<'home' | 'team' | 'contact'>('home');
  const cursorRef = useRef<HTMLDivElement>(null);
  
  // Custom cursor effect
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
  
  // Create particle animation
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
  
  // Functions for opening modals
  const openDemoForm = () => setShowDemoForm(true);
  const openAuthForm = (mode: 'signin' | 'signup' = 'signin') => {
    setAuthMode(mode);
    setShowAuthForm(true);
  };
  
  // Navigation functions
  const navigateTo = (page: 'home' | 'team' | 'contact') => {
    setCurrentPage(page);
    window.scrollTo(0, 0); // Scroll to top when changing pages
  };
  
  const renderPage = () => {
    switch(currentPage) {
      case 'team':
        return <TeamPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return (
          <>
            <Hero 
              openDemoForm={openDemoForm}
              openAuthForm={openAuthForm}
            />
            <Features />
            <LifeMap />
            <Pricing />
            <FAQ />
          </>
        );
    }
  };
  
  return (
    <div className="App font-sans bg-slate-950 text-white min-h-screen relative overflow-hidden">
      {/* Custom cursor */}
      <div 
        ref={cursorRef}
        className="custom-cursor hidden md:block fixed w-8 h-8 pointer-events-none z-50"
      ></div>
      
      {/* Particle background */}
      <div className="particle-container fixed inset-0 z-0"></div>
      
      <Navbar 
        openDemoForm={openDemoForm}
        openAuthForm={openAuthForm}
        navigateTo={navigateTo}
        currentPage={currentPage}
      />
      
      {renderPage()}
      
      <Footer />
      
      {/* Modal for demo form */}
      <AnimatePresence>
        {showDemoForm && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-slate-900 rounded-2xl p-6 max-w-md w-full border border-slate-800 shadow-xl relative"
            >
              <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">Request a Demo</h2>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full bg-slate-800 rounded-lg border border-slate-700 p-2.5 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full bg-slate-800 rounded-lg border border-slate-700 p-2.5 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium mb-1">Company</label>
                  <input 
                    type="text" 
                    id="company" 
                    className="w-full bg-slate-800 rounded-lg border border-slate-700 p-2.5 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Company name"
                  />
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-medium rounded-lg px-5 py-2.5 text-center"
                >
                  Submit Request
                </button>
              </form>
              <button 
                onClick={() => setShowDemoForm(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Modal for auth form */}
      <AnimatePresence>
        {showAuthForm && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-slate-900 rounded-2xl p-6 max-w-md w-full border border-slate-800 shadow-xl relative"
            >
              <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
                {authMode === 'signin' ? 'Sign In' : 'Sign Up'}
              </h2>
              <div className="flex space-x-2 mb-4">
                <button 
                  className={`flex-1 py-2 border-b-2 transition-colors ${authMode === 'signin' ? 'border-blue-500 text-blue-500' : 'border-transparent hover:border-gray-500'}`}
                  onClick={() => setAuthMode('signin')}
                >
                  Sign In
                </button>
                <button 
                  className={`flex-1 py-2 border-b-2 transition-colors ${authMode === 'signup' ? 'border-blue-500 text-blue-500' : 'border-transparent hover:border-gray-500'}`}
                  onClick={() => setAuthMode('signup')}
                >
                  Sign Up
                </button>
              </div>
              <form className="space-y-4">
                {authMode === 'signup' && (
                  <div>
                    <label htmlFor="auth-name" className="block text-sm font-medium mb-1">Full Name</label>
                    <input 
                      type="text" 
                      id="auth-name" 
                      className="w-full bg-slate-800 rounded-lg border border-slate-700 p-2.5 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="John Doe"
                    />
                  </div>
                )}
                <div>
                  <label htmlFor="auth-email" className="block text-sm font-medium mb-1">Email</label>
                  <input 
                    type="email" 
                    id="auth-email" 
                    className="w-full bg-slate-800 rounded-lg border border-slate-700 p-2.5 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="auth-password" className="block text-sm font-medium mb-1">Password</label>
                  <input 
                    type="password" 
                    id="auth-password" 
                    className="w-full bg-slate-800 rounded-lg border border-slate-700 p-2.5 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="••••••••"
                  />
                </div>
                {authMode === 'signup' && (
                  <div>
                    <label htmlFor="auth-confirm-password" className="block text-sm font-medium mb-1">Confirm Password</label>
                    <input 
                      type="password" 
                      id="auth-confirm-password" 
                      className="w-full bg-slate-800 rounded-lg border border-slate-700 p-2.5 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="••••••••"
                    />
                  </div>
                )}
                {authMode === 'signin' && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input 
                        id="remember-me" 
                        type="checkbox" 
                        className="w-4 h-4 bg-slate-800 rounded border border-slate-700" 
                      />
                      <label htmlFor="remember-me" className="ml-2 text-sm">Remember me</label>
                    </div>
                    <a href="#" className="text-sm text-blue-500 hover:underline">Forgot password?</a>
                  </div>
                )}
                <button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-medium rounded-lg px-5 py-2.5 text-center"
                >
                  {authMode === 'signin' ? 'Sign In' : 'Sign Up'}
                </button>
              </form>
              <div className="mt-4 text-center text-sm text-gray-400">
                {authMode === 'signin' ? (
                  <p>Don't have an account? <button onClick={() => setAuthMode('signup')} className="text-blue-500 hover:underline">Sign up</button></p>
                ) : (
                  <p>Already have an account? <button onClick={() => setAuthMode('signin')} className="text-blue-500 hover:underline">Sign in</button></p>
                )}
              </div>
              <button 
                onClick={() => setShowAuthForm(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;