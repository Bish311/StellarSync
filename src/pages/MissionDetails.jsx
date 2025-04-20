import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getLaunchById } from '../services/api';
import '../styles/MissionDetails.css';

function MissionDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const [mission, setMission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMissionDetails = async () => {
      try {
        setLoading(true);
        const missionData = await getLaunchById(id);
        setMission(missionData);
        setError(null);
      } catch (err) {
        console.error(`Failed to fetch mission details for ID ${id}:`, err);
        setError('Failed to load mission details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMissionDetails();
    }
  }, [id]);

  // Function to format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown';
    try {
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', timeZoneName: 'short' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid date';
    }
  };

  // Function to determine mission status class
  const getStatusClass = (status) => {
    if (!status) return '';
    
    switch(status.toLowerCase()) {
      case 'go': return 'status-scheduled';
      case 'success': return 'status-completed';
      case 'failure': return 'status-failed';
      case 'hold': return 'status-hold';
      case 'in flight': return 'status-progress';
      case 'partial failure': return 'status-partial';
      case 'to be determined': return 'status-tbd';
      case 'scheduled': return 'status-scheduled';
      case 'in progress': return 'status-progress';
      case 'completed': return 'status-completed';
      case 'planned': return 'status-planned';
      default: return '';
    }
  };

  return (
    <div className={`mission-details-page ${theme}`}>
      <Header />
      <main className="mission-details-main">
        {loading ? (
          <div className="loading-container">
            <div className="loader"></div>
            <p>Loading mission details...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <p className="error-message">{error}</p>
            <button className="btn-primary" onClick={() => navigate('/missions')}>
              Back to Missions
            </button>
          </div>
        ) : mission ? (
          <>
            <div className="mission-header-banner">
              <div className="container">
                <button className="btn-back" onClick={() => navigate('/missions')}>
                  &larr; Back to Missions
                </button>
                <div className="mission-title-container">
                  <h1>{mission.name}</h1>
                  <span className={`mission-status ${getStatusClass(mission.status)}`}>
                    {mission.status}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="container">
              <div className="mission-details-content">
                <div className="mission-details-section mission-overview">
                  <div className="mission-image">
                    {mission.image ? (
                      <img src={mission.image} alt={mission.name} />
                    ) : (
                      <div className="placeholder-image">No Image Available</div>
                    )}
                  </div>
                  
                  <div className="mission-info">
                    <div className="info-group">
                      <h3>Launch Information</h3>
                      <p><strong>Date:</strong> {formatDate(mission.date)}</p>
                      <p><strong>Agency:</strong> {mission.agency}</p>
                      <p><strong>Pad:</strong> {mission.pad}</p>
                      <p><strong>Location:</strong> {mission.location}</p>
                    </div>
                    
                    <div className="info-group">
                      <h3>Rocket</h3>
                      <p><strong>Name:</strong> {mission.rocket?.name || 'Unknown'}</p>
                      <p><strong>Family:</strong> {mission.rocket?.family || 'Unknown'}</p>
                      <p><strong>Variant:</strong> {mission.rocket?.variant || 'N/A'}</p>
                    </div>
                    
                    {mission.orbit && (
                      <div className="info-group">
                        <h3>Orbit</h3>
                        <p>{mission.orbit}</p>
                      </div>
                    )}
                    
                    {mission.success !== null && (
                      <div className="mission-success">
                        <h3>Mission Outcome</h3>
                        <p className={mission.success ? "success-indicator success" : "success-indicator failure"}>
                          {mission.success ? "Success" : "Failure"}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="mission-details-section mission-description">
                  <h2>Mission Description</h2>
                  <p>{mission.details || 'No detailed description available for this mission.'}</p>
                </div>
                
                {mission.videoUrl && (
                  <div className="mission-details-section mission-video">
                    <h2>Mission Video</h2>
                    <div className="video-container">
                      <iframe 
                        src={mission.videoUrl} 
                        title={`${mission.name} Video`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                )}
                
                <div className="mission-actions">
                  <button 
                    className="btn-primary" 
                    onClick={() => navigate('/missions')}
                  >
                    Back to Missions
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="not-found-container">
            <h2>Mission Not Found</h2>
            <p>The mission you are looking for does not exist or has been removed.</p>
            <button className="btn-primary" onClick={() => navigate('/missions')}>
              Back to Missions
            </button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default MissionDetails; 