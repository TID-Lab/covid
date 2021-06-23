/* eslint-disable object-shorthand,func-names */

const useDebug = require('debug');
const chalk = require('chalk');
const bcrypt = require('bcrypt');
const Organization = require('../models/organization');
const { auth: { defaultAdmin } } = require('./config');

const debug = useDebug('util');

/**
 * Wraps the bcrypt hash function for async use
 */
function hashPassword(pwd) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(pwd, 10, (err, hash) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(hash);
    });
  });
}

/**
 * Wraps the bcrypt compare function for async use
 */
function comparePassword(pwd, hash) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(pwd, hash, (err, same) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(same);
    });
  });
}

/**
 * Generates a middleware function that returns
 * 401 Unauthorized if a user's organization is
 * not one of the given roles.
 */
function is(...roles) {
  return async function isRole(req, res, next) {
    function respondUnauthorized() {
      if (req.path.startsWith('/api')) {
        res.status(401).send();
      } else {
        res.redirect('/login');
      }
    }

    const { org: id } = req.session;
    if (!id) {
      respondUnauthorized();
      return;
    }
    const org = await Organization.findById(id);
    if (!org) {
      respondUnauthorized();
      return;
    }

    const isARole = roles.reduce(
      (prev, curr) => prev || curr === org.role,
      false,
    );
    if (!isARole) {
      respondUnauthorized();
      return;
    }
    next();
  };
}

/**
 * Creates a new admin organization with the
 * default password if one does not already exist.
 */
async function createAdminOrganization() {
  const adminUser = await Organization.findOne({ role: 'admin' });
  if (!adminUser) {
    const { name, password } = defaultAdmin;
    let hash;
    try {
      hash = await hashPassword(password);
      await Organization.create({ role: 'admin', name, hash });
      debug(chalk.blueBright('Created an admin organization with the default name & password.'));
    } catch (err) {
      debug(`${err}`);
    }
  }
}

module.exports = {
  hashPassword,
  comparePassword,
  is,
  createAdminOrganization,
};
