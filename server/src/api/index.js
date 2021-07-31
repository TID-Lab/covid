const path = require('path');
const useDebug = require('debug');
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const { json, urlencoded } = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const config = require('../util/config');
const { is } = require('../util/org');

// API routes
const postRoutes = require('./post');
const topicRoutes = require('./topic');
const proxyRoutes = require('./proxy');
const orgRoutes = require('./org');
const authRoutes = require('./auth');

const debug = useDebug('api');
const app = express();

// Default error handler
function handleError(err, req, res, next) {
  if (err) {
    debug(`${err}`);
    res.status(500).send();
  } else {
    next(err);
  }
}

/**
 * Initializes a Express app that hosts:
 * - the client-side React app
 * - the RESTful web API used by the React app
 */
module.exports = () => new Promise((resolve, reject) => {
  // configure the options for express-session
  const sessionOptions = {
    secret: config.auth.sessionSecret,
    store: new MongoStore({
      client: mongoose.connection.client,
      dbName: config.db.name,
      crypto: { secret: config.auth.storeSecret },
    }),
    cookie: {
      httpOnly: true,
      secure: false,
    },
    resave: true,
    saveUninitialized: false,
  };

  if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1); // trust first proxy
    // sessionOptions.cookie.secure = true; // serve secure cookies
  }

  // Register middleware
  app.use(session(sessionOptions)); // handles user login sessions
  app.use(json({ extended: true })); // handles the parsing of JSON bodies
  app.use(urlencoded({ extended: true })); // handles the parsing of URL-encoded bodies

  // Register routes
  const apiRoutes = express.Router();
  apiRoutes.use('/post', is('org', 'admin'), postRoutes); // routes for social media posts
  apiRoutes.use('/topic', is('org', 'admin'), topicRoutes); // routes for COVID-19 topics
  apiRoutes.use('/proxy', is('org', 'admin'), proxyRoutes); // routes for oEmbed API proxies
  apiRoutes.use('/org', orgRoutes); // routes for partner organizations
  apiRoutes.use('/auth', authRoutes); // routes for user authentication
  app.use('/api', apiRoutes); // mounts all the routes above to the /api route

  // Mount the client-side React app

  const build = [__dirname, '..', '..', '..', 'client', 'build'];

  function sendIndex(_, res) {
    res.sendFile(path.join(...build, 'index.html'));
  }

  if (process.env.NODE_ENV === 'production') {
    app.get('/', is('org', 'admin'), sendIndex); // authenticate the homepage
    app.use(express.static(path.join(...build))); // static files
    app.get('/login', sendIndex); // do not authenticate the login page
    app.get('*', is('org', 'admin'), sendIndex); // authenticate everything else
  }

  // Swallow errors
  app.use(handleError);

  const server = http.createServer(app);

  // If the HTTP server emits an error, reject.
  server.on('error', (err) => {
    debug('API module failed to start. ↓');
    debug(` > ${err}`);
    reject(err);
  });

  // If the HTTP server started, resolve.
  debug('Starting the API module...');
  server.listen(config.api.port, () => {
    debug(`API module started, listening on port ${config.api.port}.`);
    resolve();
  });
});
