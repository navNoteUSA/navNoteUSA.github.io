import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface PrivacyPolicyProps {
  onBack: () => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBack }) => {
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
        
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-[var(--text-primary)]">Privacy Policy</h1>
        
        <div className="prose prose-invert prose-lg max-w-none">
          <p className="text-gray-300">Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          
          <h2 className="text-xl md:text-2xl font-semibold mt-8 mb-4 text-[var(--text-primary)]">1. Introduction</h2>
          <p className="text-gray-300 mb-4">
            At navNote, we are committed to protecting your privacy and ensuring the security of your personal information.
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our
            application and website. Please read this policy carefully to understand our practices regarding your personal data.
          </p>
          
          <h2 className="text-xl md:text-2xl font-semibold mt-8 mb-4 text-[var(--text-primary)]">2. Information We Collect</h2>
          <p className="text-gray-300 mb-4">
            We collect several types of information for various purposes to provide and improve our service to you:
          </p>
          <ul className="list-disc pl-6 text-gray-300 mb-4 space-y-2">
            <li>
              <strong>Personal Data:</strong> While using our Service, we may ask you to provide us with certain personally identifiable information
              that can be used to contact or identify you, including but not limited to your name, email address, and location data (with your explicit permission).
            </li>
            <li>
              <strong>Usage Data:</strong> We may also collect information on how the Service is accessed and used ("Usage Data"). This may include
              information such as your device's Internet Protocol address, browser type, pages of our Service that you visit, the time and date of your visit,
              the time spent on those pages, and other diagnostic data.
            </li>
            <li>
              <strong>Location Data:</strong> For the core functionality of our application, we collect location data. This data is processed on your device and
              is used to provide location-based task suggestions and reminders.
            </li>
          </ul>
          
          <h2 className="text-xl md:text-2xl font-semibold mt-8 mb-4 text-[var(--text-primary)]">3. How We Use Your Information</h2>
          <p className="text-gray-300 mb-4">
            We use the collected data for various purposes:
          </p>
          <ul className="list-disc pl-6 text-gray-300 mb-4 space-y-2">
            <li>To provide and maintain our Service</li>
            <li>To notify you about changes to our Service</li>
            <li>To provide location-based task management features</li>
            <li>To provide customer support</li>
            <li>To gather analysis or valuable information so that we can improve our Service</li>
            <li>To monitor the usage of our Service</li>
            <li>To detect, prevent and address technical issues</li>
          </ul>
          
          <h2 className="text-xl md:text-2xl font-semibold mt-8 mb-4 text-[var(--text-primary)]">4. Data Security</h2>
          <p className="text-gray-300 mb-4">
            The security of your data is important to us. We strive to use commercially acceptable means to protect your Personal Data,
            but remember that no method of transmission over the Internet or method of electronic storage is 100% secure.
          </p>
          
          <h2 className="text-xl md:text-2xl font-semibold mt-8 mb-4 text-[var(--text-primary)]">5. On-Device Processing</h2>
          <p className="text-gray-300 mb-4">
            navNote processes your location data and task information on your device whenever possible. This approach enhances
            privacy by limiting the amount of sensitive information that leaves your device.
          </p>
          
          <h2 className="text-xl md:text-2xl font-semibold mt-8 mb-4 text-[var(--text-primary)]">6. Cookies Policy</h2>
          <p className="text-gray-300 mb-4">
            Our website uses cookies to enhance your browsing experience. Cookies are small text files that are placed on your device
            when you visit our website. We use both session cookies, which expire when you close your browser, and persistent cookies,
            which stay on your device until they expire or are deleted.
          </p>
          <p className="text-gray-300 mb-4">
            We use cookies for the following purposes:
          </p>
          <ul className="list-disc pl-6 text-gray-300 mb-4 space-y-2">
            <li>To enable certain functions of the Service</li>
            <li>To provide analytics</li>
            <li>To store your preferences</li>
          </ul>
          <p className="text-gray-300 mb-4">
            You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However,
            if you do not accept cookies, you may not be able to use some portions of our Service.
          </p>
          
          <h2 className="text-xl md:text-2xl font-semibold mt-8 mb-4 text-[var(--text-primary)]">7. Third-Party Services</h2>
          <p className="text-gray-300 mb-4">
            We may employ third-party companies and individuals to facilitate our Service, provide the Service on our behalf,
            perform Service-related services, or assist us in analyzing how our Service is used. These third parties have access
            to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
          </p>
          
          <h2 className="text-xl md:text-2xl font-semibold mt-8 mb-4 text-[var(--text-primary)]">8. Changes to This Privacy Policy</h2>
          <p className="text-gray-300 mb-4">
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page
            and updating the "last updated" date at the top of this Privacy Policy. You are advised to review this Privacy Policy periodically for any changes.
          </p>
          
          <h2 className="text-xl md:text-2xl font-semibold mt-8 mb-4 text-[var(--text-primary)]">9. Contact Us</h2>
          <p className="text-gray-300 mb-4">
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <ul className="list-none pl-6 text-gray-300 mb-4 space-y-2">
            <li>Email: privacy@navNote.net</li>
            <li>Address: Utah, United States</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy; 