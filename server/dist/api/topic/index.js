// @ts-nocheck
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
// API routes for COVID-19 topics
const useDebug = require('debug');
const routes = require('express').Router();
const Topic = require('../../models/topic');
const debug = useDebug('api');
/**
 * Returns all COVID-19 topics
 */
routes.get('/', (req, res) =>
  __awaiter(this, void 0, void 0, function* () {
    try {
      const topics = yield Topic.find();
      res.status(200).json(topics);
    } catch (err) {
      debug(`${err}`);
      res.status(500).send();
    }
  })
);
/**
 * Creates a new COVID-19 topic
 */
routes.post('/', (req, res) =>
  __awaiter(this, void 0, void 0, function* () {
    if (typeof req.body !== 'object') {
      res.status(400).send();
      return;
    }
    const { name, keywords: rawKeywords } = req.body;
    if (!Array.isArray(rawKeywords)) {
      res.status(400).send();
      return;
    }
    const keywords = rawKeywords.map((keyword) => keyword.toLowerCase());
    try {
      const topic = new Topic({ name, keywords });
      yield topic.save();
      res.status(200).json(topic.toJSON());
    } catch (err) {
      if (err.name === 'ValidationError') {
        res.status(400).send();
        return;
      }
      debug(`${err}`);
      res.status(500).send();
    }
  })
);
/**
 * Updates a COVID-19 topic
 */
routes.put('/', (req, res) =>
  __awaiter(this, void 0, void 0, function* () {
    if (typeof req.body !== 'object') {
      res.status(400).send();
      return;
    }
    const { _id, name, keywords: rawKeywords } = req.body;
    if (!Array.isArray(rawKeywords)) {
      res.status(400).send();
      return;
    }
    const keywords = rawKeywords.map((keyword) => keyword.toLowerCase());
    try {
      const topic = yield Topic.findById(_id);
      if (!topic) {
        res.status(404).send();
        return;
      }
      topic.name = name;
      topic.keywords = keywords;
      yield topic.save();
      res.status(200).json(topic.toJSON());
    } catch (err) {
      if (err.name === 'ValidationError') {
        res.status(400).send();
        return;
      }
      debug(`${err}`);
      res.status(500).send();
    }
  })
);
/**
 * Deletes a COVID-19 topic
 */
routes.delete('/', (req, res) =>
  __awaiter(this, void 0, void 0, function* () {
    if (typeof req.body !== 'object') {
      res.status(400).send();
      return;
    }
    const { _id } = req.body;
    try {
      const result = yield Topic.deleteOne({ _id });
      if (result.deletedCount === 0) {
        res.status(404).send();
        return;
      }
      res.status(200).send();
    } catch (err) {
      debug(`${err}`);
      res.status(500).send();
    }
  })
);
module.exports = routes;
