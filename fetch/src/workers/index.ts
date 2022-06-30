// @ts-nocheck
const { Worker } = require('worker_threads');

const INTERVAL = 300000; // 5 minutes

let crowdtangleLists = {};

function getCrowdTangleLists() {
  return crowdtangleLists;
}

function callWorker(path, callback) {
  const worker = new Worker(path);
  worker.on('message', callback.bind(null));
  worker.on('error', callback);
}

async function scheduleWorker(path, callback) {
  callWorker(path, callback);
  setTimeout(callWorker.bind(null, path, callback), INTERVAL);
}

// Schedules each worker listed to run on a regular interval
async function initialize() {
  scheduleWorker('./dist/workers/update_twitter_rules.js', () => {});
  scheduleWorker('./dist/workers/sync_crowdtangle_lists.js', (lists) => {
    crowdtangleLists = lists;
  });
}

module.exports = {
  initialize,
  getCrowdTangleLists,
};
