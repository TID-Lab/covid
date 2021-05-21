// const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { setupProxy: { credentials } } = require('../util/config');

// const app = express();

module.exports = function(app) {
  app.use(
    '/twitter',
    createProxyMiddleware({
      target: 'https://publish.twitter.com',
      changeOrigin: true,
      pathRewrite: {
        '^/twitter': '/', // remove base path
      },
    })
  );
  app.use(
    '/facebook',
    createProxyMiddleware({
      target: 'https://graph.facebook.com/v10.0/oembed_post?access_token=' + credentials.facebook + '&',
      changeOrigin: true,
    })
  );
  app.use(
    '/instagram',
    createProxyMiddleware({
      target: 'https://graph.facebook.com/v10.0/instagram_oembed?access_token=' + credentials.instagram + '&',
      changeOrigin: true,
    })
  );
};