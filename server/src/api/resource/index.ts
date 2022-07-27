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
const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');
const request = require('request');
const axios = require('axios').default;
const extractor = require('unfluff');
const cheerio = require('cheerio');
const debug = useDebug('api');
import { handleResourceRequest } from '../../util/addResources';

// Returns a page of resource posts using the given search query
routes.get('/', async (req, res) => {
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
  req.body.orgId = id;
  handleResourceRequest(req.body)
    .then((obj) => res.status(obj.status).send(obj.resource))
    .catch((err) => debug(err));
});

// Deletes a resource given URL
routes.delete('/', async (req, res) => {
  const { url } = req.body;
  if (typeof url !== 'string') {
    res.status(400).send();
    return;
  }
  try {
    const result = await Resources.deleteOne({ url: url });

    if (result.deletedCount === 0) {
      res.status(404).send();
      return;
    }
    res.status(200).send(result);
  } catch (err) {
    debug(`${err}`);
    res.status(500).send();
  }
});

// Update a resource via replacement
routes.put('/', async (req, res) => {
  const { url } = req.body;
  const { replacementResource } = req.replacementResource;
  if (typeof url !== 'string') {
    res.status(400).send();
    return;
  }
  try {
    const result = await CustomTag.replaceOne({ url }, { replacementResource });
    if (result.modifiedCount === 0) {
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
