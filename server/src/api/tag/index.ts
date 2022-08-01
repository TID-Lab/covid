/* eslint-disable no-param-reassign */
//@ts-nocheck
// API routes for partner organizations

const useDebug = require('debug');
const routes = require('express').Router();
const Organization = require('../../models/organization');
const CustomTag = require('../../models/customtag.js');

const debug = useDebug('api');

// Returns all of the tags for a given organization
routes.get('/', async (req, res) => {
  const session = req.session;
  if (!session) {
    res.status(401).send();
    return;
  }
  const id = req.session.org;
  if (!id) {
    res.status(401).send();
    return;
  }
  const org = await Organization.findById(id);
  if (!org) {
    res.status(401).send();
    return;
  }

  let tags;
  try {
    tags = await CustomTag.find({ organization: org });
  } catch (err) {
    debug(`${err}`);
    res.status(500).send();
    return;
  }
  // Not sure if necc
  // tags.forEach((tag) => strip(tag));
  res.status(200).send(tags);
});

// Posts a new tag
routes.post('/', async (req, res) => {
  // Not sure if redundant to check
  const id = req.session.org;
  if (!id) {
    res.status(401).send();
    return;
  }
  const org = await Organization.findById(id);
  if (!org) {
    res.status(401).send();
    return;
  }

  req.body.organization = org;
  try {
    console.log(req.body);
    const tag = await CustomTag.create(req.body);
    res.status(200).send(tag);
  } catch (err) {
    debug(`${err}`);
    res.status(500).send(err);
  }
});

// Update a tag via replacement
routes.put('/replace', async (req, res) => {
  const { tag, replacementTag } = req.body;
  const _id = tag._id;
  const replacement = replacementTag;
  if (typeof tag._id !== 'string') {
    res.status(400).send();
    return;
  }
  try {
    const result = await CustomTag.replaceOne({ _id }, replacement);
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

// Deletes a tag
routes.delete('/delete', async (req, res) => {
  const { _id } = req.body;
  if (typeof _id !== 'string') {
    res.status(400).send();
    return;
  }
  try {
    const result = await CustomTag.deleteOne({ _id });
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
