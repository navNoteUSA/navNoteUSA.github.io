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

  useEffect(() => {
    // Prevent body scrolling when menu is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
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
      </header>

      {/* Mobile Menu - Fixed at top of screen */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed top-0 left-0 right-0 bottom-0 z-50 flex flex-col bg-black bg-opacity-95 backdrop-blur-lg"
          >
            <div className="container mx-auto px-4 border-b border-white/10">
              <div className="flex items-center justify-between h-20">
                {/* Logo */}
                <div className="flex items-center">
                  <a href="#" className="flex items-center">
                    <span className="text-2xl font-bold text-gradient">navNote</span>
                  </a>
                </div>
                
                {/* Close Button */}
                <button
                  onClick={toggleMenu}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  aria-label="Close menu"
                >
                  <X size={24} />
                </button>
              </div>
            </div>
            
            <nav className="container mx-auto px-4 py-6 overflow-y-auto flex-1">
              <div className="flex flex-col space-y-3">
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
                
                {/* Continue with other navigation items */}
                <a 
                  href="#technology" 
                  className="py-4 px-5 flex items-center space-x-3 rounded-lg hover:bg-white/10 active:bg-white/20 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Shield size={20} className="text-blue-400" />
                  </div>
                  <div>
                    <span className="font-medium">Technology</span>
                    <p className="text-xs text-gray-400">Learn about our AI-powered stack</p>
                  </div>
                </a>
                
                <a 
                  href="#privacy" 
                  className="py-4 px-5 flex items-center space-x-3 rounded-lg hover:bg-white/10 active:bg-white/20 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <Shield size={20} className="text-purple-400" />
                  </div>
                  <div>
                    <span className="font-medium">Privacy</span>
                    <p className="text-xs text-gray-400">Your data, protected</p>
                  </div>
                </a>
                
                <a 
                  href="#contact" 
                  className="py-4 px-5 flex items-center space-x-3 rounded-lg hover:bg-white/10 active:bg-white/20 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                    <Mail size={20} className="text-green-400" />
                  </div>
                  <div>
                    <span className="font-medium">Contact</span>
                    <p className="text-xs text-gray-400">Get in touch with our team</p>
                  </div>
                </a>
              </div>
              
              <div className="mt-8 p-5 bg-white/5 rounded-xl border border-white/10">
                <a 
                  href="#demo" 
                  className="w-full bg-secondary text-white py-3 rounded-lg hover:bg-secondary/90 transition-colors flex items-center justify-center gap-2"
                  onClick={() => setIsOpen(false)}
                >
                  <Download size={18} />
                  Get a Demo
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;