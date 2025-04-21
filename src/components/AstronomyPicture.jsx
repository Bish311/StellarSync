import { useState, useEffect } from 'react';
import { getAstronomyPictureOfDay } from '../services/api';
import '../styles/AstronomyPicture.css';

const AstronomyPicture = () => {
  const [apod, setApod] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAPOD = async () => {
      try {
        setLoading(true);
        const data = await getAstronomyPictureOfDay();
        console.log('APOD data:', data);
        setApod(data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch APOD:', err);
        setError('Failed to load the astronomy picture. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAPOD();
  }, []);

  if (loading) {
    return (
      <div className="apod-container loading">
        <div className="apod-loader"></div>
        <p>Loading today's astronomy picture...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="apod-container error">
        <h3>Astronomy Picture of the Day</h3>
        <p className="apod-error">{error}</p>
      </div>
    );
  }

  // Use a fallback if API fails
  const fallbackData = {
    title: "Cosmic Cliffs in the Carina Nebula",
    explanation: "This landscape of 'mountains' and 'valleys' speckled with glittering stars is actually the edge of a nearby, young, star-forming region called NGC 3324 in the Carina Nebula. Captured in infrared light by NASA's new James Webb Space Telescope, this image reveals for the first time previously invisible areas of star birth.",
    url: "https://apod.nasa.gov/apod/image/2207/WebbFirstDeep_NASA_1080.jpg",
    mediaType: "image",
    date: new Date().toISOString().split('T')[0]
  };

  const displayData = apod || fallbackData;

  return (
    <div className="apod-container">
      <h3>NASA Astronomy Picture of the Day</h3>
      <div className="apod-content">
        <div className="apod-image-container">
          {displayData.mediaType === 'video' ? (
            <div className="apod-video-container">
              <iframe
                src={displayData.url}
                title={displayData.title}
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <img 
              src={displayData.url} 
              alt={displayData.title} 
              className="apod-image"
            />
          )}
        </div>
        <div className="apod-details">
          <h4>{displayData.title}</h4>
          <p className="apod-date">Date: {new Date(displayData.date).toLocaleDateString()}</p>
          <p className="apod-explanation">{displayData.explanation}</p>
          {displayData.copyright && (
            <p className="apod-copyright">Credit: {displayData.copyright}</p>
          )}
          {displayData.mediaType === 'image' && displayData.hdUrl && (
            <a 
              href={displayData.hdUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="apod-hd-link"
            >
              View High Resolution
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default AstronomyPicture; 