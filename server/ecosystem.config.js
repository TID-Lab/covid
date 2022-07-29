/**
 * The PM2 settings for the `server` application.
 */
module.exports = {
  apps: [
    {
      name: 'server',
      script: 'dist/app.js',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
