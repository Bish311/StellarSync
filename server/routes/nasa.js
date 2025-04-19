const express = require('express');
const axios = require('axios');
const router = express.Router();
const { cache } = require('../utils/cache');

// NASA API Key
const NASA_API_KEY = process.env.NASA_API_KEY || 'DEMO_KEY';

/**
 * Get NASA's Astronomy Picture of the Day
 * @route GET /api/nasa/apod
 * @access Public
 */
router.get('/apod', async (req, res) => {
  try {
    // Check if data is in cache
    const cacheKey = 'nasa_apod';
    const cachedData = cache.get(cacheKey);
    
    if (cachedData) {
      return res.json(cachedData);
    }
    
    // Fetch from API if not in cache
    const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`);
    const apodData = response.data;
    
    // Save to cache (shorter TTL for APOD since it updates daily)
    cache.set(cacheKey, { apod: apodData }, 86400); // 24 hours TTL
    
    res.json({ apod: apodData });
  } catch (error) {
    console.error('Error fetching NASA APOD:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

/**
 * Search NASA image and video library
 * @route GET /api/nasa/search
 * @access Public
 */
router.get('/search', async (req, res) => {
  try {
    const { q, page = 1 } = req.query;
    
    if (!q) {
      return res.status(400).json({ message: 'Search query is required' });
    }
    
    // Check if data is in cache
    const cacheKey = `nasa_search_${q}_${page}`;
    const cachedData = cache.get(cacheKey);
    
    if (cachedData) {
      return res.json(cachedData);
    }
    
    // Fetch from API if not in cache
    const response = await axios.get(`https://images-api.nasa.gov/search?q=${q}&page=${page}&media_type=image`);
    
    // Format the data
    const items = response.data.collection.items.map(item => {
      const data = item.data[0];
      const links = item.links || [];
      
      return {
        id: data.nasa_id,
        title: data.title,
        description: data.description,
        date: data.date_created,
        thumbnail: links.length > 0 ? links[0].href : null,
        mediaType: data.media_type
      };
    });
    
    const result = {
      items,
      pagination: {
        totalPages: Math.ceil(response.data.collection.metadata.total_hits / 100),
        currentPage: parseInt(page)
      }
    };
    
    // Save to cache
    cache.set(cacheKey, result);
    
    res.json(result);
  } catch (error) {
    console.error('Error searching NASA library:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

/**
 * Get NASA EPIC (Earth Polychromatic Imaging Camera) images
 * @route GET /api/nasa/epic
 * @access Public
 */
router.get('/epic', async (req, res) => {
  try {
    // Check if data is in cache
    const cacheKey = 'nasa_epic';
    const cachedData = cache.get(cacheKey);
    
    if (cachedData) {
      return res.json(cachedData);
    }
    
    // Fetch from API if not in cache
    const response = await axios.get(`https://api.nasa.gov/EPIC/api/natural?api_key=${NASA_API_KEY}`);
    
    // Process the data
    const epicImages = response.data.map(image => {
      const date = image.date.split(' ')[0].replace(/-/g, '/');
      
      return {
        id: image.identifier,
        caption: image.caption,
        date: image.date,
        imageUrl: `https://api.nasa.gov/EPIC/archive/natural/${date}/png/${image.image}.png?api_key=${NASA_API_KEY}`,
        centroid_coordinates: image.centroid_coordinates
      };
    });
    
    // Save to cache
    cache.set(cacheKey, { epic: epicImages }, 43200); // 12 hours TTL
    
    res.json({ epic: epicImages });
  } catch (error) {
    console.error('Error fetching NASA EPIC data:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router; 