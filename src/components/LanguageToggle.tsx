import { useState } from 'react';
import './LanguageToggle.css';

interface LanguageToggleProps {
  zh: React.ReactNode;
  en: React.ReactNode;
}

export default function LanguageToggle({ zh, en }: LanguageToggleProps) {
  const [language, setLanguage] = useState<'zh' | 'en'>('zh');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleToggle = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setLanguage(language === 'zh' ? 'en' : 'zh');
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <div className="language-toggle-wrapper">
      <button 
        className="dream-language-btn" 
        onClick={handleToggle}
        aria-label={`Switch to ${language === 'zh' ? 'English' : 'Chinese'}`}
      >
        <span className={`lang-option ${language === 'zh' ? 'active' : ''}`}>中文</span>
        <span className="lang-divider">|</span>
        <span className={`lang-option ${language === 'en' ? 'active' : ''}`}>EN</span>
      </button>
      
      <div className={`dream-language-content ${isTransitioning ? 'transitioning' : ''}`}>
        {language === 'zh' ? zh : en}
      </div>
    </div>
  );
}