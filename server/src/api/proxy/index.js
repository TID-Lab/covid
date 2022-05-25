// API routes for oEmbed API proxies

const routes = require('express').Router();
const axios = require('axios').default;
const { api: { proxy: { facebookToken, instagramToken } } } = require('../../util/config');
const oauth = require('../../util/oauth-promise')(process.env.CALLBACK_URL || "https://peach.ipat.gatech.edu/social-media-dashboard");

// A proxy for the Twitter oEmbed API
routes.get('/twitter', async (req, res) => {
  const { url } = req.query;
  try {
    const response = await axios({
      method: 'GET',
      baseURL: 'https://publish.twitter.com',
      url: '/oembed',
      params: {
        url,
        omit_script: '1',
        maxwidth: 400,
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

// A proxy for the Facebook oEmbed API
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
        maxwidth: 400,
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

// A proxy for the Instagram oEmbed API
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
        maxwidth: 400,
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

//Authenticated resource access
routes.post("/twitter/tweet", async (req, res) => {
  try {
    const oauth_access_token_secret = req.session.oauth_access_token_secret;
    const oauth_access_token = req.session.oauth_access_token;
    const response = await oauth.post("https://api.twitter.com/1.1/statuses/update.json", oauth_access_token, oauth_access_token_secret, req.body);
    res.json(JSON.parse(response.data));
  } catch(error) {
    try {
      console.log(error)
      responseError = JSON.parse(error.data).errors[0]
      responseCode = responseError.code
      // Escalates code 220 which is "credentials do not allow access to this resource" message into unauthorized
      if (responseError.code == 220) {
        responseCode = 401
      } // Escalates { code: 187, message: 'Status is a duplicate.' } into a 400 bad request
      else if (responseError.code == 187) {
        responseCode = 400
      }
      // Need to escalate to 400+ or the server will spit back a 500 proxy error... not sure what that's about
      res.status(responseCode).send({message: responseError.message})
        } catch(error) {
          console.log("Something went wrong with line 89 probably...", error)
        }
    }
  
});

module.exports = routes;
