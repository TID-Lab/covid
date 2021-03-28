const mongoose = require('mongoose');
const useDebug = require('debug');
const chalk = require('chalk');
const { isMainThread } = require('worker_threads');
const config = require('./config');

const dbg = useDebug('db');

/**
 * Logs messages only in the main thread
 * @param {String} msg The message to log
 */
const debug = (msg) => {
  if (isMainThread) {
    dbg(msg);
  }
};

/**
 * Establishes a connection to MongoDB if one does not already exist.
 */
module.exports = async (dbName, dbUrl) => {
  if (mongoose.connections[0].readyState) return;

  const url = dbUrl || config.db.url;
  const name = dbName || config.db.name;

  debug('Connecting to database...');

  await mongoose
    .connect(url, {
      dbName: name,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .catch((error) => {
      debug(chalk.redBright('Database connection failed. ↓'));
      debug(` > ${error}`);
      throw error;
    })
    .then(() => {
      debug('Database connected.');
    });
};
