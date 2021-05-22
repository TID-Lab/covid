const routes = require('express').Router();
const axios = require('axios').default;
const { api: { proxy: { facebookToken, instagramToken } } } = require('../../util/config');

routes.get('/twitter', async (req, res) => {
  const { url } = req.query;
  const response = await axios({
    method: 'GET',
    baseURL: 'https://publish.twitter.com',
    url: '/oembed',
    params: { url },
  });
  res.status(200).send(response.data);
});

routes.post('/facebook', async (req, res) => {
  const { url } = req.query;
  const response = await axios({
    method: 'GET',
    baseURL: 'https://graph.facebook.com',
    url: '/v10.0/oembed_page',
    params: {
      url,
      access_token: facebookToken,
    },
  });
  res.status(200).send(response.data);
});

routes.put('/instagram', async (req, res) => {
  const { url } = req.query;
  const response = await axios({
    method: 'GET',
    baseURL: 'https://graph.facebook.com',
    url: '/v10.0/instagram_oembed',
    params: {
      url,
      access_token: instagramToken,
    },
  });
  res.status(200).send(response.data);
});

module.exports = routes;
