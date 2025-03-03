import React, { useState, useEffect } from 'react';
import { Menu, X, Users } from 'lucide-react';

interface NavbarProps {
  openDemoForm?: () => void;
  openAuthForm?: () => void;
  navigateTo: (page: 'home' | 'team' | 'contact') => void;
  currentPage: 'home' | 'team' | 'contact';
}

const Navbar: React.FC<NavbarProps> = ({ openDemoForm, openAuthForm, navigateTo, currentPage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Check if mobile on mount and when window resizes
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    handleResize();
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  
  return (
    <nav className={`fixed w-full top-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-slate-900/80 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <a 
              href="#" 
              className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-600 to-cyan-400 mr-10"
              onClick={(e) => {
                e.preventDefault();
                navigateTo('home');
                closeMenu();
              }}
            >
              navNote
            </a>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-10 text-gray-300 font-medium">
            <a 
              href="#" 
              className={`hover:text-white transition-colors ${currentPage === 'home' ? 'text-white' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                navigateTo('home');
              }}
            >
              Home
            </a>
            <a 
              href="#" 
              className={`hover:text-white transition-colors ${currentPage === 'team' ? 'text-white' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                navigateTo('team');
              }}
            >
              Team
            </a>
            <a 
              href="#" 
              className={`hover:text-white transition-colors ${currentPage === 'contact' ? 'text-white' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                navigateTo('contact');
              }}
            >
              Contact
            </a>
          </div>
          
          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={openAuthForm}
              className="flex items-center text-gray-300 hover:text-white transition-colors"
            >
              <Users size={18} className="mr-2" />
              Sign In / Sign Up
            </button>
            <button 
              onClick={openDemoForm}
              className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white px-4 py-2 rounded-lg font-medium shadow-glow-sm"
            >
              Get a Demo
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleMenu}
              className="text-gray-300 hover:text-white transition-colors focus:outline-none"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <X size={24} />
              ) : (
                <Menu size={24} />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800">
          <div className="container mx-auto px-4 py-4 space-y-3">
            <a 
              href="#" 
              className={`block py-2 ${currentPage === 'home' ? 'text-white font-medium' : 'text-gray-300'}`}
              onClick={(e) => {
                e.preventDefault();
                navigateTo('home');
                closeMenu();
              }}
            >
              Home
            </a>
            <a 
              href="#" 
              className={`block py-2 ${currentPage === 'team' ? 'text-white font-medium' : 'text-gray-300'}`}
              onClick={(e) => {
                e.preventDefault();
                navigateTo('team');
                closeMenu();
              }}
            >
              Team
            </a>
            <a 
              href="#" 
              className={`block py-2 ${currentPage === 'contact' ? 'text-white font-medium' : 'text-gray-300'}`}
              onClick={(e) => {
                e.preventDefault();
                navigateTo('contact');
                closeMenu();
              }}
            >
              Contact
            </a>
            <div className="pt-2">
              <button 
                onClick={() => {
                  if (openAuthForm) openAuthForm();
                  closeMenu();
                }}
                className="w-full bg-slate-800 text-white py-2 rounded-lg mb-2 flex items-center justify-center"
              >
                <Users size={18} className="mr-2" />
                Sign In / Sign Up
              </button>
              <button 
                onClick={() => {
                  if (openDemoForm) openDemoForm();
                  closeMenu();
                }}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white py-2 rounded-lg font-medium"
              >
                Get a Demo
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;