// API routes for user authentication

const useDebug = require('debug');
const routes = require('express').Router();
const Organization = require('../../models/organization');
const { comparePassword } = require('../../util/org');
const oauthCallback="https://peach.ipat.gatech.edu/social-media-dashboard";
const oauth = require('../../util/oauth-promise')(oauthCallback);

const debug = useDebug('api');

//our in-memory secrets database.
//Can be a key-value store or a relational database
let tokens = {};

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

  res.redirect('/social-media-dashboard');
});


/**
 * Logs a user out from their organization.
 */
routes.post('/logout', async (req, res) => {
  req.session.org = undefined;
  res.redirect('/social-media-dashboard');
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
    console.log(oauthCallback);
    const {oauth_token, oauth_token_secret} = await oauth.getOAuthRequestToken();
    
    res.cookie(COOKIE_NAME, oauth_token , {
      maxAge: 15 * 60 * 1000, // 15 minutes
      secure: true,
      httpOnly: true,
      sameSite: true,
    });
    
    tokens[oauth_token] = { oauth_token_secret };
    res.json({ oauth_token });
    } catch(error) {
      console.error(error);
    }
});
  

//OAuth Step 3
routes.post('/twitter/oauth/access_token', async (req, res) => {
  
  
  try {
    const {oauth_token: req_oauth_token, oauth_verifier} = req.body;
    const oauth_token = req.cookies[COOKIE_NAME];
    const oauth_token_secret = tokens[oauth_token].oauth_token_secret;
    
    if (oauth_token !== req_oauth_token) {
      res.status(403).json({message: "Request tokens do not match"});
      return;
    }
    
    const {oauth_access_token, oauth_access_token_secret} = await oauth.getOAuthAccessToken(oauth_token, oauth_token_secret, oauth_verifier);
    tokens[oauth_token] = { ...tokens[oauth_token], oauth_access_token, oauth_access_token_secret };
    res.json({success: true});
    
  } catch(error) {
    res.status(403).json({message: "Missing access token"});
  } 
  
});

//Authenticated resource access
routes.get("/twitter/users/profile_banner", async (req, res) => {
  
  try {
    const oauth_token = req.cookies[COOKIE_NAME];
    const { oauth_access_token, oauth_access_token_secret } = tokens[oauth_token]; 
    const response = await oauth.getProtectedResource("https://api.twitter.com/1.1/account/verify_credentials.json", "GET", oauth_access_token, oauth_access_token_secret);
    res.json(JSON.parse(response.data));
  } catch(error) {
    res.status(403).json({message: "Missing, invalid, or expired tokens"});
  } 
  
});

routes.post("/twitter/logout", async (req, res) => {
  
  try {
    const oauth_token = req.cookies[COOKIE_NAME];
    delete tokens[oauth_token];
    res.cookie(COOKIE_NAME, {}, {maxAge: -1});
    res.json({success: true});
  } catch(error) {
    res.status(403).json({message: "Missing, invalid, or expired tokens"});
  } 
  
});

module.exports = routes;
