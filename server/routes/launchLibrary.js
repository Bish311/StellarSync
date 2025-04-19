const express = require('express');
const axios = require('axios');
const router = express.Router();
const { cache } = require('../utils/cache');

// Base URL for Launch Library API
const baseUrl = process.env.LAUNCH_LIBRARY_API_URL || 'https://ll.thespacedevs.com/2.2.0';

/**
 * @route   GET /api/launches/upcoming
 * @desc    Get upcoming launches
 * @access  Public
 */
router.get('/upcoming', async (req, res) => {
  try {
    // Check if data is cached
    const cacheKey = 'upcoming_launches';
    const cachedData = cache.get(cacheKey);
    
    if (cachedData) {
      return res.json({ launches: cachedData });
    }
    
    // Fetch data from API - fixed path to ensure correct URL structure
    const response = await axios.get(`${baseUrl}/launch/upcoming/?limit=10&mode=detailed`);
    console.log('Upcoming launches URL:', `${baseUrl}/launch/upcoming/?limit=10&mode=detailed`);
    
    const launches = response.data.results.map(launch => ({
      id: launch.id,
      name: launch.name,
      status: launch.status.name,
      description: launch.mission ? launch.mission.description : 'No description available',
      launchDate: launch.net,
      agency: launch.launch_service_provider ? launch.launch_service_provider.name : 'Unknown',
      image: launch.image || null,
      missionType: launch.mission ? launch.mission.type : 'Unknown',
      location: launch.pad ? `${launch.pad.name}, ${launch.pad.location.name}` : 'Unknown'
    }));
    
    // Cache data
    cache.set(cacheKey, launches);
    
    res.json({ launches });
  } catch (error) {
    console.error('Error fetching upcoming launches:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   GET /api/launches/previous
 * @desc    Get previous launches
 * @access  Public
 */
router.get('/previous', async (req, res) => {
  try {
    // Check if data is cached
    const cacheKey = 'previous_launches';
    const cachedData = cache.get(cacheKey);
    
    if (cachedData) {
      return res.json({ launches: cachedData });
    }
    
    // Fetch data from API
    const response = await axios.get(`${baseUrl}/launch/previous/?limit=10&mode=detailed`);
    const launches = response.data.results.map(launch => ({
      id: launch.id,
      name: launch.name,
      status: launch.status.name,
      description: launch.mission ? launch.mission.description : 'No description available',
      launchDate: launch.net,
      agency: launch.launch_service_provider ? launch.launch_service_provider.name : 'Unknown',
      image: launch.image || null,
      missionType: launch.mission ? launch.mission.type : 'Unknown',
      location: launch.pad ? `${launch.pad.name}, ${launch.pad.location.name}` : 'Unknown'
    }));
    
    // Cache data
    cache.set(cacheKey, launches);
    
    res.json({ launches });
  } catch (error) {
    console.error('Error fetching previous launches:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   GET /api/launches/:id
 * @desc    Get launch by ID
 * @access  Public
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if data is cached
    const cacheKey = `launch_${id}`;
    const cachedData = cache.get(cacheKey);
    
    if (cachedData) {
      return res.json({ launch: cachedData });
    }
    
    // Fetch data from API
    const response = await axios.get(`${baseUrl}/launch/${id}/`);
    const launch = {
      id: response.data.id,
      name: response.data.name,
      status: response.data.status.name,
      description: response.data.mission ? response.data.mission.description : 'No description available',
      launchDate: response.data.net,
      agency: response.data.launch_service_provider ? response.data.launch_service_provider.name : 'Unknown',
      image: response.data.image || null,
      missionType: response.data.mission ? response.data.mission.type : 'Unknown',
      location: response.data.pad ? `${response.data.pad.name}, ${response.data.pad.location.name}` : 'Unknown',
      rocket: response.data.rocket.configuration ? response.data.rocket.configuration.name : 'Unknown',
      details: response.data.mission ? response.data.mission.description : 'No details available'
    };
    
    // Cache data
    cache.set(cacheKey, launch);
    
    res.json({ launch });
  } catch (error) {
    console.error(`Error fetching launch ${req.params.id}:`, error);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   GET /api/missions
 * @desc    Get all missions (combined upcoming and previous)
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    // Check if data is cached
    const cacheKey = 'all_missions';
    const cachedData = cache.get(cacheKey);
    
    if (cachedData) {
      return res.json({ missions: cachedData });
    }
    
    // Fetch data from APIs in parallel
    const [upcomingResponse, previousResponse] = await Promise.all([
      axios.get(`${baseUrl}/launch/upcoming/?limit=10&mode=detailed`),
      axios.get(`${baseUrl}/launch/previous/?limit=10&mode=detailed`)
    ]);
    
    const formatLaunch = (launch) => ({
      id: launch.id,
      name: launch.name,
      status: launch.status.name,
      description: launch.mission ? launch.mission.description : 'No description available',
      launchDate: launch.net,
      agency: launch.launch_service_provider ? launch.launch_service_provider.name : 'Unknown',
      image: launch.image || null,
      missionType: launch.mission ? launch.mission.type : 'Unknown',
      location: launch.pad ? `${launch.pad.name}, ${launch.pad.location.name}` : 'Unknown'
    });
    
    // Format and combine the data
    const upcomingLaunches = upcomingResponse.data.results.map(formatLaunch);
    const previousLaunches = previousResponse.data.results.map(formatLaunch);
    
    const missions = [...upcomingLaunches, ...previousLaunches];
    
    // Cache data
    cache.set(cacheKey, missions);
    
    res.json({ missions });
  } catch (error) {
    console.error('Error fetching all missions:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 