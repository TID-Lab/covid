/* eslint-disable no-underscore-dangle */

const routes = require('express').Router();
const mongoose = require('mongoose');

const MongoClient = mongoose.connection.client;
const aggieDB = MongoClient.db('aggie');

function bodyToFilter(body) {
  const {
    dates,
    topics,
    sourceFilters,
    platforms,
  } = body;

  const filter = {};

  // dates
  const { from, to } = dates || {};
  if (from) {
    filter.authoredAt = { $gte: new Date(from) };
  }
  if (to) {
    filter.authoredAt = {
      ...filter.authoredAt,
      $lte: to,
    };
  }

  // topics
  if (Array.isArray(topics) && topics.length > 0) {
    filter.topics = { $all: topics };
  }

  // source filters
  if (Array.isArray(sourceFilters) && sourceFilters.length > 0) {
    filter['metadata.lists'] = { $all: sourceFilters };
  }

  // media
  if (Array.isArray(platforms) && platforms.length > 0) {
    filter._media = { $in: platforms };
  }

  return filter;
}

routes.get('/', async (req, res) => {
  const { body } = req;
  if (!body) {
    res.status(400).send();
    return;
  }
  const filter = bodyToFilter(body);
  const reportsCollection = aggieDB.collection('reports');
  const reports = await reportsCollection.find(filter).toArray();
  res.status(200).send(reports);
});

module.exports = routes;
