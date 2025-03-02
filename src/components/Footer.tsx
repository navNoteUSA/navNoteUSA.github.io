import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Twitter, Facebook, Instagram, Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="py-16 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark to-primary/80"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo.svg" alt="navNote Logo" className="w-8 h-8" />
              <span className="text-xl font-bold text-gradient">navNote</span>
            </div>
            <p className="text-gray-400 mb-4">
              The AI-powered virtual memory that intelligently adapts to your life.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://www.linkedin.com/company/navnote" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 glass rounded-full hover:bg-accent/20 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a 
                href="#" 
                className="p-2 glass rounded-full hover:bg-accent/20 transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a 
                href="#" 
                className="p-2 glass rounded-full hover:bg-accent/20 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="#" 
                className="p-2 glass rounded-full hover:bg-accent/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li><a href="#features" className="text-gray-400 hover:text-secondary transition-colors">Features</a></li>
              <li><a href="#" className="text-gray-400 hover:text-secondary transition-colors">Pricing</a></li>
              <li><a href="#" className="text-gray-400 hover:text-secondary transition-colors">Roadmap</a></li>
              <li><a href="#waitlist" className="text-gray-400 hover:text-secondary transition-colors">Beta Program</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#mission" className="text-gray-400 hover:text-secondary transition-colors">About</a></li>
              <li><a href="#" className="text-gray-400 hover:text-secondary transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-secondary transition-colors">Careers</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-secondary transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">info@navnote.net</li>
              <li className="text-gray-400">Ogden, Utah, USA</li>
              <li className="text-gray-400">(385) 288-0722</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 navNote LLC. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 text-sm hover:text-secondary transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 text-sm hover:text-secondary transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;