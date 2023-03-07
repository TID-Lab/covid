#! /usr/bin/env node

// Just use the command "node populateDB.js" to run!
console.log('This script populates some sample nudges and participants to your database. Check out the sample data at ./sampleData.js');

const db2 = require('./util/db');
const { addResourcesFromCSV } = require('./util/addResources');

(async () => {
  try {
    // Initialize the database connection
    console.log('connecting to db...');
    await db2();
    console.log('connected to db');
    await addResourcesFromCSV('../covid_res.csv');
    console.log('created resources');
  } catch (e) {
    console.log('failed to populate database', e);
  }
})();
