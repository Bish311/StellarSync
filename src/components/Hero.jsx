import { useContext, useState, useEffect } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { getUpcomingLaunches, getPreviousLaunches } from '../services/api';
import '../styles/Hero.css';

function Hero() {
  // Get current theme to adjust hero content styling
  const { theme } = useContext(ThemeContext);
  const [stats, setStats] = useState({
    upcomingMissions: '10+',
    recentMissions: '20+',
    agencies: '15+'
  });
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchMissionStats = async () => {
      try {
        setLoading(true);
        
        // Fetch upcoming and previous launches
        const [upcoming, previous] = await Promise.all([
          getUpcomingLaunches(),
          getPreviousLaunches()
        ]);
        
        // Extract unique agencies
        const agencies = new Set();
        
        // Add agencies from upcoming launches
        upcoming.results.forEach(launch => {
          if (launch.launch_service_provider?.name) {
            agencies.add(launch.launch_service_provider.name);
          }
        });
        
        // Add agencies from previous launches
        previous.results.forEach(launch => {
          if (launch.launch_service_provider?.name) {
            agencies.add(launch.launch_service_provider.name);
          }
        });
        
        // Update stats
        setStats({
          upcomingMissions: upcoming.results.length.toString(),
          recentMissions: previous.results.length.toString(),
          agencies: agencies.size.toString()
        });
      } catch (error) {
        console.error('Error fetching mission stats:', error);
        // Keep default stats on error
      } finally {
        setLoading(false);
      }
    };
    
    fetchMissionStats();
  }, []);
  
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
            <span className="stat-number">{stats.upcomingMissions}</span>
            <span className="stat-label">Upcoming Missions</span>
          </div>
          <div className="stat">
            <span className="stat-number">{stats.recentMissions}</span>
            <span className="stat-label">Recent Missions</span>
          </div>
          <div className="stat">
            <span className="stat-number">{stats.agencies}</span>
            <span className="stat-label">Space Agencies</span>
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