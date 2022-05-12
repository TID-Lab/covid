/**
 * A handy script that updates the Twitter stream rules from Twitter Lists.
 *
 * Once this script is complete, the Twitter stream will return posts
 * from the authors in those Twitter Lists :-)
 */

const TwitterV1 = require('twit');
const TwitterV2 = require('twitter-v2');
const { parentPort } = require('worker_threads');
const { COVID_KEYWORDS } = require('../constants');
const { fetch: { credentials: { twitter } } } = require('../util/config');

const TWITTER_SCREEN_NAME = 'amyzlc';

// the maximum number of "positive clauses" in a rule allowed by Twitter
const MAX_POSITIVE_CLAUSE_COUNT = 30;

// the maximum number of stream rules allowed by Twitter
const MAX_RULE_COUNT = 1000;

// the maximum number of characters per rule allowed by Twitter
const MAX_RULE_LENGTH = 1024;

const twitterV1 = new TwitterV1({
  consumer_key: twitter.consumerKey,
  consumer_secret: twitter.consumerSecret,
  access_token: twitter.accessToken,
  access_token_secret: twitter.accessTokenSecret,
});

const twitterV2 = new TwitterV2({
  consumer_key: twitter.consumerKey,
  consumer_secret: twitter.consumerSecret,
});

function getListsFor(screenName) {
  return new Promise((resolve, reject) => {
    // Bug here??
    twitterV1.get('lists/ownerships', { screen_name: screenName }, (err, data) => {
      if (err) {
        reject(err);
        console.log('error in getListsFor')
        return;
      }

      if (typeof data !== 'object' || !Array.isArray(data.lists)) {
        resolve([]);
        return;
      }

      resolve(
        data.lists
          .filter((list) => list.name.toLowerCase().startsWith('radx'))
          .map((list) => {
            const { id_str, name } = list;
            return { id_str, name: name.slice(5).toLowerCase() };
          }),
      );
    });
  });
}

function getListById(id) {
  return new Promise((resolve, reject) => {
    // Note: If lists exceed 5000 members, pagination will be needed.
    twitterV1.get('lists/members', { list_id: id, count: 5000 }, (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      if (typeof data !== 'object' || !Array.isArray(data.users)) {
        resolve([]);
        return;
      }
      resolve(
        data.users
          .map((user) => user.screen_name),
      );
    });
  });
}

async function getStreamRuleIds() {
  const rules = await twitterV2.get('tweets/search/stream/rules', {});
  const { data } = rules;
  if (!Array.isArray(data)) {
    return [];
  }
  return data.map(({ id }) => id);
}

function generateRuleExpressions(accounts, charsLeft, rulesLeft) {
  if (accounts.length === 0) return [];

  const expressions = [];
  const accountsCopy = accounts.slice();
  const totalChars = accounts.reduce((acc, curr) => acc + curr.length, 0);

  // maximum rules computed by available characters
  const maxRules1 = Math
    .ceil(((totalChars) + ((5 + 4) * accounts.length - 4) + 2) / (charsLeft * 1.0));

  // maximum rules computed by number of "positive clauses"
  const maxRules2 = Math
    .ceil((accounts.length * 1.0) / (MAX_POSITIVE_CLAUSE_COUNT - COVID_KEYWORDS.length));

  // pick the # of rules to be created
  const rulesCreated = Math.min(rulesLeft, Math.max(maxRules1, maxRules2));

  let i = 0;
  while (i < rulesCreated) {
    let expression = '';
    let j = 0;
    while (
      accountsCopy.length > 0
            && expression.length + (accountsCopy[0].length + 7) <= charsLeft
            && j + COVID_KEYWORDS.length < MAX_POSITIVE_CLAUSE_COUNT
    ) {
      const account = accountsCopy.shift();
      expression += `from:${account} OR `;
      j += 1;
    }
    expression = expression.slice(0, -4);
    expressions.push(expression);
    i += 1;
  }
  return expressions;
}

function generateRules(listsByName) {
  const rules = [];
  let prefix = '';
  for (let i = 0; i < COVID_KEYWORDS.length; i += 1) {
    prefix += `${COVID_KEYWORDS[i]} OR `;
  }
  prefix = `(${prefix.slice(0, -4)}) `;
  const charsLeft = MAX_RULE_LENGTH - prefix.length;
  const names = Object.keys(listsByName);
  let i = 0;
  while (i < names.length && rules.length < MAX_RULE_COUNT) {
    const name = names[i];
    const accounts = listsByName[name];
    const expressions = generateRuleExpressions(accounts, charsLeft, MAX_RULE_COUNT - rules.length);
    for (let j = 0; j < expressions.length; j += 1) {
      rules.push({
        tag: name,
        value: `${prefix}(${expressions[j]})`,
      });
    }
    i += 1;
  }
  return rules;
}

async function deleteRules(toDelete) {
  const body = {};
  if (toDelete.length > 0) {
    body.delete = { ids: toDelete };
  }
  return twitterV2.post('tweets/search/stream/rules', body);
}

async function addRules(toAdd) {
  const body = {};
  if (toAdd.length > 0) {
    body.add = toAdd;
  }
  return twitterV2.post('tweets/search/stream/rules', body);
}

async function update() {
  try {
    const listsByName = {};

    // fetch the latest Twitter Lists
    const lists = await getListsFor(TWITTER_SCREEN_NAME);
    // Bug here?? nothing is console-logging, so it breaks before this
    console.log('lists: ', lists);

    // fetch the accounts from each Twitter List
    const promises = [];
    for (let i = 0; i < lists.length; i += 1) {
      const { id_str } = lists[i];
      promises.push(getListById(id_str));
    }
    const accountsList = await Promise.all(promises);
    console.log('accountsList: ', accountsList);

    for (let i = 0; i < lists.length; i += 1) {
      const { name } = lists[i];
      const accounts = accountsList[i];
      listsByName[name] = accounts.sort();
    }

    // generate a set of rules from each Twitter List
    const toAdd = generateRules(listsByName);
    console.log('toAdd length:', toAdd.length);
    console.log('toAdd:', toAdd);

    // fetch the old rules
    const toDelete = await getStreamRuleIds();
    console.log('toDelete length:', toDelete.length);
    console.log('toDelete:', toDelete);

    // delete the old rules
    if (toDelete.length > 0) await deleteRules(toDelete);

    // ... We have a second or two of inevitable stream downtime here :/

    // add the new rules
    if (toAdd.length > 0) await addRules(toAdd);

    // done! :-)
    console.log('Twitter rules updated.');
  } catch (err) {
    console.log(err);
  }
}

update().then(() => {
  parentPort.postMessage(null);
});
