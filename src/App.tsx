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
import CookieConsent from './components/CookieConsent';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfUse from './pages/TermsOfUse';
import CookieSettings from './pages/CookieSettings';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [showDemoForm, setShowDemoForm] = useState(false);
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  
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
            <Hero openDemoForm={openDemoForm} openAuthForm={openAuthForm} />
            <Features />
            <LifeMap />
            <AppDemo />
            <Technology />
            <Partners />
            <CallToAction onOpenDemo={openDemoForm} onOpenAuth={openAuthForm} />
          </>
        );
      case 'team':
        return <TeamPage />;
      case 'contact':
        return <ContactPage />;
      case 'privacy':
        return <PrivacyPolicy onBack={() => navigateTo('home')} />;
      case 'terms':
        return <TermsOfUse onBack={() => navigateTo('home')} />;
      case 'cookies':
        return <CookieSettings onBack={() => navigateTo('home')} />;
      default:
        return <Hero openDemoForm={openDemoForm} openAuthForm={openAuthForm} />;
    }
  };
  
  // Determine whether to show navbar and footer
  const showNavbarAndFooter = !['privacy', 'terms', 'cookies'].includes(currentPage);
  
  return (
    <div className="app min-h-screen bg-black text-white relative overflow-hidden">
      <div className="relative z-10">
        {showNavbarAndFooter && (
          <Navbar 
            onNavigate={navigateTo} 
            onOpenDemo={openDemoForm} 
            onOpenAuth={openAuthForm} 
          />
        )}
        
        <main>
          {renderPage()}
        </main>
        
        {showNavbarAndFooter && <Footer onNavigate={navigateTo} />}
      </div>
      
      {/* Cookie Consent Banner */}
      <CookieConsent onNavigate={navigateTo} />
      
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