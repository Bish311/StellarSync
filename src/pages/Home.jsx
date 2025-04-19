import Header from '../components/Header';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import '../styles/Home.css';

function Home() {
  return (
    <div className="home-page">
      <Header />
      <main>
        <Hero />
        <section className="features">
          <div className="features-container">
            <h2>What We Offer</h2>
            <div className="feature-grid">
              <div className="feature-card">
                <div className="feature-icon">🚀</div>
                <h3>Live Mission Tracking</h3>
                <p>Get real-time updates on current space missions from agencies around the world.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">📅</div>
                <h3>Launch Schedule</h3>
                <p>Stay informed about upcoming launches with our comprehensive schedule.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🌌</div>
                <h3>Mission Archives</h3>
                <p>Explore the history of space exploration through our detailed mission archives.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Home; 