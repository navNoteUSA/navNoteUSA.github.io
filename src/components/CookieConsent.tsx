import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface CookieConsentProps {
  onNavigate: (page: string) => void;
}

const CookieConsent: React.FC<CookieConsentProps> = ({ onNavigate }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const hasAcceptedCookies = localStorage.getItem('cookiesAccepted');
    if (!hasAcceptedCookies) {
      // Show cookie banner after a short delay
      const timer = setTimeout(() => {
        setVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setVisible(false);
  };

  const declineCookies = () => {
    // Still mark as seen, but don't enable analytics cookies
    localStorage.setItem('cookiesAccepted', 'false');
    setVisible(false);
  };

  const viewPrivacyPolicy = () => {
    onNavigate('privacy');
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto bg-slate-800/90 backdrop-blur-md border border-slate-700 rounded-lg shadow-lg transition-all duration-300 animate-fade-in-up">
        <div className="relative p-4 md:p-6">
          <button 
            onClick={declineCookies}
            className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
            aria-label="Close cookie consent banner"
          >
            <X size={20} />
          </button>
          
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2 text-[var(--text-primary)]">Cookie Notice</h3>
              <p className="text-sm text-gray-300 mb-2">
                We use cookies to enhance your browsing experience, analyze site traffic, and personalize content.
                By clicking "Accept All", you consent to our use of cookies as described in our 
                <button 
                  onClick={viewPrivacyPolicy}
                  className="text-blue-400 hover:text-blue-300 transition-colors underline mx-1"
                >
                  Privacy Policy
                </button>.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <button
                onClick={declineCookies}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 transition-colors rounded-md text-sm font-medium"
              >
                Decline
              </button>
              <button
                onClick={acceptCookies}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 transition-colors rounded-md text-sm font-medium"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;

// Add this to your global CSS
const globalStyles = `
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.5s ease-out forwards;
}
`; 