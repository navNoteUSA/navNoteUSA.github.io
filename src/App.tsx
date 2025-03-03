import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import LifeMap from './components/LifeMap';
import AppDemo from './components/AppDemo';
import Technology from './components/Technology';
import Partners from './components/Partners';
import CallToAction from './components/CallToAction';
import TeamPage from './components/TeamPage';
import ContactPage from './components/ContactPage';
import Footer from './components/Footer';
import ParticleBackground from './components/ParticleBackground';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [showDemoForm, setShowDemoForm] = useState(false);
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  
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
  const openDemoForm = () => {
    setShowDemoForm(true);
  };

  const openAuthForm = (mode: 'signin' | 'signup' = 'signin') => {
    setAuthMode(mode);
    setShowAuthForm(true);
  };
  
  const closeDemoForm = () => {
    setShowDemoForm(false);
  };

  const closeAuthForm = () => {
    setShowAuthForm(false);
  };
  
  // Navigation functions
  const navigateTo = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <Hero onOpenDemo={openDemoForm} onOpenAuth={openAuthForm} />
            <Features />
            <LifeMap />
            <Partners />
            <Technology />
            <AppDemo />
            <CallToAction onOpenDemo={openDemoForm} onOpenAuth={openAuthForm} />
          </>
        );
      case 'team':
        return <TeamPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <Hero onOpenDemo={openDemoForm} onOpenAuth={openAuthForm} />;
    }
  };
  
  return (
    <div className="app min-h-screen bg-slate-950 text-white relative overflow-hidden">
      <ParticleBackground />
      
      {/* Glow Effects */}
      <div className="fixed top-1/4 -left-52 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl"></div>
      <div className="fixed bottom-0 right-0 w-[40rem] h-[40rem] bg-purple-500/10 rounded-full filter blur-3xl"></div>

      <div className="relative z-10">
        <Navbar 
          onNavigate={navigateTo} 
          onOpenDemo={openDemoForm} 
          onOpenAuth={openAuthForm} 
        />
        
        <main>
          {renderPage()}
        </main>
        
        <Footer onNavigate={navigateTo} />
      </div>
      
      {/* Demo Request Modal */}
      {showDemoForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50">
          <div className="bg-slate-900 p-8 rounded-2xl border border-slate-700 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-6">Request a Demo</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Your Name</label>
                <input type="text" className="w-full px-4 py-3 bg-slate-800 rounded-lg border border-slate-700" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email Address</label>
                <input type="email" className="w-full px-4 py-3 bg-slate-800 rounded-lg border border-slate-700" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Company</label>
                <input type="text" className="w-full px-4 py-3 bg-slate-800 rounded-lg border border-slate-700" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message (Optional)</label>
                <textarea className="w-full px-4 py-3 bg-slate-800 rounded-lg border border-slate-700 h-24"></textarea>
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <button 
                  type="button" 
                  onClick={closeDemoForm}
                  className="px-4 py-2 border border-slate-600 rounded-lg hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Auth Modal */}
      {showAuthForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50">
          <div className="bg-slate-900 p-8 rounded-2xl border border-slate-700 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-6">Sign In / Sign Up</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Email Address</label>
                <input type="email" className="w-full px-4 py-3 bg-slate-800 rounded-lg border border-slate-700" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <input type="password" className="w-full px-4 py-3 bg-slate-800 rounded-lg border border-slate-700" />
              </div>
              <div className="flex justify-between items-center">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm">Remember me</span>
                </label>
                <a href="#" className="text-sm text-blue-400 hover:text-blue-300">Forgot password?</a>
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <button 
                  type="button" 
                  onClick={closeAuthForm}
                  className="px-4 py-2 border border-slate-600 rounded-lg hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  Sign In
                </button>
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-400">
                  Don't have an account? <a href="#" className="text-blue-400 hover:text-blue-300">Sign up</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;