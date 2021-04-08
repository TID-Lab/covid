const useDebug = require('debug');
const express = require('express');
const http = require('http');
const { json } = require('body-parser');
const config = require('../util/config');

const postRoutes = require('./post');
const topicRoutes = require('./topic');

const debug = useDebug('api');
const app = express();

// Register body-parser middleware
app.use(json({ extended: true }));

// Register routes
const apiRoutes = express.Router();
apiRoutes.use('/post', postRoutes);
apiRoutes.use('/topic', topicRoutes);
app.use('/api', apiRoutes);

const server = http.createServer(app);

// This function wraps the standard HTTP lib with
// a Promise so that it can be used in an async func
module.exports = () => new Promise((resolve, reject) => {
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
