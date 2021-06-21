/* eslint-disable no-param-reassign */
const useDebug = require('debug');
const routes = require('express').Router();
const Organization = require('../../models/organization');
const { hashPassword } = require('../../util/org');
const { is } = require('../../util/org');

const debug = useDebug('api');

function strip(org) {
  org.hash = undefined;
}

routes.get('/', is('org', 'admin'), async (req, res) => {
  let orgs;
  try {
    orgs = await Organization.find({});
  } catch (err) {
    debug(`${err}`);
    res.status(500).send();
    return;
  }
  orgs.forEach((org) => strip(org));
  res.status(200).send();
});

routes.post('/', is('admin'), async (req, res) => {
  if (typeof req.body !== 'object') {
    res.status(400).send();
    return;
  }
  const { name, pwd } = req.body;

  let hash;
  try {
    hash = await hashPassword(pwd);
  } catch (err) {
    debug(`${err}`);
    res.status(500).send();
    return;
  }

  try {
    const org = await Organization.find({ name });
    if (org) {
      res.status(409).send();
      return;
    }
  } catch (err) {
    debug(`${err}`);
    res.status(500).send();
    return;
  }
  try {
    const org = await Organization.create({ name, hash });
    strip(org);
    res.status(200).send(org);
  } catch (err) {
    debug(`${err}`);
    res.status(500).send();
  }
});

routes.put('/', is('admin'), async (req, res) => {
  if (typeof req.body !== 'object') {
    res.status(400).send();
    return;
  }
  const { _id, name, pwd } = req.body;
  let org;
  try {
    org = await Organization.findById(_id);
    if (!org) {
      res.status(404).send();
      return;
    }
  } catch (err) {
    debug(`${err}`);
    res.status(500).send();
    return;
  }

  let hash;
  try {
    hash = await hashPassword(pwd);
  } catch (err) {
    debug(`${err}`);
    res.status(500).send();
    return;
  }

  org.name = name;
  org.hash = hash;

  try {
    await org.save();
    res.status(200).send(org);
  } catch (err) {
    debug(`${err}`);
    res.status(500).send();
  }
});

routes.delete('/:id', is('admin'), async (req, res) => {
  const { id } = req.params;
  if (typeof id !== 'string') {
    res.status(400).send();
    return;
  }
  try {
    await Organization.deleteOne({ _id: id });
    res.status(200).send();
  } catch (err) {
    debug(`${err}`);
    res.status(500).send();
  }
});

module.exports = routes;
