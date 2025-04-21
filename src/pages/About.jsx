import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/About.css';

function About() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`about-page ${theme}`}>
      <Header />
      <main className="about-main">
        <section className="about-hero">
          <div className="about-hero-content">
            <h1>About StellarSync</h1>
            <p>Your window to the universe of space exploration</p>
          </div>
        </section>
        
        <section className="about-content">
          <div className="container">
            <div className="about-grid">
              <div className="about-info">
                <h2>Our Mission</h2>
                <p>
                  StellarSync was created to provide space enthusiasts, students, and curious minds 
                  with a comprehensive platform to track and learn about current and upcoming space missions 
                  from agencies around the world.
                </p>
                <p>
                  In an era of renewed interest in space exploration, our goal is to make information about 
                  these exciting missions accessible to everyone, fostering a greater understanding and 
                  appreciation of humanity's endeavors beyond Earth.
                </p>
                
                <h2>What We Offer</h2>
                <ul className="about-features">
                  <li>
                    <span className="feature-icon">🚀</span>
                    <div>
                      <h3>Real-time Mission Tracking</h3>
                      <p>Get up-to-date information on space missions from agencies worldwide.</p>
                    </div>
                  </li>
                  <li>
                    <span className="feature-icon">📅</span>
                    <div>
                      <h3>Launch Schedules</h3>
                      <p>Stay informed about upcoming rocket launches and mission deployments.</p>
                    </div>
                  </li>
                  <li>
                    <span className="feature-icon">🌌</span>
                    <div>
                      <h3>Historical Archives</h3>
                      <p>Explore the rich history of space exploration through our detailed mission archives.</p>
                    </div>
                  </li>
                  <li>
                    <span className="feature-icon">🔔</span>
                    <div>
                      <h3>Launch Notifications</h3>
                      <p>Never miss a significant space event with our notification system.</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="about-team">
                <h2>Who We Are</h2>
                <p>
                  StellarSync is a passion project created by space enthusiasts who believe in the 
                  importance of space exploration and its potential to inspire future generations.
                </p>
                <p>
                  Our team is committed to providing accurate, timely information about space missions while 
                  making the wonders of space exploration accessible to everyone.
                </p>
                
                <div className="about-cta">
                  <h3>Join Us in Exploring the Cosmos</h3>
                  <p>
                    Whether you're a space enthusiast, a student, or just curious about what's happening 
                    beyond our atmosphere, StellarSync is your gateway to the stars.
                  </p>
                  <a href="/missions" className="btn btn-primary">Explore Missions</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default About; 