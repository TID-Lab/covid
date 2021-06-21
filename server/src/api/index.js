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
    sessionOptions.cookie.secure = true; // serve secure cookies
  }

  // Register middleware
  app.use(session(sessionOptions));
  app.use(json({ extended: true }));
  app.use(urlencoded({ extended: true }));

  // Register routes
  const apiRoutes = express.Router();
  apiRoutes.use('/post', is('org', 'admin'), postRoutes);
  apiRoutes.use('/topic', is('org', 'admin'), topicRoutes);
  apiRoutes.use('/proxy', is('org', 'admin'), proxyRoutes);
  apiRoutes.use('/org', orgRoutes);
  apiRoutes.use('/auth', authRoutes);
  app.use('/api', apiRoutes);

  // Mount the frontend app
  if (process.env.NODE_ENV === 'production') {
    const build = [__dirname, '..', '..', '..', 'client', 'build'];
    app.use(express.static(path.join(...build)));
    app.get('/', (_, res) => {
      res.sendFile(path.join(...build, 'index.html'));
    });
  }

  // Swallow errors
  app.use(handleError);

  const server = http.createServer(app);

  // This function wraps the standard HTTP lib with
  // a Promise so that it can be used in an async func

  server.on('error', (err) => {
    debug('API module failed to start. ↓');
    debug(` > ${err}`);
    reject(err);
  });

  debug('Starting the API module...');
  server.listen(config.api.port, () => {
    debug(`API module started, listening on port ${config.api.port}.`);
    resolve();
  });
});
