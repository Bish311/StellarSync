import '../styles/Hero.css';

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Explore Space Missions</h1>
        <p>
          Track current and upcoming space missions, stay informed about
          the latest developments in space exploration, and discover the
          wonders of our universe.
        </p>
        <div className="hero-buttons">
          <button className="btn btn-primary">View Missions</button>
          <button className="btn btn-secondary">Learn More</button>
        </div>
      </div>
      <div className="hero-image">
        {/* The image will be set as a background in CSS */}
      </div>
    </section>
  );
}

export default Hero; 