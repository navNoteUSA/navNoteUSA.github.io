import React, { useState, useEffect, useRef, createContext } from 'react';
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
import Auth from './components/Auth';
import TestModal from './components/TestModal';
import { initializeAntiScraping } from './utils/antiScraping';

// Create a context to share the reduced motion and mobile detection state
export const MotionContext = createContext({
  prefersReducedMotion: false,
  isMobile: false
});

// Simple mock for useReducedMotion
const useReducedMotion = () => false;

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [showDemoForm, setShowDemoForm] = useState(false);
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [showTestModal, setShowTestModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signup');
  const [isMobile, setIsMobile] = useState(false);
  
  // Check for reduced motion preference from the OS
  const prefersReducedMotion = useReducedMotion();
  
  // Check for mobile device - this affects animations
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      // Force reduced animations on mobile to prevent performance issues
      if (mobile) {
        // Add a class to the body to control CSS animations
        document.body.classList.add('reduced-motion');
      } else {
        document.body.classList.remove('reduced-motion');
      }
    };
    
    // Check on load
    checkMobile();
    
    // Check on resize
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  useEffect(() => {
    initializeAntiScraping();
  }, []);
  
  // Functions for opening modals
  const openDemoForm = () => {
    setShowDemoForm(true);
  };

  const openAuthForm = (mode: 'signin' | 'signup' = 'signup') => {
    console.log('Opening auth form with mode:', mode);
    setAuthMode(mode);
    setShowAuthForm(true);
    console.log('Auth form state updated:', { showAuthForm: true, authMode: mode });
  };
  
  const closeDemoForm = () => {
    setShowDemoForm(false);
  };

  const closeAuthForm = () => {
    console.log('Closing auth form');
    setShowAuthForm(false);
    console.log('Auth form state updated:', { showAuthForm: false });
  };

  const toggleTestModal = () => {
    setShowTestModal(!showTestModal);
    console.log('Test modal toggled:', !showTestModal);
  };
  
  // Navigation functions
  const navigateTo = (page: string) => {
    // Check if the page contains a hash (for within-page navigation)
    if (page.includes('#')) {
      const [pageName, sectionId] = page.split('#');
      
      // If we're already on the correct page, just scroll to the section
      if (currentPage === pageName || (pageName === '' && currentPage === 'home')) {
        const element = document.getElementById(sectionId);
        if (element) {
          // Get the navbar height for proper offset
          const navbarHeight = 80; // matches the --nav-height CSS variable
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - navbarHeight;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      } else {
        // If we need to change pages first, then scroll
        setCurrentPage(pageName || 'home');
        // Use setTimeout to allow the page to render before scrolling
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            const navbarHeight = 80;
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - navbarHeight;
            
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }, 100);
      }
    } else {
      // Regular page navigation (no hash)
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
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
    <MotionContext.Provider value={{ prefersReducedMotion: prefersReducedMotion || isMobile, isMobile }}>
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
        
        {/* Test button for modal */}
        <div className="fixed bottom-4 right-4 z-50">
          <button 
            onClick={toggleTestModal}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg"
          >
            Test Modal
          </button>
        </div>
        
        {/* Cookie Consent Banner */}
        <CookieConsent onNavigate={navigateTo} />
        
        {/* Demo Request Modal */}
        {showDemoForm && (
          <div className="fixed inset-0 flex items-start justify-center bg-black/70 backdrop-blur-sm z-50 pt-24">
            <div className="bg-slate-900 p-8 rounded-2xl border border-slate-700 max-w-md w-full mt-10">
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
        <Auth 
          isOpen={showAuthForm} 
          onClose={closeAuthForm} 
          authMode={authMode}
        />

        {/* Test Modal */}
        <TestModal 
          isOpen={showTestModal}
          onClose={toggleTestModal}
        />
      </div>
    </MotionContext.Provider>
  );
}

export default App;