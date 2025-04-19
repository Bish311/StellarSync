import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Missions.css';

function Missions() {
  const { theme } = useContext(ThemeContext);
  
  // Sample mission data (will be replaced with API data in Phase 3)
  const missions = [
    {
      id: 1,
      name: 'Artemis III',
      agency: 'NASA',
      launchDate: '2025-12-01',
      status: 'Scheduled',
      description: 'Human landing on the lunar South Pole, the first crewed lunar landing since Apollo 17.'
    },
    {
      id: 2,
      name: 'Europa Clipper',
      agency: 'NASA',
      launchDate: '2024-10-10',
      status: 'Scheduled',
      description: 'Mission to conduct detailed reconnaissance of Jupiter\'s moon Europa.'
    },
    {
      id: 3,
      name: 'ExoMars',
      agency: 'ESA/Roscosmos',
      launchDate: '2028-09-01',
      status: 'Planned',
      description: 'Searching for signs of past life on Mars and investigating the Martian atmosphere.'
    },
    {
      id: 4,
      name: 'Starship Orbital Test',
      agency: 'SpaceX',
      launchDate: '2023-07-15',
      status: 'Completed',
      description: 'First orbital test flight of the Starship spacecraft system.'
    },
    {
      id: 5,
      name: 'JUICE',
      agency: 'ESA',
      launchDate: '2023-04-14',
      status: 'In Progress',
      description: 'The JUpiter ICy moons Explorer is performing detailed observations of Jupiter and its three largest moons.'
    },
    {
      id: 6,
      name: 'OSIRIS-REx Sample Return',
      agency: 'NASA',
      launchDate: '2023-09-24',
      status: 'Completed',
      description: 'Return of samples collected from asteroid Bennu to Earth.'
    }
  ];

  // Function to format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Function to get status badge class
  const getStatusClass = (status) => {
    switch(status.toLowerCase()) {
      case 'scheduled': return 'status-scheduled';
      case 'in progress': return 'status-progress';
      case 'completed': return 'status-completed';
      case 'planned': return 'status-planned';
      default: return '';
    }
  };

  return (
    <div className={`missions-page ${theme}`}>
      <Header />
      <main className="missions-main">
        <section className="missions-hero">
          <div className="missions-hero-content">
            <h1>Space Missions</h1>
            <p>Explore current and upcoming missions from space agencies around the world.</p>
          </div>
        </section>
        
        <section className="missions-dashboard">
          <div className="container">
            <div className="missions-controls">
              <div className="search-filter">
                <input 
                  type="text" 
                  placeholder="Search missions..." 
                  className="mission-search"
                />
                <select className="mission-filter">
                  <option value="all">All Statuses</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="in progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="planned">Planned</option>
                </select>
              </div>
            </div>
            
            <div className="missions-grid">
              {missions.map(mission => (
                <div key={mission.id} className="mission-card">
                  <div className="mission-header">
                    <h3>{mission.name}</h3>
                    <span className={`mission-status ${getStatusClass(mission.status)}`}>
                      {mission.status}
                    </span>
                  </div>
                  <div className="mission-details">
                    <p className="mission-agency">{mission.agency}</p>
                    <p className="mission-date">
                      <span>Launch:</span> {formatDate(mission.launchDate)}
                    </p>
                    <p className="mission-description">{mission.description}</p>
                  </div>
                  <div className="mission-actions">
                    <button className="btn-details">View Details</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Missions; 