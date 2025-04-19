import '../styles/Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Space Mission Tracker</h3>
            <p>
              Tracking space missions and keeping you informed about the 
              latest developments in space exploration.
            </p>
          </div>
          
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/missions">Missions</a></li>
              <li><a href="/about">About</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Connect</h3>
            <div className="social-links">
              <a href="#" className="social-link">Twitter</a>
              <a href="#" className="social-link">GitHub</a>
              <a href="#" className="social-link">LinkedIn</a>
            </div>
          </div>
        </div>
        
        <div className="copyright">
          <p>&copy; {currentYear} Space Mission Tracker. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer; 