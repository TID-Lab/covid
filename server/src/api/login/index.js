const useDebug = require('debug');
const routes = require('express').Router();
const Organization = require('../../models/organization');
const { comparePassword } = require('../../util/org');

const debug = useDebug('api');

/**
 * A login endpoint that issues a new cookie
 * when supplied with a valid user name & password.
 */
routes.post('/', async (req, res) => {
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
      res.status(403).send();
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
    res.status(403).send();
    return;
  }

  // log the user in
  const { _id } = org;
  req.session.org = _id;

  res.status(200).send();
});

module.exports = routes;
