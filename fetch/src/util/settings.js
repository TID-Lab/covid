// A shared settings JSON object that is stored in our MongoDB database.

const mongoose = require('mongoose');
const { db: { name } } = require('./config');

let collection;

/**
 * Returns the current settings JSON object.
 */
async function get() {
  if (!collection) {
    collection = mongoose.connection.client.db(name).collection('fetch');
  }

  const settings = await collection.findOne({ settings: true });
  if (!settings) return {};
  return settings;
}

/**
 * Updates a property of the settings JSON object & saves it to the database.
 */
async function set(key, value) {
  if (!collection) {
    collection = mongoose.connection.db(name).collection('fetch');
  }

  const updateDoc = { $set: { } };
  updateDoc.$set[key] = value;
  await collection.updateOne({ settings: true }, updateDoc, { upsert: true });
}

module.exports = { get, set };
