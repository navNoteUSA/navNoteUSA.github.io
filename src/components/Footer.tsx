import React from 'react';
import { ArrowUp, Mail, Instagram, Twitter, GitHub } from 'lucide-react';

interface FooterProps {
  onOpenPrivacyPolicy: () => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenPrivacyPolicy }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  const openTermsModal = () => {
    alert('Terms of Service document will open here. Feature coming soon.');
  };
  
  return (
    <footer className="bg-black py-12 md:py-16 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 mb-12">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <div className="mb-4">
              <span className="text-xl font-bold text-gradient">navNote</span>
            </div>
            <p className="text-sm md:text-base text-slate-400 max-w-xs">
              An AI-powered location-aware task management app that revolutionizes how you organize your life.
            </p>
            <div className="flex space-x-3 mt-6">
              <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors">
                <Twitter size={16} className="text-white" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram size={16} className="text-white" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors">
                <GitHub size={16} className="text-white" />
              </a>
            </div>
          </div>
          
          {/* Product Column */}
          <div className="col-span-1">
            <h3 className="text-base md:text-lg font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-sm md:text-base">
              <li>
                <a href="#features" className="text-slate-400 hover:text-white transition-colors">Features</a>
              </li>
              <li>
                <a href="#technology" className="text-slate-400 hover:text-white transition-colors">Technology</a>
              </li>
              <li>
                <a href="#privacy" className="text-slate-400 hover:text-white transition-colors">Privacy</a>
              </li>
              <li>
                <a href="#demo" className="text-slate-400 hover:text-white transition-colors">Get a Demo</a>
              </li>
            </ul>
          </div>
          
          {/* Company Column */}
          <div className="col-span-1">
            <h3 className="text-base md:text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm md:text-base">
              <li>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">About Us</a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">Careers</a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">Press</a>
              </li>
              <li>
                <a href="#contact" className="text-slate-400 hover:text-white transition-colors">Contact</a>
              </li>
            </ul>
          </div>
          
          {/* Legal Column */}
          <div className="col-span-1">
            <h3 className="text-base md:text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm md:text-base">
              <li>
                <button 
                  onClick={openTermsModal}
                  className="text-slate-400 hover:text-white transition-colors text-left"
                >
                  Terms
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenPrivacyPolicy}
                  className="text-slate-400 hover:text-white transition-colors text-left"
                >
                  Privacy
                </button>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">Cookies</a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">Licenses</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs md:text-sm text-slate-500 mb-4 md:mb-0">
            © {new Date().getFullYear()} navNote. All rights reserved.
          </p>
          
          <div className="flex items-center space-x-4">
            <a 
              href="#" 
              className="scroll-to-top-btn w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
            >
              <ArrowUp size={18} className="text-primary" />
            </a>
            <a href="#contact" className="text-xs md:text-sm text-slate-400 hover:text-white transition-colors">
              <Mail size={16} className="inline mr-2" />
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;