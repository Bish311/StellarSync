import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getMissions } from '../services/api';
import '../styles/Missions.css';

function Missions() {
  const { theme } = useContext(ThemeContext);
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  useEffect(() => {
    const fetchMissions = async () => {
      try {
        setLoading(true);
        const missionsData = await getMissions();
        setMissions(missionsData || []);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch missions:', err);
        setError('Failed to load missions. Please try again later.');
        // Use the placeholder data as fallback if API fails
        setMissions([
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
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchMissions();
  }, []);

  // Function to check if a status matches a filter
  const statusMatches = (status, filter) => {
    if (filter === 'all') return true;
    return (status || '').toLowerCase() === filter.toLowerCase();
  };

  // Apply filters to missions
  const filteredMissions = missions.filter(mission => {
    // Safely handle potentially undefined properties
    const name = mission.name || '';
    const agency = mission.agency || '';
    const description = mission.description || '';
    const status = mission.status || '';

    const matchesSearch = 
      name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      agency.toLowerCase().includes(searchTerm.toLowerCase()) ||
      description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Use the custom status matching function
    const matchesStatus = statusMatches(status, statusFilter);
    
    return matchesSearch && matchesStatus;
  });

  // Function to format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown';
    
    try {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid date';
    }
  };
  
  // Function to get status badge class
  const getStatusClass = (status) => {
    if (!status) return '';
    
    const statusLower = status.toLowerCase();
    
    // Map status to appropriate class
    if (statusLower.includes('go') || statusLower.includes('scheduled')) {
      return 'status-scheduled';
    } else if (statusLower.includes('progress') || statusLower.includes('flight')) {
      return 'status-progress';
    } else if (statusLower.includes('success') || statusLower.includes('completed')) {
      return 'status-completed';
    } else if (statusLower.includes('fail')) {
      return 'status-failed';
    } else if (statusLower.includes('hold')) {
      return 'status-hold';
    } else if (statusLower.includes('tbd')) {
      return 'status-tbd';
    } else if (statusLower.includes('planned')) {
      return 'status-planned';
    }
    
    return '';
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
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select 
                  className="mission-filter"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Statuses</option>
                  <option value="Go For Launch">Go For Launch</option>
                  <option value="Scheduled">Scheduled</option>
                  <option value="In Flight">In Flight</option>
                  <option value="Success">Success</option>
                  <option value="Failure">Failure</option>
                  <option value="Hold">Hold</option>
                  <option value="TBD">TBD</option>
                </select>
              </div>
            </div>
            
            {loading ? (
              <div className="loading-container">
                <div className="loader"></div>
                <p>Loading missions data...</p>
              </div>
            ) : error ? (
              <div className="error-container">
                <p className="error-message">{error}</p>
              </div>
            ) : (
              <div className="missions-grid">
                {filteredMissions.length > 0 ? (
                  filteredMissions.map(mission => (
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
                        <Link to={`/missions/${mission.id}`} className="btn-details">View Details</Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-results">
                    <p>No missions match your search criteria.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Missions;