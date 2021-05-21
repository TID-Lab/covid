const { config } = require('dotenv');

/**
 * A secure config system that exposes secrets, keys, and more
 * via a simple JSON object that can be imported from other modules.
 */

if (process.env.NODE_ENV !== 'production') {
  config();
}

module.exports = {
  api: {
    port: process.env.PORT || 4000,
  },
  db: {
    name: process.env.DB_NAME || 'aggie',
    url: process.env.DB_URL || 'mongodb://localhost:27017/covid',
  },
  setupProxy: {
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
