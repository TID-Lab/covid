/* eslint-disable no-param-reassign */

// API routes for partner organizations

const useDebug = require('debug');
const routes = require('express').Router();
const Organization = require('../../models/organization');
const CustomTag = require('../../models/customtag.js');

const debug = useDebug('api');

// Returns all of the tags for a given organization
routes.get('/', async (req, res) => {
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
  CustomTag.create(req.body, function(err, tag) {
    err = Error.decode(err);
    if (err) {
      console.log(err);
      res.send(err.status, err.message);
    } else {
      res.send(200, tag);
    }
  });
});


// Update a tag [TODO]
routes.post('/:id', async (req, res) => {
  CustomTag.findById(req.params.id, function(err, tag) {
    if (err) return res.send(err.status, err.message);
    if (!tag) return res.send(404);
    // Update the actual values
    // tag = _.extend(tag, _.omit(req.body, 'creator'));

    // Update the values
    tag.save(function(err) {
      if (err) {
        res.send(err.status, err.message);
      } else {
        res.send(200);
      }
    });
  });
})


module.exports = routes;
