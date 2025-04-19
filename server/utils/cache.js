const NodeCache = require('node-cache');

// Create cache with 30-minute TTL (time to live)
const cache = new NodeCache({ stdTTL: 1800 });

module.exports = { cache }; 