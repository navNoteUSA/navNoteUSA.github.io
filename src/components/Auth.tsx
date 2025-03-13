import React, { useState, useEffect } from 'react';
import { X, Mail, Lock, User } from 'lucide-react';
import { authAPI } from '../services/api';

interface AuthProps {
  isOpen: boolean;
  onClose: () => void;
  authMode?: 'signin' | 'signup';
}

const Auth: React.FC<AuthProps> = ({ isOpen, onClose, authMode = 'signin' }) => {
  console.log('Auth component rendered with props:', { isOpen, authMode });
  
  const [isSignIn, setIsSignIn] = useState(authMode === 'signin');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Update isSignIn when authMode changes
  useEffect(() => {
    console.log('authMode changed to:', authMode);
    setIsSignIn(authMode === 'signin');
  }, [authMode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      let response;
      console.log('Attempting to authenticate with:', isSignIn ? 'login' : 'register', formData);
      
      if (isSignIn) {
        response = await authAPI.login({
          email: formData.email,
          password: formData.password,
        });
      } else {
        response = await authAPI.register({
          email: formData.email,
          password: formData.password,
          name: formData.name,
        });
      }

      console.log('Authentication response:', response);

      // Store tokens
      if (response.access && response.refresh) {
        // Direct token format
        localStorage.setItem('access_token', response.access);
        localStorage.setItem('refresh_token', response.refresh);
      } else if (response.tokens && response.tokens.access && response.tokens.refresh) {
        // Nested token format
        localStorage.setItem('access_token', response.tokens.access);
        localStorage.setItem('refresh_token', response.tokens.refresh);
      } else {
        console.error('Unexpected token format:', response);
        throw new Error('Invalid token format in response');
      }
      
      console.log('Tokens stored in localStorage:', {
        access: localStorage.getItem('access_token'),
        refresh: localStorage.getItem('refresh_token')
      });
      
      // Dispatch event to notify other components about auth status change
      window.dispatchEvent(new CustomEvent('authStatusChanged'));
      console.log('Auth status change event dispatched');

      // Close modal and reset form
      onClose();
      setFormData({
        email: '',
        password: '',
        name: '',
      });
    } catch (err: any) {
      console.error('Authentication error:', err);
      setError(err.response?.data?.error || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
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

  // If the modal is not open, don't render anything
  if (!isOpen) {
    return null;
  }

  return (
    <div 
      className="modal-overlay"
      onClick={handleBackdropClick}
    >
      <div 
        className="modal-content"
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
        
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm">
            {error}
          </div>
        )}
        
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
                  disabled={isLoading}
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
                disabled={isLoading}
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
                disabled={isLoading}
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
            disabled={isLoading}
            className={`w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white py-3 px-4 rounded-lg font-medium transition-all shadow-md shadow-blue-900/20 mt-2 ${
              isLoading ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Please wait...' : (isSignIn ? 'Sign In' : 'Create Account')}
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
      </div>
    </div>
  );
};

export default Auth; 