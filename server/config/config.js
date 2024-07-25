// config/config.js
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    mongoURI: 'mongodb://localhost:27017/PFT2',
    port: process.env.PORT || 5000
  };
