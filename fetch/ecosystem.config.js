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
