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
              <span className="text-2xl font-bold text-gradient">navNote</span>
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
              Get a Demo
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
            <nav className="container mx-auto px-4 py-6 flex flex-col space-y-3">
              <a 
                href="#features" 
                className="py-4 px-5 flex items-center space-x-3 rounded-lg hover:bg-white/10 active:bg-white/20 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                  <HelpCircle size={20} className="text-secondary" />
                </div>
                <div>
                  <span className="font-medium">Features</span>
                  <p className="text-xs text-gray-400">Explore what makes navNote unique</p>
                </div>
              </a>
              <a 
                href="#lifemap" 
                className="py-4 px-5 flex items-center space-x-3 rounded-lg hover:bg-white/10 active:bg-white/20 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                  <MapPin size={20} className="text-accent" />
                </div>
                <div>
                  <span className="font-medium">Life Map</span>
                  <p className="text-xs text-gray-400">See your tasks in a spatial context</p>
                </div>
              </a>
              <a 
                href="#technology" 
                className="py-4 px-5 flex items-center space-x-3 rounded-lg hover:bg-white/10 active:bg-white/20 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-secondary">
                    <path d="M12 3L20 7.5V16.5L12 21L4 16.5V7.5L12 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 12L12 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 12L20 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 12L4 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <span className="font-medium">Technology</span>
                  <p className="text-xs text-gray-400">Our AI-powered core technology</p>
                </div>
              </a>
              <a 
                href="#privacy" 
                className="py-4 px-5 flex items-center space-x-3 rounded-lg hover:bg-white/10 active:bg-white/20 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                  <Shield size={20} className="text-accent" />
                </div>
                <div>
                  <span className="font-medium">Privacy</span>
                  <p className="text-xs text-gray-400">How we protect your data</p>
                </div>
              </a>
              <a 
                href="#contact" 
                className="py-4 px-5 flex items-center space-x-3 rounded-lg hover:bg-white/10 active:bg-white/20 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-secondary">
                    <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <span className="font-medium">Contact</span>
                  <p className="text-xs text-gray-400">Get in touch with our team</p>
                </div>
              </a>
              <div className="pt-4 mt-2 border-t border-white/10">
                <a 
                  href="#download"
                  className="py-4 bg-secondary hover:bg-secondary/90 active:bg-secondary/80 text-white rounded-xl flex items-center justify-center space-x-3 transition-colors shadow-lg shadow-secondary/20"
                  onClick={() => setIsOpen(false)}
                >
                  <Download size={20} />
                  <span className="font-medium">Get a Demo</span>
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;