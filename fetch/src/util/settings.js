const mongoose = require('mongoose');
const { db: { name } } = require('./config');

let collection;

async function get() {
  if (!collection) {
    collection = mongoose.connection.client.db(name).collection('fetch');
  }

  const settings = await collection.findOne({ settings: true });
  if (!settings) return {};
  return settings;
}

async function set(key, value) {
  if (!collection) {
    collection = mongoose.connection.db(name).collection('fetch');
  }

  const updateDoc = { $set: { } };
  updateDoc.$set[key] = value;
  await collection.updateOne({ settings: true }, updateDoc, { upsert: true });
}

module.exports = { get, set };
