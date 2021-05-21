module.exports = {
  apps: [
    {
      name: 'covid',
      script: 'src/app.js',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
