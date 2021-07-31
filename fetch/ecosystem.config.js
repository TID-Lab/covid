/**
 * The PM2 settings for the `fetch` application.
 */
module.exports = {
  apps: [
    {
      name: 'fetch',
      script: 'src/app.js',
      env: {
        NODE_ENV: 'production',
        DEBUG: 'core,db,fetch',
      },
    },
  ],
};
