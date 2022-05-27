// @ts-nocheck
/* eslint-disable no-underscore-dangle */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// API routes for social media posts
const routes = require('express').Router();
const mongoose = require('mongoose');
const { db: { name: dbName }, api: { posts: { pageSize }, }, } = require('../../util/config');
// Returns a page of resource posts using the given search query
routes.post('/:resource', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const MongoClient = mongoose.connection.client;
    const database = MongoClient.db(dbName);
    const { body, params } = req;
    if (typeof body !== 'object') {
        res.status(400).send();
        return;
    }
    const { page } = params;
    let pageNum = 0;
    try {
        pageNum = parseInt(page, 10);
    }
    catch (_) {
        res.status(400).send();
        return;
    }
    // Sort by some other parameters later.
    const resourcesCollection = database.collection('resources');
    const resourceCount = yield resourcesCollection.estimatedDocumentCount();
    const skipCount = pageNum * pageSize;
    const resources = yield resourcesCollection
        .skip(pageNum * pageSize)
        .limit(pageSize)
        .toArray();
    const lastPage = resources.length === 0 ||
        resourceCount - (skipCount + resources.length) <= 0;
    res.status(200).send({
        resources,
        lastPage,
    });
}));
module.exports = routes;
