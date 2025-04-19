import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import '../styles/Hero.css';

function Hero() {
  // Get current theme to adjust hero content styling
  const { theme } = useContext(ThemeContext);
  
  return (
    <section className={`hero ${theme}`}>
      <div className="hero-content">
        <h1>Explore Space Missions</h1>
        <p>
          Track current and upcoming space missions, stay informed about
          the latest developments in space exploration, and discover the
          wonders of our universe.
        </p>
        <div className="hero-buttons">
          <a href="/missions" className="btn btn-primary">
            View Missions
            <span className="btn-icon">→</span>
          </a>
          <a href="/about" className="btn btn-secondary">
            Learn More
          </a>
        </div>
        
        {/* Mission stats */}
        <div className="mission-stats">
          <div className="stat">
            <span className="stat-number">120+</span>
            <span className="stat-label">Active Missions</span>
          </div>
          <div className="stat">
            <span className="stat-number">50+</span>
            <span className="stat-label">Space Agencies</span>
          </div>
          <div className="stat">
            <span className="stat-number">24/7</span>
            <span className="stat-label">Live Updates</span>
          </div>
        </div>
      </div>
      
      <div className="hero-image">
        {/* Floating elements for visual interest */}
        <div className="floating-element satellite"></div>
        <div className="floating-element rocket"></div>
        <div className="floating-element planet"></div>
      </div>
    </section>
  );
}

export default Hero; 