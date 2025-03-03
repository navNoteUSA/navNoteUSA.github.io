import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Facebook, Apple } from 'lucide-react';

interface AuthProps {
  isOpen: boolean;
  onClose: () => void;
}

const Auth: React.FC<AuthProps> = ({ isOpen, onClose }) => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Auth form submitted:', formData);
    // Here you would handle authentication
  };

  const toggleAuthMode = () => {
    setIsSignIn(!isSignIn);
    // Reset form data when switching modes
    setFormData({
      email: '',
      password: '',
      name: '',
    });
  };

  // Clicking on backdrop closes the modal
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1.0] }}
            className="bg-slate-900 rounded-2xl p-6 md:p-8 w-full max-w-md relative border border-slate-800"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700/80 transition-colors"
              aria-label="Close"
            >
              <X size={18} />
            </button>
            
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gradient mb-2">
                {isSignIn ? 'Sign In to navNote' : 'Create an Account'}
              </h2>
              <p className="text-gray-400">
                {isSignIn ? 'Welcome back! Please enter your details.' : 'Join navNote to organize your life.'}
              </p>
            </div>
            
            {/* Social login buttons */}
            <div className="flex flex-col space-y-3 mb-6">
              <button 
                className="flex items-center justify-center gap-2 py-3 px-4 border border-slate-700 rounded-lg hover:bg-slate-800 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path 
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" 
                    fill="#4285F4" 
                  />
                  <path 
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" 
                    fill="#34A853" 
                  />
                  <path 
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" 
                    fill="#FBBC05" 
                  />
                  <path 
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" 
                    fill="#EA4335" 
                  />
                </svg>
                <span>Continue with Google</span>
              </button>
              
              <button 
                className="flex items-center justify-center gap-2 py-3 px-4 border border-slate-700 rounded-lg hover:bg-slate-800 transition-colors"
              >
                <Apple size={20} />
                <span>Continue with Apple</span>
              </button>
              
              <button 
                className="flex items-center justify-center gap-2 py-3 px-4 border border-slate-700 rounded-lg hover:bg-slate-800 transition-colors"
              >
                <Facebook size={20} className="text-blue-500" />
                <span>Continue with Facebook</span>
              </button>
            </div>
            
            <div className="relative flex items-center justify-center my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative bg-slate-900 px-4 text-xs text-gray-500 uppercase">
                Or continue with email
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isSignIn && (
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1.5 text-gray-300">
                    Full Name <span className="text-secondary">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User size={16} className="text-gray-500" />
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full py-3 pl-10 pr-4 bg-slate-800/70 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-secondary"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                </div>
              )}
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1.5 text-gray-300">
                  Email Address <span className="text-secondary">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={16} className="text-gray-500" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full py-3 pl-10 pr-4 bg-slate-800/70 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-secondary"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1.5 text-gray-300">
                  Password <span className="text-secondary">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={16} className="text-gray-500" />
                  </div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full py-3 pl-10 pr-4 bg-slate-800/70 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-secondary"
                    placeholder={isSignIn ? "Enter password" : "Create password"}
                    required
                  />
                </div>
              </div>
              
              {isSignIn && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember"
                      name="remember"
                      type="checkbox"
                      className="h-4 w-4 text-secondary focus:ring-secondary border-slate-700 rounded bg-slate-800"
                    />
                    <label htmlFor="remember" className="ml-2 block text-sm text-gray-400">
                      Remember me
                    </label>
                  </div>
                  <a href="#" className="text-sm text-secondary hover:text-accent transition-colors">
                    Forgot password?
                  </a>
                </div>
              )}
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white py-3 px-4 rounded-lg font-medium transition-all shadow-md shadow-blue-900/20 mt-2"
              >
                {isSignIn ? 'Sign In' : 'Create Account'}
              </button>
            </form>
            
            <p className="text-sm text-gray-400 text-center mt-6">
              {isSignIn ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={toggleAuthMode}
                className="text-secondary hover:text-accent transition-colors font-medium"
              >
                {isSignIn ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Auth; 