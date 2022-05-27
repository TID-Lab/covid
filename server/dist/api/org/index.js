// @ts-nocheck
/* eslint-disable no-param-reassign */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// API routes for partner organizations
const useDebug = require('debug');
const routes = require('express').Router();
const Organization = require('../../models/organization');
const { hashPassword } = require('../../util/org');
const { is } = require('../../util/org');
const debug = useDebug('api');
function strip(org) {
    org.hash = undefined;
}
// Returns all of the partner organizations
routes.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
    let orgs;
    try {
        orgs = yield Organization.find({});
    }
    catch (err) {
        debug(`${err}`);
        res.status(500).send();
        return;
    }
    orgs.forEach((org) => strip(org));
    res.status(200).send(orgs);
}));
// Creates a partner organization.
routes.post('/', is('admin'), (req, res) => __awaiter(this, void 0, void 0, function* () {
    if (typeof req.body !== 'object') {
        res.status(400).send();
        return;
    }
    const { name, pwd } = req.body;
    let hash;
    try {
        hash = yield hashPassword(pwd);
    }
    catch (err) {
        debug(`${err}`);
        res.status(500).send();
        return;
    }
    try {
        const org = yield Organization.findOne({ name });
        if (org) {
            res.status(409).send();
            return;
        }
    }
    catch (err) {
        debug(`${err}`);
        res.status(500).send();
        return;
    }
    try {
        const org = yield Organization.create({ name, hash });
        strip(org);
        res.status(200).send(org);
    }
    catch (err) {
        debug(`${err}`);
        res.status(500).send();
    }
}));
// Updates a partner organization.
routes.put('/', is('admin'), (req, res) => __awaiter(this, void 0, void 0, function* () {
    if (typeof req.body !== 'object') {
        res.status(400).send();
        return;
    }
    const { _id, name, pwd } = req.body;
    let org;
    try {
        org = yield Organization.findById(_id);
        if (!org) {
            res.status(404).send();
            return;
        }
    }
    catch (err) {
        debug(`${err}`);
        res.status(500).send();
        return;
    }
    org.name = name;
    if (pwd) {
        let hash;
        try {
            hash = yield hashPassword(pwd);
        }
        catch (err) {
            debug(`${err}`);
            res.status(500).send();
            return;
        }
        org.hash = hash;
    }
    try {
        yield org.save();
        res.status(200).send(org);
    }
    catch (err) {
        debug(`${err}`);
        res.status(500).send();
    }
}));
// Deletes a partner organization.
routes.delete('/:id', is('admin'), (req, res) => __awaiter(this, void 0, void 0, function* () {
    const { id } = req.params;
    if (typeof id !== 'string') {
        res.status(400).send();
        return;
    }
    try {
        yield Organization.deleteOne({ _id: id });
        res.status(200).send();
    }
    catch (err) {
        debug(`${err}`);
        res.status(500).send();
    }
}));
module.exports = routes;
