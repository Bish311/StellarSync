// API keys and base URLs
const NASA_API_KEY = import.meta.env.VITE_NASA_API_KEY || 'puaRkxttxPsOp1Ybu20Ay5b1bamGWOpaaRHRKA8S';
const LAUNCH_LIBRARY_API_URL = import.meta.env.VITE_LAUNCH_LIBRARY_API_URL || 'https://lldev.thespacedevs.com/2.2.0';

// Create cache to avoid hitting API rate limits
const apiCache = new Map();
const CACHE_TTL = 30 * 60 * 1000; // 30 minutes

/**
 * Get data with cache
 * @param {string} cacheKey - Key for caching
 * @param {Function} fetchFn - Function to fetch data if not cached
 * @returns {Promise<any>} - The data
 */
const getCachedData = async (cacheKey, fetchFn) => {
  const now = Date.now();
  const cached = apiCache.get(cacheKey);
  
  if (cached && now - cached.timestamp < CACHE_TTL) {
    console.log(`Using cached data for ${cacheKey}`);
    return cached.data;
  }
  
  console.log(`Fetching fresh data for ${cacheKey}`);
  const data = await fetchFn();
  apiCache.set(cacheKey, { data, timestamp: now });
  return data;
};

/**
 * Get upcoming launches
 * @returns {Promise<Array>} Array of upcoming launches
 */
export const getUpcomingLaunches = async () => {
  const cacheKey = 'upcoming_launches';
  
  return getCachedData(cacheKey, async () => {
    try {
      console.log('Fetching upcoming launches from:', `${LAUNCH_LIBRARY_API_URL}/launch/upcoming/`);
      const response = await fetch(`${LAUNCH_LIBRARY_API_URL}/launch/upcoming/?limit=10`);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching upcoming launches:', error);
      throw error;
    }
  });
};

/**
 * Get previous launches
 * @returns {Promise<Array>} Array of previous launches
 */
export const getPreviousLaunches = async () => {
  const cacheKey = 'previous_launches';
  
  return getCachedData(cacheKey, async () => {
    try {
      const response = await fetch(`${LAUNCH_LIBRARY_API_URL}/launch/previous/?limit=10`);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching previous launches:', error);
      throw error;
    }
  });
};

/**
 * Get launch details by ID
 * @param {string} id Launch ID
 * @returns {Promise<Object>} Launch details
 */
export const getLaunchById = async (id) => {
  const cacheKey = `launch_${id}`;
  
  return getCachedData(cacheKey, async () => {
    try {
      const response = await fetch(`${LAUNCH_LIBRARY_API_URL}/launch/${id}/`);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const launch = await response.json();
      
      // Check if mission_success is actually defined and is a boolean
      let missionSuccess = null;
      if (launch.mission_success === true || launch.mission_success === false) {
        missionSuccess = launch.mission_success;
      } else if (launch.status) {
        // Try to determine success from status
        const statusName = launch.status.name?.toLowerCase() || '';
        if (statusName.includes('success')) {
          missionSuccess = true;
        } else if (statusName.includes('fail')) {
          missionSuccess = false;
        }
      }
      
      // Format the launch data for the UI
      return {
        id: launch.id,
        name: launch.name,
        date: launch.net,
        status: launch.status?.name || 'Unknown',
        details: launch.mission?.description || 'No details available',
        agency: launch.launch_service_provider?.name || 'Unknown agency',
        image: launch.image || null,
        pad: launch.pad?.name || 'Unknown',
        location: launch.pad?.location?.name || 'Unknown location',
        success: missionSuccess,
        rocket: {
          name: launch.rocket?.configuration?.name || 'Unknown rocket',
          family: launch.rocket?.configuration?.family || 'Unknown family',
          variant: launch.rocket?.configuration?.variant || 'Unknown variant',
        },
        orbit: launch.mission?.orbit?.name || null
      };
    } catch (error) {
      console.error(`Error fetching launch ${id}:`, error);
      throw error;
    }
  });
};

/**
 * Get NASA's Astronomy Picture of the Day
 * @returns {Promise<Object>} APOD data
 */
export const getAstronomyPictureOfDay = async () => {
  const cacheKey = 'nasa_apod';
  
  return getCachedData(cacheKey, async () => {
    try {
      console.log('Fetching APOD from NASA');
      const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      return {
        title: data.title,
        date: data.date,
        explanation: data.explanation,
        url: data.url,
        mediaType: data.media_type,
        hdUrl: data.hdurl || data.url,
        copyright: data.copyright || 'NASA'
      };
    } catch (error) {
      console.error('Error fetching NASA APOD:', error);
      throw error;
    }
  });
};

/**
 * Search NASA image library
 * @param {string} query Search query
 * @returns {Promise<Object>} Search results
 */
export const searchNasaImages = async (query) => {
  const cacheKey = `nasa_search_${query}`;
  
  return getCachedData(cacheKey, async () => {
    try {
      const response = await fetch(`https://images-api.nasa.gov/search?q=${encodeURIComponent(query)}&media_type=image`);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Format the data for UI
      return {
        items: data.collection.items.map(item => ({
          id: item.data[0].nasa_id,
          title: item.data[0].title,
          description: item.data[0].description || 'No description available',
          date: item.data[0].date_created,
          thumbnail: item.links && item.links.length > 0 ? item.links[0].href : null,
          center: item.data[0].center || 'NASA',
        })),
        totalItems: data.collection.metadata?.total_hits || data.collection.items.length,
      };
    } catch (error) {
      console.error('Error searching NASA images:', error);
      throw error;
    }
  });
};

/**
 * Get EPIC (Earth Polychromatic Imaging Camera) images
 * @returns {Promise<Array>} Array of EPIC images
 */
export const getEpicImages = async () => {
  const cacheKey = 'nasa_epic';
  
  return getCachedData(cacheKey, async () => {
    try {
      const response = await fetch(`https://api.nasa.gov/EPIC/api/natural?api_key=${NASA_API_KEY}`);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Format the data for UI
      return data.map(image => {
        const date = new Date(image.date);
        const formattedDate = date.toISOString().split('T')[0].replace(/-/g, '/');
        
        return {
          id: image.identifier,
          date: image.date,
          caption: image.caption,
          imageUrl: `https://api.nasa.gov/EPIC/archive/natural/${formattedDate}/png/${image.image}.png?api_key=${NASA_API_KEY}`,
          centroid: {
            lat: image.centroid_coordinates.lat,
            lon: image.centroid_coordinates.lon
          }
        };
      });
    } catch (error) {
      console.error('Error fetching EPIC images:', error);
      throw error;
    }
  });
};

/**
 * Get all missions
 * @returns {Promise<Array>} Array of all space missions
 */
export const getMissions = async () => {
  const cacheKey = 'all_missions';
  
  return getCachedData(cacheKey, async () => {
    try {
      console.log('Fetching missions data...');
      
      // Get both upcoming and previous launches
      const [upcomingData, previousData] = await Promise.all([
        getUpcomingLaunches(),
        getPreviousLaunches()
      ]);
      
      // Helper function to get a standardized status
      const standardizeStatus = (statusName) => {
        if (!statusName) return 'Unknown';
        
        const status = statusName.toLowerCase();
        
        if (status.includes('go')) return 'Go For Launch';
        if (status.includes('success')) return 'Success';
        if (status.includes('fail')) return 'Failure';
        if (status.includes('hold')) return 'Hold';
        if (status.includes('in flight')) return 'In Flight';
        if (status.includes('tbd') || status.includes('to be determined')) return 'TBD';
        if (status.includes('scheduled')) return 'Scheduled';
        
        return statusName; // Keep original if no match
      };

      // Transform the data to a consistent format
      const upcoming = upcomingData.results.map(launch => {
        // Log unique status values to help with debugging
        if (launch.status?.name) {
          console.log(`Status found: ${launch.status.name}`);
        }
        
        // Use the standardized status
        const statusName = standardizeStatus(launch.status?.name);
        
        return {
          id: launch.id,
          name: launch.name,
          agency: launch.launch_service_provider?.name || 'Unknown agency',
          launchDate: launch.net,
          status: statusName,
          description: launch.mission?.description || 'No description available.',
          image: launch.image
        };
      });
      
      const previous = previousData.results.map(launch => {
        // Use the standardized status
        const statusName = standardizeStatus(launch.status?.name);
        
        return {
          id: launch.id,
          name: launch.name,
          agency: launch.launch_service_provider?.name || 'Unknown agency',
          launchDate: launch.net,
          status: statusName,
          description: launch.mission?.description || 'No description available.',
          image: launch.image
        };
      });
      
      // Combine the missions
      const combined = [...upcoming, ...previous];
      console.log(`Fetched ${combined.length} missions`);
      
      return combined;
    } catch (error) {
      console.error('Error fetching missions:', error);
      
      // Return fallback data if API fails
      return [
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
    }
  });
}; 