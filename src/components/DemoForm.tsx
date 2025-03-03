import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface DemoFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const DemoForm: React.FC<DemoFormProps> = ({ isOpen, onClose }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    company: '',
    useCase: 'business', // business or personal
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would normally send this data to your backend
    console.log('Form submitted:', formData);
    setFormSubmitted(true);
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
            
            {!formSubmitted ? (
              <>
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gradient mb-2">Get Your Demo</h2>
                  <p className="text-gray-400">
                    Fill out the form below to get access to a personalized demo of navNote
                  </p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1.5 text-gray-300">
                      Email Address <span className="text-secondary">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full py-3 px-4 bg-slate-800/70 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-secondary"
                      placeholder="you@example.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1.5 text-gray-300">
                      Name <span className="text-secondary">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full py-3 px-4 bg-slate-800/70 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-secondary"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium mb-1.5 text-gray-300">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full py-3 px-4 bg-slate-800/70 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-secondary"
                      placeholder="Company Inc."
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="useCase" className="block text-sm font-medium mb-1.5 text-gray-300">
                      Use Case <span className="text-secondary">*</span>
                    </label>
                    <select
                      id="useCase"
                      name="useCase"
                      required
                      value={formData.useCase}
                      onChange={handleChange}
                      className="w-full py-3 px-4 bg-slate-800/70 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-secondary"
                    >
                      <option value="business">Business</option>
                      <option value="personal">Personal</option>
                    </select>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white py-3 px-4 rounded-lg font-medium transition-all shadow-md shadow-blue-900/20"
                  >
                    Request Demo
                  </button>
                  
                  <p className="text-xs text-gray-500 text-center mt-4">
                    By submitting this form, you agree to our <a href="#" className="text-secondary hover:underline">Terms of Service</a> and <a href="#" className="text-secondary hover:underline">Privacy Policy</a>.
                  </p>
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold mb-2">Thank You!</h2>
                <p className="text-gray-400 mb-6">
                  We've received your request for a demo. Our team will reach out to you soon with access to your personalized navNote demo.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DemoForm; 