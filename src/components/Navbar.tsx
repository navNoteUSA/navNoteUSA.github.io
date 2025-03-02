import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Menu, X } from 'lucide-react';

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
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-gray-900/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container-custom py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <BrainCircuit className="h-8 w-8 text-primary-500" />
          <span className="text-2xl font-display font-bold gradient-text">navNote</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
          <a href="#technology" className="text-gray-300 hover:text-white transition-colors">Technology</a>
          <a href="#team" className="text-gray-300 hover:text-white transition-colors">Team</a>
          <a href="#partners" className="text-gray-300 hover:text-white transition-colors">Partners</a>
          <a href="#contact" className="btn-primary">Join Waitlist</a>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-300 hover:text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.div 
          className="md:hidden bg-gray-900 shadow-lg"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container-custom py-4 flex flex-col gap-4">
            <a 
              href="#features" 
              className="text-gray-300 hover:text-white transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </a>
            <a 
              href="#technology" 
              className="text-gray-300 hover:text-white transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Technology
            </a>
            <a 
              href="#team" 
              className="text-gray-300 hover:text-white transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Team
            </a>
            <a 
              href="#partners" 
              className="text-gray-300 hover:text-white transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Partners
            </a>
            <a 
              href="#contact" 
              className="btn-primary text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Join Waitlist
            </a>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Navbar;