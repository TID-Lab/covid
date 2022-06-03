// @ts-nocheck
/* eslint-disable no-underscore-dangle */

// API routes for social media posts

const routes = require('express').Router();
const mongoose = require('mongoose');
const {
  db: { name: dbName },
  api: {
    posts: { pageSize },
  },
} = require('../../util/config');

// Returns a page of resource posts using the given search query
routes.post('/:resource', async (req, res) => {
  const MongoClient = mongoose.connection.client;
  const database = MongoClient.db(dbName);

  const { body, params } = req;
  if (typeof body !== 'object') {
    res.status(400).send();
    return;
  }

  const { page } = params;
  let pageNum = 0;
  try {
    pageNum = parseInt(page, 10);
  } catch (_) {
    res.status(400).send();
    return;
  }

  // Sort by some other parameters later.

  const resourcesCollection = database.collection('resources');
  const resourceCount = await resourcesCollection.estimatedDocumentCount();
  const skipCount = pageNum * pageSize;
  const resources = await resourcesCollection
    .skip(pageNum * pageSize)
    .limit(pageSize)
    .toArray();
  const lastPage =
    resources.length === 0 ||
    resourceCount - (skipCount + resources.length) <= 0;
  res.status(200).send({
    resources,
    lastPage,
  });
});

module.exports = routes;
