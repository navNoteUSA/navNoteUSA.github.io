import React from 'react';
import { Lock, Shield, FileText, Database, User, BellRing } from 'lucide-react';
import { motion } from 'framer-motion';

const Privacy: React.FC = () => {
  return (
    <section id="privacy" className="py-20 relative overflow-hidden">
      {/* Background hexagon pattern */}
      <div className="absolute inset-0 bg-hex-pattern opacity-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="section-heading text-center">Privacy & Security</h2>
          <p className="section-subheading text-center">
            At navNote, we believe your data is yours. Our privacy-first approach keeps you in control.
          </p>
        </motion.div>
        
        <div className="mt-12 glass-card p-8 md:p-12 max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <div className="bg-primary p-3 rounded-full mr-4">
              <Shield className="text-secondary w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold">Privacy Policy</h3>
          </div>
          
          <div className="space-y-8">
            <div className="feature-grid grid md:grid-cols-2 gap-8">
              <div className="flex">
                <User className="text-accent w-6 h-6 mr-4 flex-shrink-0" />
                <div>
                  <h4 className="text-xl font-medium mb-2">Data You Control</h4>
                  <p className="text-gray-300">
                    You control what information you provide, including account info, calendar events, tasks, and locations.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <Database className="text-accent w-6 h-6 mr-4 flex-shrink-0" />
                <div>
                  <h4 className="text-xl font-medium mb-2">Data Storage</h4>
                  <p className="text-gray-300">
                    Your personal data is securely stored and protected with industry-standard encryption practices.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <BellRing className="text-accent w-6 h-6 mr-4 flex-shrink-0" />
                <div>
                  <h4 className="text-xl font-medium mb-2">Location Services</h4>
                  <p className="text-gray-300">
                    Location data is only used with your explicit permission and solely to power location-based features.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <Lock className="text-accent w-6 h-6 mr-4 flex-shrink-0" />
                <div>
                  <h4 className="text-xl font-medium mb-2">Privacy Controls</h4>
                  <p className="text-gray-300">
                    Robust privacy settings let you control exactly what data is collected and how it's used.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="border-t border-white/10 pt-8">
              <p className="text-gray-300 mb-4">
                Our complete Privacy Policy details how we collect, use, and protect your information. It covers:
              </p>
              
              <ul className="list-disc list-inside space-y-2 text-gray-300 mb-6">
                <li>Information we collect and why</li>
                <li>How we use your data to provide services</li>
                <li>Your rights regarding your personal information</li>
                <li>Data sharing practices and third-party services</li>
                <li>Security measures to protect your information</li>
                <li>Data retention policies</li>
              </ul>
              
              <div className="flex justify-center">
                <button className="btn-secondary">
                  <FileText size={18} className="mr-2" />
                  Read Full Privacy Policy
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-gray-300 max-w-lg mx-auto">
            If you have questions about our privacy practices, please contact us at:<br />
            <a href="mailto:navNoteHQ@gmail.com" className="text-secondary hover:underline">navNoteHQ@gmail.com</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Privacy; 