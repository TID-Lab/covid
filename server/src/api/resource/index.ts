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

// Converts an HTTP request body to a Mongoose filter
function bodyToFilter(body) {
  const { dates, topic, search } = body || {};

  const filter = {};

  // search
  if (search) filter.$text = { $search: search };

  // dates
  const { from, to } = dates || {};
  if (from) {
    filter.authoredAt = { $gte: new Date(from) };
  }
  if (to) {
    filter.authoredAt = {
      ...filter.authoredAt,
      $lte: new Date(to),
    };
  }

  // topic
  if (topic) {
    filter.topics = topic;
  }

  return filter;
}

routes.post('/screenshot', async (req, res) => {
  const website = req.body['website'];

  if (!website || !website.length) {
    return res.status(404).send('Please provide website URL.');
  }

  const captureWebsite = await import('capture-website').then(
    (pkg) => pkg.default
  );

  const base64 = await captureWebsite.base64(req.body['website'], {
    scaleFactor: 0.25,
  });

  res.status(200).send(base64);
});

// Returns a page of resource posts using the given search query
routes.post('/:page', async (req, res) => {
  try {
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

    const { sortBy } = body;
    let sortParam;
    switch (sortBy) {
      case 'recent':
        sortParam = { authoredAt: -1 };
        break;
    }
    const filter = bodyToFilter(body);
    console.log(filter);
    const filteredResources = await Resources.find(filter);
    const filteredResCount = filteredResources.length;
    const skipCount = pageNum * pageSize;
    const resources = await Resources.find(filter)
      .sort(sortParam)
      .skip(pageNum * pageSize)
      .limit(pageSize);
    const lastPage =
      resources.length === 0 ||
      filteredResCount - (skipCount + resources.length) <= 0;
    res.status(200).send({
      resources,
      lastPage,
    });
  } catch (err) {
    debug(`${err}`);
    res.status(500).send();
  }
  res.status(500).send();
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
