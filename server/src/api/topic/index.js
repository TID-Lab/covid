const useDebug = require('debug');
const routes = require('express').Router();
const Topic = require('../../models/topic');

const debug = useDebug('api');

routes.get('/', async (req, res) => {
  try {
    const topics = await Topic.find();
    res.status(200).json(topics);
  } catch (err) {
    debug(`${err}`);
    res.status(500).send();
  }
});

routes.post('/', async (req, res) => {
  if (typeof req.body !== 'object') {
    res.status(400).send();
    return;
  }
  try {
    const topic = new Topic(req.body);
    const unique = await Topic.isNameUnique(topic);
    if (!unique) {
      res.status(409).send();
      return;
    }
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

routes.put('/', async (req, res) => {
  if (typeof req.body !== 'object') {
    res.status(400).send();
    return;
  }
  const { id, name, keywords } = req.body;

  try {
    const topic = await Topic.findById(id);
    if (!topic) {
      res.status(404).send();
      return;
    }
    if (name !== topic.name) {
      const unique = await Topic.isNameUnique({ name });
      if (!unique) {
        res.status(409).send();
        return;
      }
      topic.name = name;
    }
    topic.keywords = keywords;
    await topic.save();
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).send();
      return;
    }
    debug(`${err}`);
    res.status(500).send();
  }
});

routes.delete('/', async (req, res) => {
  if (typeof req.body !== 'object') {
    res.status(400).send();
    return;
  }
  const { id } = req.body;

  try {
    const result = await Topic.findByIdAndDelete(id);
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
