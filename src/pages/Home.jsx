import { useState } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import AstronomyPicture from '../components/AstronomyPicture';
import '../styles/Home.css';

function Home() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Newsletter subscription coming soon! Thank you for your interest.');
    setEmail('');
  };

  return (
    <div className="home-page">
      <Header />
      <main>
        <Hero />
        
        {/* Astronomy Picture of the Day */}
        <section className="apod-section">
          <AstronomyPicture />
        </section>
        
        {/* Features section - What we offer */}
        <section className="features">
          <div className="features-container">
            <h2>What We Offer</h2>
            <div className="feature-grid">
              {/* Live mission tracking feature */}
              <div className="feature-card">
                <div className="feature-icon">🚀</div>
                <h3>Live Mission Tracking</h3>
                <p>Get real-time updates on current space missions from agencies around the world.</p>
                <a href="/missions" className="feature-link">Explore missions</a>
              </div>
              
              {/* Launch schedule feature */}
              <div className="feature-card">
                <div className="feature-icon">📅</div>
                <h3>Launch Schedule</h3>
                <p>Stay informed about upcoming launches with our comprehensive schedule.</p>
                <a href="/missions" className="feature-link">View launches</a>
              </div>
              
              {/* Mission archives feature */}
              <div className="feature-card">
                <div className="feature-icon">🌌</div>
                <h3>Mission Archives</h3>
                <p>Explore the history of space exploration through our detailed mission archives.</p>
                <a href="/missions" className="feature-link">Browse missions</a>
              </div>
            </div>
          </div>
        </section>
        
        {/* Newsletter signup section */}
        <section className="newsletter">
          <div className="newsletter-container">
            <h2>Stay Updated</h2>
            <p>Subscribe to our newsletter to receive the latest updates on space missions and launches.</p>
            <form className="newsletter-form" onSubmit={handleSubmit}>
              <input 
                type="email" 
                placeholder="Your email address" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" className="btn btn-primary">Subscribe</button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Home; 