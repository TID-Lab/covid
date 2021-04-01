const useDebug = require('debug');
const routes = require('express').Router();

const debug = useDebug('api');

// TODO remove
routes.get('/hello', (req, res) => {
  res.status(200).send('<h1>Hello, World!</h1>');
  debug('Hello, World!');
});

module.exports = routes;
