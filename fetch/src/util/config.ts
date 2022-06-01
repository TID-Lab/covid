const path = require('path');

/**
 * A secure config system that exposes secrets, keys, and more
 * via a simple JSON object that can be imported from other modules.
 */

require('dotenv').config({
  path: path.join(__dirname, '..', '..', '..', '.env'),
});

module.exports = {
  db: {
    name: process.env.DB_NAME || 'covid',
    url: process.env.DB_URL || 'mongodb://localhost:27017/covid',
  },
  fetch: {
    credentials: {
      twitter: {
        consumerKey: process.env.TWITTER_CONSUMER_KEY,
        consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
        accessToken: process.env.TWITTER_ACCESS_TOKEN,
        accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
      },
      facebook: process.env.CROWDTANGLE_FACEBOOK_TOKEN,
      instagram: process.env.CROWDTANGLE_INSTAGRAM_TOKEN,
    },
  },
};
