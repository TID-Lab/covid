// API routes for user authentication

const useDebug = require('debug');
const session = require('express-session');
const routes = require('express').Router();
const Organization = require('../../models/organization');
const { comparePassword } = require('../../util/org');
const oauth = require('../../util/oauth-promise')(process.env.CALLBACK_URL || "https://peach.ipat.gatech.edu/dashboard");

const debug = useDebug('api');

/**
 * A login endpoint that issues a new cookie
 * when supplied with a valid user name & password.
 */
routes.post('/login', async (req, res) => {
  if (typeof req.body !== 'object') {
    res.status(400).send();
    return;
  }
  const { name, pwd } = req.body;

  // validate user name & password
  let org;
  try {
    org = await Organization.findOne({ name });
    if (!org) {
      res.redirect('/login');
      return;
    }
  } catch (err) {
    debug(`${err}`);
    res.status(500).send();
    return;
  }
  let same;
  try {
    same = await comparePassword(pwd, org.hash);
  } catch (err) {
    debug(`${err}`);
    res.status(500).send();
    return;
  }
  if (!same) {
    res.redirect('/login');
    return;
  }

  // log the user in
  const { _id } = org;
  req.session.org = _id;

  res.redirect('/dashboard');
});


/**
 * Logs a user out from their organization.
 */
routes.post('/logout', async (req, res) => {
  req.session.org = undefined;
  res.redirect('/dashboard');
});

/**
 * Checks whether the user is logged into their organization.
 */
routes.get('/check', async (req, res) => {
  const id = req.session.org;
  if (!id) {
    res.status(401).send();
    return;
  }
  const org = await Organization.findById(id);
  if (!org) {
    res.status(401).send();
    return;
  }
  res.status(200).send();
});


// TWITTER 3-LEGGED OAUTH PROCESS REFERENCING https://github.com/QuodAI/tutorial-react-twitter-api-login and https://developer.twitter.com/en/docs/authentication/guides/log-in-with-twitter 
// OAuth Step 1
routes.post('/twitter/oauth/request_token', async (req, res) => {
  try {
    const {oauth_token, oauth_token_secret} = await oauth.getOAuthRequestToken();
    // Stores the token and secrets within the sessions (Secure because the session's data is stored on the backend)
    req.session.oauth_token = oauth_token;
    req.session.oauth_token_secret = oauth_token_secret;
    res.json({ oauth_token });
    } catch(error) {
      console.error(error);
    }
});
  

//OAuth Step 3 (Step 2 is on the client)
routes.post('/twitter/oauth/access_token', async (req, res) => {
  try {
    const {oauth_token: req_oauth_token, oauth_verifier} = req.body;
    const oauth_token = req.session.oauth_token;
    const oauth_token_secret = req.session.oauth_token_secret;

    
    if (oauth_token !== req_oauth_token) {
      res.status(403).json({message: "Request tokens do not match"});
      return;
    }
    // Access tokens for user posting is aquired then stored in the user session
    const {oauth_access_token, oauth_access_token_secret} = await oauth.getOAuthAccessToken(oauth_token, oauth_token_secret, oauth_verifier);
    req.session.oauth_access_token = oauth_access_token;
    req.session.oauth_access_token_secret = oauth_access_token_secret;
    res.json({success: true});
  } catch(error) {
    console.log(error);
    res.status(403).json({message: "Missing access token"});
  }
});



routes.post("/twitter/logout", async (req, res) => {
  try {
    req.session.oauth_token_secret = undefined;
    res.json({success: true});
  } catch(error) {
    res.status(403).json({message: "Missing, invalid, or expired tokens"});
  }
});

module.exports = routes;
