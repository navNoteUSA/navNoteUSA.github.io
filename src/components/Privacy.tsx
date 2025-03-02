import React from 'react';
import { Lock, Shield, FileText, Database, User, BellRing } from 'lucide-react';
import { motion } from 'framer-motion';

const Privacy: React.FC = () => {
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
                <button className="btn-secondary text-sm md:text-base py-2.5 md:py-3 px-4 md:px-6">
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
    </section>
  );
};

export default Privacy; 