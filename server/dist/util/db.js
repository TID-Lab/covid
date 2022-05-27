// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const mongoose = require('mongoose');
const useDebug = require('debug');
const chalk = require('chalk');
const config = require('./config');
const debug = useDebug('db');
/**
 * Establishes a connection to MongoDB if one does not already exist.
 */
module.exports = (dbName, dbUrl) => __awaiter(this, void 0, void 0, function* () {
    if (mongoose.connections[0].readyState)
        return;
    const url = dbUrl || config.db.url;
    const name = dbName || config.db.name;
    debug('Connecting to database...');
    yield mongoose
        .connect(url, {
        dbName: name,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    })
        .catch((error) => {
        debug(chalk.redBright('Database connection failed. ↓'));
        debug(` > ${error}`);
        throw error;
    })
        .then(() => {
        debug('Database connected.');
    });
});
