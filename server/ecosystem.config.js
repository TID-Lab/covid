module.exports = {
  apps: [
    {
      name: 'server',
      script: 'src/app.js',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
