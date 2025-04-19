// API base URL
const API_BASE_URL = 'http://localhost:5000/api';

/**
 * Get upcoming launches
 * @returns {Promise<Array>} Array of upcoming launches
 */
export const getUpcomingLaunches = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/launches/upcoming`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.launches;
  } catch (error) {
    console.error('Error fetching upcoming launches:', error);
    throw error;
  }
};

/**
 * Get previous launches
 * @returns {Promise<Array>} Array of previous launches
 */
export const getPreviousLaunches = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/launches/previous`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.launches;
  } catch (error) {
    console.error('Error fetching previous launches:', error);
    throw error;
  }
};

/**
 * Get launch details by ID
 * @param {string} id Launch ID
 * @returns {Promise<Object>} Launch details
 */
export const getLaunchById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/launches/${id}`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.launch;
  } catch (error) {
    console.error(`Error fetching launch ${id}:`, error);
    throw error;
  }
};

/**
 * Get NASA's Astronomy Picture of the Day
 * @returns {Promise<Object>} APOD data
 */
export const getAstronomyPictureOfDay = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/nasa/apod`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.apod;
  } catch (error) {
    console.error('Error fetching NASA APOD:', error);
    throw error;
  }
};

/**
 * Search NASA image library
 * @param {string} query Search query
 * @param {number} page Page number
 * @returns {Promise<Object>} Search results
 */
export const searchNasaImages = async (query, page = 1) => {
  try {
    const response = await fetch(`${API_BASE_URL}/nasa/search?q=${encodeURIComponent(query)}&page=${page}`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error searching NASA images:', error);
    throw error;
  }
};

/**
 * Get EPIC images
 * @returns {Promise<Array>} Array of EPIC images
 */
export const getEpicImages = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/nasa/epic`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.epic;
  } catch (error) {
    console.error('Error fetching EPIC images:', error);
    throw error;
  }
};

/**
 * Get all missions
 * @returns {Promise<Array>} Array of all space missions
 */
export const getMissions = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/missions`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.missions;
  } catch (error) {
    console.error('Error fetching missions:', error);
    throw error;
  }
}; 