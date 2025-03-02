import React, { useState, useEffect } from 'react';
import { Lock, Shield, FileText, Database, User, BellRing, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface PrivacyProps {
  showFullPolicy?: boolean;
  onClose?: () => void;
}

const Privacy: React.FC<PrivacyProps> = ({ showFullPolicy = false, onClose = () => {} }) => {
  const [showLocalPolicy, setShowLocalPolicy] = useState(false);
  
  // Sync the local state with the prop
  useEffect(() => {
    setShowLocalPolicy(showFullPolicy);
  }, [showFullPolicy]);
  
  const toggleFullPolicy = () => {
    const newState = !showLocalPolicy;
    setShowLocalPolicy(newState);
    
    // If we're closing the modal and there's an onClose prop, call it
    if (!newState && onClose) {
      onClose();
    }
  };
  
  return (
    <section id="privacy" className="py-16 md:py-20 relative overflow-hidden">
      {/* Background hexagon pattern */}
      <div className="absolute inset-0 bg-hex-pattern opacity-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="section-heading text-center text-3xl md:text-5xl">Privacy & Security</h2>
          <p className="section-subheading text-center text-base md:text-xl max-w-2xl mx-auto">
            At navNote, we believe your data is yours. Our privacy-first approach keeps you in control.
          </p>
        </motion.div>
        
        <div className="mt-8 md:mt-12 glass-card p-6 md:p-12 max-w-4xl mx-auto">
          <div className="flex items-center mb-6 md:mb-8">
            <div className="bg-primary p-2 md:p-3 rounded-full mr-3 md:mr-4">
              <Shield className="text-secondary w-5 h-5 md:w-6 md:h-6" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold">Privacy Policy</h3>
          </div>
          
          <div className="space-y-6 md:space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="flex">
                <User className="text-accent w-5 h-5 md:w-6 md:h-6 mr-3 md:mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-lg md:text-xl font-medium mb-1 md:mb-2">Data You Control</h4>
                  <p className="text-sm md:text-base text-gray-300">
                    You control what information you provide, including account info, calendar events, tasks, and locations.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <Database className="text-accent w-5 h-5 md:w-6 md:h-6 mr-3 md:mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-lg md:text-xl font-medium mb-1 md:mb-2">Data Storage</h4>
                  <p className="text-sm md:text-base text-gray-300">
                    Your personal data is securely stored and protected with industry-standard encryption practices.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <BellRing className="text-accent w-5 h-5 md:w-6 md:h-6 mr-3 md:mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-lg md:text-xl font-medium mb-1 md:mb-2">Location Services</h4>
                  <p className="text-sm md:text-base text-gray-300">
                    Location data is only used with your explicit permission and solely to power location-based features.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <Lock className="text-accent w-5 h-5 md:w-6 md:h-6 mr-3 md:mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-lg md:text-xl font-medium mb-1 md:mb-2">Privacy Controls</h4>
                  <p className="text-sm md:text-base text-gray-300">
                    Robust privacy settings let you control exactly what data is collected and how it's used.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="border-t border-white/10 pt-6 md:pt-8">
              <p className="text-sm md:text-base text-gray-300 mb-4">
                Our complete Privacy Policy details how we collect, use, and protect your information. It covers:
              </p>
              
              <ul className="list-disc list-inside space-y-1.5 md:space-y-2 text-sm md:text-base text-gray-300 mb-6">
                <li>Information we collect and why</li>
                <li>How we use your data to provide services</li>
                <li>Your rights regarding your personal information</li>
                <li>Data sharing practices and third-party services</li>
                <li>Security measures to protect your information</li>
                <li>Data retention policies</li>
              </ul>
              
              <div className="flex justify-center">
                <button 
                  className="bg-primary hover:bg-primary/90 text-white text-sm md:text-base py-2.5 md:py-3 px-4 md:px-6 rounded-xl flex items-center transition-colors shadow-lg shadow-primary/20"
                  onClick={toggleFullPolicy}
                >
                  <FileText size={16} className="mr-2" />
                  Read Full Privacy Policy
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 md:mt-16 text-center">
          <p className="text-sm md:text-base text-gray-300 max-w-lg mx-auto">
            If you have questions about our privacy practices, please contact us through our contact form.
          </p>
        </div>
      </div>
      
      {/* Full Privacy Policy Modal */}
      {showLocalPolicy && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-2xl max-w-3xl max-h-[80vh] overflow-y-auto w-full p-6 md:p-8 relative">
            <button 
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors"
              onClick={toggleFullPolicy}
            >
              <X size={20} />
            </button>
            
            <h3 className="text-xl md:text-2xl font-bold mb-6">navNote Privacy Policy</h3>
            
            <div className="prose prose-invert prose-sm md:prose-base max-w-none">
              <p>
                <strong>Last Updated: {new Date().toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'})}</strong>
              </p>
              
              <h4>1. Introduction</h4>
              <p>
                At navNote, we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you use our mobile application ("App") and website.
              </p>
              
              <h4>2. Information We Collect</h4>
              <p>
                We collect the following types of information:
              </p>
              <ul>
                <li><strong>Account Information:</strong> When you create an account, we collect your name, email address, and password.</li>
                <li><strong>Task and Calendar Data:</strong> Information you input about your tasks, appointments, and schedules.</li>
                <li><strong>Location Data:</strong> With your permission, we collect location data to provide location-based features.</li>
                <li><strong>Usage Data:</strong> Information about how you use the App, including interaction patterns and feature usage.</li>
                <li><strong>Device Information:</strong> Information about your mobile device, including model, operating system, and unique identifiers.</li>
              </ul>
              
              <h4>3. How We Use Your Information</h4>
              <p>
                We use your information to:
              </p>
              <ul>
                <li>Provide, maintain, and improve our services</li>
                <li>Personalize your experience</li>
                <li>Process and complete transactions</li>
                <li>Send you technical notices and support messages</li>
                <li>Respond to your comments and questions</li>
                <li>Develop new products and services</li>
                <li>Protect against malicious or fraudulent activity</li>
              </ul>
              
              <h4>4. Data Storage and Protection</h4>
              <p>
                Your personal data is stored securely using industry-standard encryption and protection measures. Most of your data is processed directly on your device, minimizing data transmission to our servers.
              </p>
              
              <h4>5. Data Sharing</h4>
              <p>
                We do not sell your personal information. We may share your information with:
              </p>
              <ul>
                <li><strong>Service Providers:</strong> Third-party vendors who help us provide our services</li>
                <li><strong>Legal Compliance:</strong> When required by law or to protect our rights</li>
                <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
              </ul>
              
              <h4>6. Your Rights</h4>
              <p>
                Depending on your location, you may have rights regarding your personal data, including:
              </p>
              <ul>
                <li>Access to your personal data</li>
                <li>Correction of inaccurate data</li>
                <li>Deletion of your data</li>
                <li>Restriction or objection to certain processing</li>
                <li>Data portability</li>
                <li>Withdrawal of consent</li>
              </ul>
              
              <h4>7. Data Retention</h4>
              <p>
                We retain your personal data for as long as necessary to provide our services or as required by law. You can request deletion of your account and associated data at any time.
              </p>
              
              <h4>8. Updates to This Policy</h4>
              <p>
                We may update this Privacy Policy periodically. We will notify you of significant changes by posting the new policy on our website or through the App.
              </p>
              
              <h4>9. Contact Us</h4>
              <p>
                If you have questions about this Privacy Policy or our privacy practices, please contact us through our contact form on the website.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Privacy; 