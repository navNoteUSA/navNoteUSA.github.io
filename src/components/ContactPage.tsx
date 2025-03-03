import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Linkedin } from 'lucide-react';

const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 pt-20 pb-20">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Have questions about navNote? We're here to help you get started with our innovative AI-powered task management solution.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-xl p-8 shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <Mail className="w-5 h-5 text-blue-400 mt-1 mr-4" />
                <div>
                  <h3 className="font-medium mb-1">Email</h3>
                  <div className="space-y-2">
                    <p className="text-gray-300">General Inquiries: <a href="mailto:contact@navNote.net" className="text-blue-400 hover:underline">contact@navNote.net</a></p>
                    <p className="text-gray-300">Sales & Partnerships: <a href="mailto:sales@navNote.net" className="text-blue-400 hover:underline">sales@navNote.net</a></p>
                    <p className="text-gray-300">Support & Info: <a href="mailto:info@navNote.net" className="text-blue-400 hover:underline">info@navNote.net</a></p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone className="w-5 h-5 text-blue-400 mt-1 mr-4" />
                <div>
                  <h3 className="font-medium mb-1">Phone</h3>
                  <p className="text-gray-300"><a href="tel:+13852880722" className="hover:text-blue-400">(385) 288-0722</a></p>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-blue-400 mt-1 mr-4" />
                <div>
                  <h3 className="font-medium mb-1">Location</h3>
                  <p className="text-gray-300">navNote LLC</p>
                  <p className="text-gray-300">Utah, USA</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Linkedin className="w-5 h-5 text-blue-400 mt-1 mr-4" />
                <div>
                  <h3 className="font-medium mb-1">LinkedIn</h3>
                  <p className="text-gray-300">
                    <a 
                      href="https://www.linkedin.com/company/navnote/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline"
                    >
                      navNote LinkedIn
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-xl p-8 shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">Your Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                <textarea 
                  id="message" 
                  rows={5}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-lg shadow-blue-600/20"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage; 