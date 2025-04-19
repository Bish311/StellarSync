import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import '../styles/Footer.css';

function Footer() {
  // Get current year for copyright
  const currentYear = new Date().getFullYear();
  
  // Get current theme for styling
  const { theme } = useContext(ThemeContext);
  
  return (
    <footer className={`footer ${theme}`}>
      <div className="footer-container">
        {/* Main footer content in three columns */}
        <div className="footer-content">
          {/* About section */}
          <div className="footer-section">
            <h3>Space Mission Tracker</h3>
            <p>
              Tracking space missions and keeping you informed about the 
              latest developments in space exploration.
            </p>
            <div className="footer-brand">
              <span className="footer-tagline">Explore the cosmos with us.</span>
            </div>
          </div>
          
          {/* Quick links section */}
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/missions">Missions</Link></li>
              <li><Link to="/schedule">Launch Schedule</Link></li>
              <li><Link to="/about">About</Link></li>
            </ul>
          </div>
          
          {/* Connect section */}
          <div className="footer-section">
            <h3>Connect</h3>
            <div className="social-links">
              <a href="#" className="social-link">Twitter</a>
              <a href="#" className="social-link">GitHub</a>
              <a href="#" className="social-link">LinkedIn</a>
            </div>
            <div className="contact-info">
              <p>Questions? <a href="mailto:info@spacemissiontracker.com">info@spacemissiontracker.com</a></p>
            </div>
          </div>
        </div>
        
        {/* Copyright section */}
        <div className="copyright">
          <p>&copy; {currentYear} Space Mission Tracker. All rights reserved.</p>
          <p className="credits">Designed with 💙 for space exploration</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer; 