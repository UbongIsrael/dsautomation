import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [loaded, setLoaded] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check system preference on mount
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(prefersDark);
    
    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => setIsDark(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    // Trigger staggered reveal animation
    setLoaded(true);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  // Apply theme class to body
  useEffect(() => {
    document.body.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, [isDark]);
  
  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div className="container">
      <div className={`card ${loaded ? 'loaded' : ''}`}>
        {/* Logo mark - top left corner */}
        <div className="logo-mark">
          <img src="/logo.png" alt="DS" />
        </div>
        
        {/* Theme toggle - top right corner */}
        <button 
          className="theme-toggle" 
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
        >
          {isDark ? '◐' : '◑'}
        </button>
        {/* Header section */}
        <header className="card-header">
          <div className="accent-bar"></div>
          <h1 className="headline">
            Join 500+ Freelancers<br />
            Automating Their Busywork
          </h1>
        </header>

        {/* Content section */}
        <section className="card-content">
          <p className="subhead">
            Stop wasting 10+ hours per week on manual tasks. Get free n8n 
            workflows that handle client management, follow-ups, and admin 
            work while you focus on getting paid.
          </p>

          <ul className="benefits">
            <li>
              <span className="bullet-marker">→</span>
              Automation workflows you can set up in under 30 minutes
            </li>
            <li>
              <span className="bullet-marker">→</span>
              Templates for client onboarding, proposals, invoicing, and more
            </li>
            <li>
              <span className="bullet-marker">→</span>
              Daily tips from someone who's automated 90% of their freelance business
            </li>
          </ul>

          <a 
            href="https://t.me/freelanceautohub" 
            className="cta-button"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="cta-text">Join Free Telegram</span>
            <span className="cta-arrow">→</span>
          </a>
        </section>

        {/* Footer */}
        <footer className="card-footer">
          <div className="footer-rule"></div>
          <p className="footer-text">
            No spam. No courses. Just workflows that work.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;