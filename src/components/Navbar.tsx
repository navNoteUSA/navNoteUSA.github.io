import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download, HelpCircle, Shield, MapPin } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className={`${isScrolled ? 'navbar-sticky glass' : 'absolute'} top-0 left-0 w-full z-50 transition-all duration-300`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <a href="#" className="flex items-center">
              <img 
                src="/logo.svg" 
                alt="navNote Logo" 
                className="h-12 w-12 mr-3"
              />
              <span className="text-xl font-bold text-gradient">navNote</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="nav-link">Features</a>
            <a href="#lifemap" className="nav-link">Life Map</a>
            <a href="#technology" className="nav-link">Technology</a>
            <a href="#privacy" className="nav-link">Privacy</a>
            <a href="#contact" className="nav-link">Contact</a>
            <a 
              href="#download" 
              className="bg-secondary text-white px-5 py-2 rounded-full hover:shadow-blue-glow transition-all duration-300 flex items-center gap-2"
            >
              <Download size={16} />
              Get the App
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass border-t border-white/5"
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <a 
                href="#features" 
                className="py-3 px-4 flex items-center space-x-3 rounded-lg hover:bg-white/5 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <HelpCircle size={18} className="text-secondary" />
                <span>Features</span>
              </a>
              <a 
                href="#lifemap" 
                className="py-3 px-4 flex items-center space-x-3 rounded-lg hover:bg-white/5 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <MapPin size={18} className="text-accent" />
                <span>Life Map</span>
              </a>
              <a 
                href="#technology" 
                className="py-3 px-4 flex items-center space-x-3 rounded-lg hover:bg-white/5 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-secondary">
                  <path d="M12 3L20 7.5V16.5L12 21L4 16.5V7.5L12 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 12L12 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 12L20 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 12L4 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Technology</span>
              </a>
              <a 
                href="#privacy" 
                className="py-3 px-4 flex items-center space-x-3 rounded-lg hover:bg-white/5 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Shield size={18} className="text-accent" />
                <span>Privacy</span>
              </a>
              <a 
                href="#contact" 
                className="py-3 px-4 flex items-center space-x-3 rounded-lg hover:bg-white/5 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-secondary">
                  <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Contact</span>
              </a>
              <a 
                href="#download"
                className="mt-2 py-3 bg-secondary text-white rounded-lg flex items-center justify-center space-x-2"
                onClick={() => setIsOpen(false)}
              >
                <Download size={18} />
                <span>Get the App</span>
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;