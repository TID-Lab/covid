// API routes for COVID-19 topics

const useDebug = require('debug');
const routes = require('express').Router();
const Topic = require('../../models/topic');

const debug = useDebug('api');

/**
 * Returns all COVID-19 topics
 */
routes.get('/', async (req, res) => {
  try {
    const topics = await Topic.find();
    res.status(200).json(topics);
  } catch (err) {
    debug(`${err}`);
    res.status(500).send();
  }
});

/**
 * Creates a new COVID-19 topic
 */
routes.post('/', async (req, res) => {
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
    await topic.save();
    res.status(200).json(topic.toJSON());
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).send();
      return;
    }
    debug(`${err}`);
    res.status(500).send();
  }
});

/**
 * Updates a COVID-19 topic
 */
routes.put('/', async (req, res) => {
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
    const topic = await Topic.findById(_id);
    if (!topic) {
      res.status(404).send();
      return;
    }
    topic.name = name;
    topic.keywords = keywords;
    await topic.save();
    res.status(200).json(topic.toJSON());
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).send();
      return;
    }
    debug(`${err}`);
    res.status(500).send();
  }
});

/**
 * Deletes a COVID-19 topic
 */
routes.delete('/', async (req, res) => {
  if (typeof req.body !== 'object') {
    res.status(400).send();
    return;
  }
  const { _id } = req.body;

  try {
    const result = await Topic.deleteOne({ _id });
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
