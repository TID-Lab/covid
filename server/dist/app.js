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
const useDebug = require('debug');
const chalk = require('chalk');
const db = require('./util/db');
const api = require('./api');
const { createAdminOrganization } = require('./util/org');
const debug = useDebug('core');
/**
 * Initializes each primary module of the system.
 */
(() => __awaiter(this, void 0, void 0, function* () {
    debug('Initializing system...');
    try {
        // Initialize the database connection
        yield db();
        // Initialize the API
        yield api();
        // Create the default admin org if one does not exist
        yield createAdminOrganization();
        debug(chalk.greenBright('System initialized.'));
    }
    catch (e) {
        debug(chalk.redBright('Initialization failed.'));
    }
}))();
