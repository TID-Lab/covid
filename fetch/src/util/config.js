const path = require('path');

/**
 * A secure config system that exposes secrets, keys, and more
 * via a simple JSON object that can be imported from other modules.
 */

require('dotenv').config({ path: path.join(__dirname, '..', '..', '..', '.env') });

module.exports = {
  api: {
    port: process.env.PORT || 3000,
  },
  db: {
    name: process.env.DB_NAME || 'covid',
    url: process.env.DB_URL || 'mongodb://localhost:27017/covid',
  },
  fetch: {
    credentials: {
      twitter: {
        consumerKey: process.env.TWITTER_CONSUMER_KEY,
        consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
      },
      facebook: process.env.FACEBOOK_TOKEN,
      instagram: process.env.INSTAGRAM_TOKEN,
    },
  },
};
