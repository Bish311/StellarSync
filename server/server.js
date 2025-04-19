const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import routes
const launchLibraryRoutes = require('./routes/launchLibrary');
const nasaRoutes = require('./routes/nasa');

// Initialize Express app
const app = express();

// Set up middleware
app.use(cors());
app.use(express.json());

// Define routes
app.use('/api/launches', launchLibraryRoutes);
app.use('/api/nasa', nasaRoutes);
app.use('/api/missions', launchLibraryRoutes); // Map missions route to launchLibrary controller

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Define port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 