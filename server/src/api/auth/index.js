// API routes for user authentication

const useDebug = require('debug');
const routes = require('express').Router();
const Organization = require('../../models/organization');
const { comparePassword } = require('../../util/org');

const debug = useDebug('api');

/**
 * A login endpoint that issues a new cookie
 * when supplied with a valid user name & password.
 */
routes.post('/login', async (req, res) => {
  if (typeof req.body !== 'object') {
    res.status(400).send();
    return;
  }
  const { name, pwd } = req.body;

  // validate user name & password
  let org;
  try {
    org = await Organization.findOne({ name });
    if (!org) {
      res.redirect('/login');
      return;
    }
  } catch (err) {
    debug(`${err}`);
    res.status(500).send();
    return;
  }
  let same;
  try {
    same = await comparePassword(pwd, org.hash);
  } catch (err) {
    debug(`${err}`);
    res.status(500).send();
    return;
  }
  if (!same) {
    res.redirect('/login');
    return;
  }

  // log the user in
  const { _id } = org;
  req.session.org = _id;

  res.redirect('/');
});

/**
 * Logs a user out from their organization.
 */
routes.post('/logout', async (req, res) => {
  req.session.org = undefined;
  res.redirect('/');
});

/**
 * Checks whether the user is logged into their organization.
 */
routes.get('/check', async (req, res) => {
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
  res.status(200).send();
});

module.exports = routes;
