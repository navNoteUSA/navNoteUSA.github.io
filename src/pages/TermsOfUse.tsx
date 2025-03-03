import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface TermsOfUseProps {
  onBack: () => void;
}

const TermsOfUse: React.FC<TermsOfUseProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-white py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <button 
          onClick={onBack}
          className="flex items-center text-blue-400 hover:text-blue-300 transition-colors mb-6"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Home
        </button>
        
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-[var(--text-primary)]">Terms of Use</h1>
        
        <div className="prose prose-invert prose-lg max-w-none">
          <p className="text-gray-300">Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          
          <h2 className="text-xl md:text-2xl font-semibold mt-8 mb-4 text-[var(--text-primary)]">1. Acceptance of Terms</h2>
          <p className="text-gray-300 mb-4">
            By accessing or using the navNote application and website, you agree to be bound by these Terms of Use.
            If you do not agree to these terms, please do not use our service. The Service is available only to individuals
            who are at least 13 years old.
          </p>
          
          <h2 className="text-xl md:text-2xl font-semibold mt-8 mb-4 text-[var(--text-primary)]">2. Description of Service</h2>
          <p className="text-gray-300 mb-4">
            navNote provides an AI-driven task management platform that uses location awareness, context understanding, and time optimization
            to help users manage their tasks and activities. Our Service may include updates, enhancements, new features, and/or the addition
            of any new Web properties, all of which are subject to these Terms of Use.
          </p>
          
          <h2 className="text-xl md:text-2xl font-semibold mt-8 mb-4 text-[var(--text-primary)]">3. User Accounts</h2>
          <p className="text-gray-300 mb-4">
            To use certain features of our Service, you may be required to create an account. You are responsible for maintaining
            the confidentiality of your account information, including your password, and for all activity that occurs under your account.
            You agree to notify us immediately of any unauthorized use of your account or any other breach of security.
          </p>
          
          <h2 className="text-xl md:text-2xl font-semibold mt-8 mb-4 text-[var(--text-primary)]">4. User Content</h2>
          <p className="text-gray-300 mb-4">
            Our Service allows you to create, store, and manage content such as tasks, notes, and personal information.
            You retain all rights to your content, but you grant navNote a worldwide, non-exclusive, royalty-free license to use,
            reproduce, and display such content solely for the purpose of providing the Service to you.
          </p>
          <p className="text-gray-300 mb-4">
            You are solely responsible for the content you create, and you agree not to submit content that:
          </p>
          <ul className="list-disc pl-6 text-gray-300 mb-4 space-y-2">
            <li>Violates any applicable law or regulation</li>
            <li>Infringes on the rights of any third party</li>
            <li>Contains harmful, offensive, or inappropriate material</li>
            <li>Contains malware, viruses, or any other malicious code</li>
          </ul>
          
          <h2 className="text-xl md:text-2xl font-semibold mt-8 mb-4 text-[var(--text-primary)]">5. Location Services</h2>
          <p className="text-gray-300 mb-4">
            The navNote application uses location services to provide location-based task management features.
            By enabling location services for the app, you consent to the collection and use of your location data
            as described in our Privacy Policy. You can disable location services at any time through your device settings,
            but this may limit the functionality of certain features.
          </p>
          
          <h2 className="text-xl md:text-2xl font-semibold mt-8 mb-4 text-[var(--text-primary)]">6. Intellectual Property</h2>
          <p className="text-gray-300 mb-4">
            The Service and its original content, features, and functionality are and will remain the exclusive property of
            navNote and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States
            and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without
            the prior written consent of navNote.
          </p>
          
          <h2 className="text-xl md:text-2xl font-semibold mt-8 mb-4 text-[var(--text-primary)]">7. Limitation of Liability</h2>
          <p className="text-gray-300 mb-4">
            To the maximum extent permitted by law, navNote shall not be liable for any indirect, incidental, special, consequential,
            or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses,
            resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any
            third party on the Service; or (iii) unauthorized access, use, or alteration of your transmissions or content.
          </p>
          
          <h2 className="text-xl md:text-2xl font-semibold mt-8 mb-4 text-[var(--text-primary)]">8. Disclaimer of Warranties</h2>
          <p className="text-gray-300 mb-4">
            Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis.
            The Service is provided without warranties of any kind, whether express or implied, including, but not limited to,
            implied warranties of merchantability, fitness for a particular purpose, non-infringement, or course of performance.
          </p>
          
          <h2 className="text-xl md:text-2xl font-semibold mt-8 mb-4 text-[var(--text-primary)]">9. Governing Law</h2>
          <p className="text-gray-300 mb-4">
            These Terms shall be governed and construed in accordance with the laws of the State of Utah, United States,
            without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms
            will not be considered a waiver of those rights.
          </p>
          
          <h2 className="text-xl md:text-2xl font-semibold mt-8 mb-4 text-[var(--text-primary)]">10. Changes to Terms</h2>
          <p className="text-gray-300 mb-4">
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material
            we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will
            be determined at our sole discretion. By continuing to access or use our Service after any revisions become effective,
            you agree to be bound by the revised terms.
          </p>
          
          <h2 className="text-xl md:text-2xl font-semibold mt-8 mb-4 text-[var(--text-primary)]">11. Contact Us</h2>
          <p className="text-gray-300 mb-4">
            If you have any questions about these Terms, please contact us at:
          </p>
          <ul className="list-none pl-6 text-gray-300 mb-4 space-y-2">
            <li>Email: legal@navNote.net</li>
            <li>Address: Utah, United States</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUse; 