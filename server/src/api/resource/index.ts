// @ts-nocheck
/* eslint-disable no-underscore-dangle */

// API routes for resources

const routes = require('express').Router();
const mongoose = require('mongoose');
const useDebug = require('debug');
const Resources = require('../../models/resource');
const Organization = require('../../models/organization');
const {
  db: { name: dbName },
  api: {
    posts: { pageSize },
  },
} = require('../../util/config');

const debug = useDebug('api');

// Returns a page of resource posts using the given search query
routes.get('/', async (req, res) => {
/*   const MongoClient = mongoose.connection.client;
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
  }); */

  let resources;
  try {
    resources = await Resources.find({});
  } catch (err) {
    debug(`${err}`);
    res.status(500).send();
  }
  res.status(200).send(resources);
});

// Creates a new Resource
routes.post('/', async (req, res) => {
  if (typeof req.body !== 'object') {
    res.status(400).send();
  }
  const id = req.session.org;
  if (!id) {
    res.status(401).send();
    return;
  }
  const organization = await Organization.findById(id);
  if (!organization) {
    res.status(401).send();
    return;
  }

  req.body.organization = organization;
  const {
    authoredAt,
    fetchedAt,
    author,
    name,
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
      organization,
      name,
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
