const routes = require('express').Router();
const axios = require('axios').default;
const { api: { proxy: { facebookToken, instagramToken } } } = require('../../util/config');

routes.get('/twitter', async (req, res) => {
  const { url } = req.query;
  try {
    const response = await axios({
      method: 'GET',
      baseURL: 'https://publish.twitter.com',
      url: '/oembed',
      params: { url, omit_script: '1' },
    });
    res.status(200).send(response.data);
  } catch (err) {
    const { response: errResponse } = err;
    if (errResponse) {
      res.status(errResponse.status).send(errResponse.data);
    }
  }
});

routes.get('/facebook', async (req, res) => {
  const { url } = req.query;
  try {
    const response = await axios({
      method: 'GET',
      baseURL: 'https://graph.facebook.com',
      url: '/v10.0/oembed_post',
      params: {
        url,
        access_token: facebookToken,
        omitscript: 'true',
        maxwidth: 320,
      },
    });
    res.status(200).send(response.data);
  } catch (err) {
    const { response: errResponse } = err;
    if (errResponse) {
      res.status(errResponse.status).send(errResponse.data);
    }
  }
});

routes.get('/instagram', async (req, res) => {
  const { url } = req.query;
  try {
    const response = await axios({
      method: 'GET',
      baseURL: 'https://graph.facebook.com',
      url: '/v10.0/instagram_oembed',
      params: {
        url,
        access_token: instagramToken,
        omitscript: 'true',
        maxwidth: 320,
      },
    });
    res.status(200).send(response.data);
  } catch (err) {
    const { response: errResponse } = err;
    if (errResponse) {
      res.status(errResponse.status).send(errResponse.data);
    }
  }
});

module.exports = routes;
