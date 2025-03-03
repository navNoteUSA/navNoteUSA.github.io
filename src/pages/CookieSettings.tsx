import React, { useState, useEffect } from 'react';
import { ArrowLeft, Check } from 'lucide-react';

interface CookieSettingsProps {
  onBack: () => void;
}

const CookieSettings: React.FC<CookieSettingsProps> = ({ onBack }) => {
  const [settings, setSettings] = useState({
    essential: true, // Essential cookies cannot be disabled
    analytics: false,
    preferences: false,
    marketing: false
  });

  useEffect(() => {
    // Load stored preferences
    const cookiePrefs = localStorage.getItem('cookiePreferences');
    if (cookiePrefs) {
      try {
        const parsedPrefs = JSON.parse(cookiePrefs);
        setSettings({
          ...settings,
          ...parsedPrefs
        });
      } catch (e) {
        // If parsing fails, use defaults
        console.error('Error parsing cookie preferences');
      }
    } else {
      // Check if cookies were generally accepted
      const hasAccepted = localStorage.getItem('cookiesAccepted');
      if (hasAccepted === 'true') {
        setSettings({
          essential: true,
          analytics: true,
          preferences: true,
          marketing: false
        });
      }
    }
  }, []);

  const handleToggle = (key: keyof typeof settings) => {
    if (key === 'essential') return; // Essential cookies cannot be toggled
    
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const saveSettings = () => {
    localStorage.setItem('cookiePreferences', JSON.stringify(settings));
    localStorage.setItem('cookiesAccepted', 'true');
    onBack();
  };

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
        
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-[var(--text-primary)]">Cookie Settings</h1>
        
        <div className="prose prose-invert prose-lg max-w-none">
          <p className="text-gray-300 mb-8">
            Manage your cookie preferences. Essential cookies are necessary for the website to function
            properly and cannot be disabled. You can enable or disable other types of cookies below.
          </p>
          
          <div className="space-y-6">
            {/* Essential Cookies */}
            <div className="p-5 bg-slate-900/60 border border-slate-800/80 rounded-lg">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xl font-semibold text-[var(--text-primary)]">Essential Cookies</h3>
                <div className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-medium rounded-full">
                  Always Active
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                These cookies are necessary for the website to function properly and cannot be disabled.
                They are usually only set in response to actions you take such as logging in or filling out forms.
              </p>
            </div>
            
            {/* Analytics Cookies */}
            <div className="p-5 bg-slate-900/60 border border-slate-800/80 rounded-lg">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xl font-semibold text-[var(--text-primary)]">Analytics Cookies</h3>
                <button 
                  onClick={() => handleToggle('analytics')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.analytics ? 'bg-blue-600' : 'bg-slate-700'}`}
                >
                  <span 
                    className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${settings.analytics ? 'translate-x-6' : 'translate-x-1'}`}
                  >
                    {settings.analytics && <Check className="h-3 w-3 text-blue-600" />}
                  </span>
                </button>
              </div>
              <p className="text-gray-400 text-sm">
                These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.
                This helps us improve our website and services.
              </p>
            </div>
            
            {/* Preferences Cookies */}
            <div className="p-5 bg-slate-900/60 border border-slate-800/80 rounded-lg">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xl font-semibold text-[var(--text-primary)]">Preferences Cookies</h3>
                <button 
                  onClick={() => handleToggle('preferences')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.preferences ? 'bg-blue-600' : 'bg-slate-700'}`}
                >
                  <span 
                    className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${settings.preferences ? 'translate-x-6' : 'translate-x-1'}`}
                  >
                    {settings.preferences && <Check className="h-3 w-3 text-blue-600" />}
                  </span>
                </button>
              </div>
              <p className="text-gray-400 text-sm">
                These cookies enable the website to provide enhanced functionality and personalization.
                They may be set by us or by third-party providers whose services we have added to our pages.
              </p>
            </div>
            
            {/* Marketing Cookies */}
            <div className="p-5 bg-slate-900/60 border border-slate-800/80 rounded-lg">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xl font-semibold text-[var(--text-primary)]">Marketing Cookies</h3>
                <button 
                  onClick={() => handleToggle('marketing')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.marketing ? 'bg-blue-600' : 'bg-slate-700'}`}
                >
                  <span 
                    className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${settings.marketing ? 'translate-x-6' : 'translate-x-1'}`}
                  >
                    {settings.marketing && <Check className="h-3 w-3 text-blue-600" />}
                  </span>
                </button>
              </div>
              <p className="text-gray-400 text-sm">
                These cookies track your online activity to help advertisers deliver more relevant advertising
                or to limit how many times you see an ad. These cookies can share that information with other organizations or advertisers.
              </p>
            </div>
          </div>
          
          <div className="mt-10 flex justify-end">
            <button
              onClick={saveSettings}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg text-white font-medium transition-colors"
            >
              Save Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieSettings; 