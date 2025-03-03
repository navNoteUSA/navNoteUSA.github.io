import React from 'react';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/50 pt-16 pb-8 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Company info */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-4">
              <img 
                src="/navNote_logo.jpeg" 
                alt="navNote Logo" 
                className="h-10 w-auto rounded-full mr-3"
              />
              <span className="text-xl font-bold">navNote</span>
            </div>
            
            <p className="text-gray-400 mb-6">
              Revolutionizing task management with AI that understands context, time, and location.
            </p>
            
            <div className="flex space-x-4">
              <a href="https://github.com" className="text-gray-400 hover:text-white transition-colors" aria-label="GitHub">
                <Github size={20} />
              </a>
              <a href="https://x.com/navNoteHQ" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="https://www.linkedin.com/company/navnote/" className="text-gray-400 hover:text-white transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => onNavigate('home')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('team')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Our Team
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('contact')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>
          
          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => onNavigate('privacy')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('terms')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Terms of Use
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('cookies')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Cookie Settings
                </button>
              </li>
              <li className="flex items-start mt-6">
                <Mail size={18} className="text-gray-400 mr-2 mt-1" />
                <span className="text-gray-400">info@navNote.net</span>
              </li>
              <li className="text-gray-400">
                Utah, United States
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800/50 pt-8 mt-8 text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} navNote. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <button 
              onClick={() => onNavigate('privacy')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button 
              onClick={() => onNavigate('terms')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Terms of Use
            </button>
            <button 
              onClick={() => onNavigate('cookies')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Cookies
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;