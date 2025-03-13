import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Users } from 'lucide-react';

interface NavbarProps {
  onNavigate: (page: string) => void;
  onOpenDemo: () => void;
  onOpenAuth: (mode: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({
  onNavigate,
  onOpenDemo,
  onOpenAuth
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      isScrolled ? 'py-3 bg-slate-900/90 backdrop-blur-md shadow-lg' : 'py-5 bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer" 
            onClick={() => onNavigate('home')}
          >
            <img 
              src="/navNote_logo.jpeg" 
              alt="navNote Logo" 
              className="h-10 w-auto rounded-full mr-3"
            />
            <span className="text-xl font-bold text-[var(--text-primary)]">navNote</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              <button 
                onClick={() => onNavigate('home')} 
                className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                Home
              </button>
              <button 
                onClick={() => onNavigate('team')} 
                className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors flex items-center"
              >
                <Users size={18} className="mr-1" />
                Team
              </button>
              <button 
                onClick={() => onNavigate('contact')} 
                className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                Contact
              </button>
              
              {/* Add section-specific navigation */}
              <button 
                onClick={() => onNavigate('home#features')} 
                className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                Features
              </button>
              <button 
                onClick={() => onNavigate('home#technology')} 
                className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                Technology
              </button>
            </div>
            
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => onOpenAuth('signup')}
                className="text-[var(--text-secondary)] hover:text-[var(--text-accent)] transition-colors"
              >
                Sign In / Sign Up
              </button>
              <button 
                onClick={onOpenDemo}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-5 py-2 rounded-lg transition-all shadow-glow-sm hover:shadow-glow-md"
              >
                Get a Demo
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-slate-900/95 backdrop-blur-md">
          <div className="container mx-auto px-4 py-4 divide-y divide-slate-800">
            <div className="py-4 flex flex-col space-y-3">
              <button 
                onClick={() => {
                  onNavigate('home');
                  setIsMenuOpen(false);
                }} 
                className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors text-left py-2"
              >
                Home
              </button>
              <button 
                onClick={() => {
                  onNavigate('team');
                  setIsMenuOpen(false);
                }} 
                className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors text-left py-2 flex items-center"
              >
                <Users size={18} className="mr-2" />
                Team
              </button>
              <button 
                onClick={() => {
                  onNavigate('contact');
                  setIsMenuOpen(false);
                }} 
                className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors text-left py-2"
              >
                Contact
              </button>
              
              {/* Add section navigation for mobile */}
              <button 
                onClick={() => {
                  onNavigate('home#features');
                  setIsMenuOpen(false);
                }} 
                className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors text-left py-2"
              >
                Features
              </button>
              <button 
                onClick={() => {
                  onNavigate('home#technology');
                  setIsMenuOpen(false);
                }} 
                className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors text-left py-2"
              >
                Technology
              </button>
            </div>
            
            <div className="flex flex-col space-y-4 pt-4">
              <button 
                onClick={() => {
                  onOpenAuth('signup');
                  setIsMenuOpen(false);
                }}
                className="text-[var(--text-secondary)] hover:text-[var(--text-accent)] transition-colors py-2 text-left"
              >
                Sign In / Sign Up
              </button>
              <button 
                onClick={() => {
                  onOpenDemo();
                  setIsMenuOpen(false);
                }}
                className="bg-gradient-to-r from-[var(--text-gradient-start)] to-[var(--text-gradient-end)] text-[var(--text-primary)] px-5 py-3 rounded-lg shadow-lg"
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