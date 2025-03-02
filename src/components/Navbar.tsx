import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="#" className="flex items-center gap-2">
          <img src="/logo.svg" alt="navNote Logo" className="w-8 h-8" />
          <span className="text-xl font-bold text-gradient">navNote</span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-gray-300 hover:text-secondary transition-colors">Features</a>
          <a href="#technology" className="text-gray-300 hover:text-secondary transition-colors">Technology</a>
          <a href="#mission" className="text-gray-300 hover:text-secondary transition-colors">Mission</a>
          <a href="#team" className="text-gray-300 hover:text-secondary transition-colors">Team</a>
          <a href="#contact" className="text-gray-300 hover:text-secondary transition-colors">Contact</a>
          <a 
            href="#waitlist" 
            className="bg-gradient-to-r from-secondary to-accent px-5 py-2 rounded-full font-medium hover:shadow-lg hover:shadow-accent/20 transition-all"
          >
            Join Waitlist
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              <a 
                href="#features" 
                className="text-gray-300 hover:text-secondary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </a>
              <a 
                href="#technology" 
                className="text-gray-300 hover:text-secondary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Technology
              </a>
              <a 
                href="#mission" 
                className="text-gray-300 hover:text-secondary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Mission
              </a>
              <a 
                href="#team" 
                className="text-gray-300 hover:text-secondary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Team
              </a>
              <a 
                href="#contact" 
                className="text-gray-300 hover:text-secondary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
              <a 
                href="#waitlist" 
                className="bg-gradient-to-r from-secondary to-accent px-5 py-2 rounded-full font-medium text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Join Waitlist
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;