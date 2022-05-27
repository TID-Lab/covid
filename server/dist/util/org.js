// @ts-nocheck
/* eslint-disable object-shorthand,func-names */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const useDebug = require('debug');
const chalk = require('chalk');
const bcrypt = require('bcrypt');
const Organization = require('../models/organization');
const { auth: { defaultAdmin }, } = require('./config');
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
    return function isRole(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            function respondUnauthorized() {
                if (req.path.startsWith('/api')) {
                    res.status(401).send();
                }
                else {
                    res.redirect('/login');
                }
            }
            const { org: id } = req.session;
            if (!id) {
                respondUnauthorized();
                return;
            }
            const org = yield Organization.findById(id);
            if (!org) {
                respondUnauthorized();
                return;
            }
            const isARole = roles.reduce((prev, curr) => prev || curr === org.role, false);
            if (!isARole) {
                respondUnauthorized();
                return;
            }
            next();
        });
    };
}
/**
 * Creates a new admin organization with the
 * default password if one does not already exist.
 */
function createAdminOrganization() {
    return __awaiter(this, void 0, void 0, function* () {
        const adminUser = yield Organization.findOne({ role: 'admin' });
        if (!adminUser) {
            const { name, password } = defaultAdmin;
            let hash;
            try {
                hash = yield hashPassword(password);
                yield Organization.create({ role: 'admin', name, hash });
                debug(chalk.blueBright('Created an admin organization with the default name & password.'));
            }
            catch (err) {
                debug(`${err}`);
            }
        }
    });
}
module.exports = {
    hashPassword,
    comparePassword,
    is,
    createAdminOrganization,
};
