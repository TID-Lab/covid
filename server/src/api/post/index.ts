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

// Converts an HTTP request body to a Mongoose filter
function bodyToFilter(body) {
  const {
    dates,
    topic,
    category,
    institutions,
    georgia,
    platforms,
    search,
    tags,
  } = body || {};

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

  // tags -> labels
  const includesLabels = [];
  const excludesLabels = [];

  if (category) includesLabels.push(category);

  if (typeof institutions === 'boolean') {
    if (institutions) {
      includesLabels.push('institutional');
    } else {
      excludesLabels.push('institutional');
    }
  }

  if (typeof georgia === 'boolean') {
    if (georgia) {
      includesLabels.push('georgia');
    } else {
      excludesLabels.push('georgia');
    }
  }

  if (includesLabels.length > 0) {
    filter.Labels = { $all: includesLabels };
  }
  if (excludesLabels.length > 0) {
    filter.Labels = {
      ...filter.Labels,
      $nin: excludesLabels,
    };
  }

  // platform
  if (Array.isArray(platforms)) {
    filter.platform = { $in: platforms };
  }

  if (tags && tags.length) {
    filter.tags = tags;
  }

  return filter;
}

function bodyToTagFilter(body) {
  const {
    tags
  } = body || {};

  const filter = {};
  let postIds = [];

  let i: Number;
  let counter = 0;
  for (i = 0; i < tags.length; i++) {
    let j: Number;
    for(j = 0; j < tags[i].posts.length; j++) {
      postIds[counter] = tags[i].posts[j];
      counter++;
    }
  }

  let uniquePostIds = [...new Set(postIds)];

  if (uniquePostIds && puniquePostIds.length) {
    filter.PostId = uniquePostIds;
  }
  return filter;
}

// Returns a page of social media posts using the given search query
routes.post('/:page', async (req, res) => {
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

  const { sortBy } = body;
  let sortParam;
  switch (sortBy) {
    case 'recent':
      sortParam = { authoredAt: -1 };
      break;
    case 'engagementRaw':
      sortParam = { engagementRaw: -1 };
      break;
    case 'engagementNormed':
      sortParam = { engagementNormed: -1 };
      break;
    default:
  }

  const filter = bodyToFilter(body);
  const postsCollection = database.collection('socialmediaposts');
  const postCount = await postsCollection.estimatedDocumentCount();
  const skipCount = pageNum * pageSize;
  const posts = await postsCollection
    .find(filter)
    .sort(sortParam)
    .skip(pageNum * pageSize)
    .limit(pageSize)
    .toArray();
  const lastPage = posts.length === 0 || postCount - (skipCount + posts.length) <= 0;
  res.status(200).send({
    posts,
    lastPage,
  });
});

routes.post('/tagsort/:page'), async (req, res) => {
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

  const tagFilter = bodyToTagFilter(body);
  const postsCollection = database.collection('socialmediaposts');
  const postCount = await postsCollection.estimatedDocumentCount();
  const skipCount = pageNum * pageSize;
  const posts = await postsCollection
    .find(tagFilter)
    .skip(pageNum * pageSize)
    .limit(pageSize)
    .toArray();
  const lastPage = posts.length === 0 || postCount - (skipCount + posts.length) <= 0;
  res.status(200).send({
    posts,
    lastPage,
  });
}

module.exports = routes;
