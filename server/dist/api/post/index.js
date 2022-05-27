// @ts-nocheck
/* eslint-disable no-underscore-dangle */
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
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
    identity,
    institutions,
    georgia,
    platforms,
    search,
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
    filter.authoredAt = Object.assign(Object.assign({}, filter.authoredAt), {
      $lte: new Date(to),
    });
  }
  // topic
  if (topic) {
    filter.topics = topic;
  }
  // tags
  const includesTags = [];
  const excludesTags = [];
  if (category) includesTags.push(category);
  if (identity) includesTags.push(identity);
  if (typeof institutions === 'boolean') {
    if (institutions) {
      includesTags.push('institutional');
    } else {
      excludesTags.push('institutional');
    }
  }
  if (typeof georgia === 'boolean') {
    if (georgia) {
      includesTags.push('georgia');
    } else {
      excludesTags.push('georgia');
    }
  }
  if (includesTags.length > 0) {
    filter.tags = { $all: includesTags };
  }
  if (excludesTags.length > 0) {
    filter.tags = Object.assign(Object.assign({}, filter.tags), {
      $nin: excludesTags,
    });
  }
  // platform
  if (Array.isArray(platforms)) {
    filter.platform = { $in: platforms };
  }
  return filter;
}
// Returns a page of social media posts using the given search query
routes.post('/:page', (req, res) =>
  __awaiter(this, void 0, void 0, function* () {
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
    console.log(filter);
    const postsCollection = database.collection('socialmediaposts');
    const filteredPosts = yield postsCollection.find(filter).toArray();
    const filteredPostCount = filteredPosts.length;
    const skipCount = pageNum * pageSize;
    const posts = yield postsCollection
      .find(filter)
      .sort(sortParam)
      .skip(pageNum * pageSize)
      .limit(pageSize)
      .toArray();
    const lastPage =
      posts.length === 0 || filteredPostCount - (skipCount + posts.length) <= 0;
    res.status(200).send({
      posts,
      lastPage,
    });
  })
);
module.exports = routes;
