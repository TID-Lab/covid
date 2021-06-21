const path = require('path');

/**
 * A secure config system that exposes secrets, keys, and more
 * via a simple JSON object that can be imported from other modules.
 */

require('dotenv').config({ path: path.join(__dirname, '..', '..', '..', '.env') });

module.exports = {
  api: {
    port: process.env.PORT || 5000,
    proxy: {
      facebookToken: process.env.FACEBOOK_ACCESS_TOKEN,
      instagramToken: process.env.INSTAGRAM_ACCESS_TOKEN,
    },
    posts: {
      pageSize: 20,
    },
  },
  db: {
    name: process.env.DB_NAME || 'covid',
    url: process.env.DB_URL || 'mongodb://localhost:27017/covid',
  },
  auth: {
    sessionSecret: process.env.SESSION_SECRET,
    storeSecret: process.env.STORE_SECRET,
    defaultAdmin: {
      name: process.env.DEFAULT_ADMIN_NAME || 'Georgia Tech',
      password: process.env.DEFAULT_ADMIN_PASSWORD || 'letmein1',
    },
  },
};
