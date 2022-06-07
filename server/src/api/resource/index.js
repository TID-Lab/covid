/* eslint-disable no-underscore-dangle */

// API routes for resources

const routes = require('express').Router();
const mongoose = require('mongoose');
const useDebug = require('debug');
const Resources = require('../../models/resource');
const {
  db: { name: dbName },
  api: { posts: { pageSize } },
} = require('../../util/config');

const debug = useDebug('api');

// Returns a page of resource posts using the given search query
routes.get('/:page', async (req, res) => {
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
  const lastPage = resources.length === 0 || (resourceCount - (skipCount + resources.length)) <= 0;
  res.status(200).send({
    resources,
    lastPage,
  });
});

// Creates a new Resource
routes.post('/', async (req, res) => {
  if (typeof req.body !== 'object') {
    res.status(400).send();
  }
  const {
    authoredAt,
    fetchedAt,
    author,
    url,
    type,
    topics,
    platformID,
    content,
    imageurl,
  } = req.body;
  try {
    const resour = await Resources.create({
      authoredAt,
      fetchedAt,
      author,
      url,
      type,
      topics,
      platformID,
      content,
      imageurl,
    });
    res.status(200).send(resour);
  } catch (err) {
    debug(`${err}`);
    res.status(500).send();
  }
});

// Deletes a resource given URL
routes.delete('/', async (req, res) => {
  const { url } = req.body;
  if (typeof url !== 'string') {
    res.status(400).send();
    return;
  }
  try {
    const result = await Resources.deleteOne({ url });
    if (result.deletedCount === 0) {
      res.status(404).send();
      return;
    }
    res.status(200).send();
  } catch (err) {
    debug(`${err}`);
    res.status(500).send();
  }
});

module.exports = routes;
