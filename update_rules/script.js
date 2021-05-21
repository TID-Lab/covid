/**
 * Updates the Twitter stream rules from Twitter Lists on a regular interval.
 */

const path = require('path');
const TwitterV1 = require('twit');
const TwitterV2 = require('twitter-v2');
const keywords = require('../keywords');

require('dotenv').config(path.resolve(process.cwd(), '..', '.env'));

// how often the rules are updated
const INTERVAL = 300000;

// the maximum number of "positive clauses" in a rule allowed by Twitter
const MAX_POSITIVE_CLAUSE_COUNT = 30;

// the maximum number of stream rules allowed by Twitter
const MAX_RULE_COUNT = 1000;

// the maximum number of characters per rule allowed by Twitter
const MAX_RULE_LENGTH = 1024;

const twitterV1 = new TwitterV1({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

const twitterV2 = new TwitterV2({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
});

function getListsFor(screenName) {
    return new Promise((resolve, reject) => {
        twitterV1.get('lists/ownerships', { screen_name: screenName }, (err, data) => {
            if (err) return reject(err);

            if (typeof data !== 'object' || !Array.isArray(data.lists)) {
                return [];
            }

            resolve(
                data.lists
                    .filter((list) => list.slug.startsWith('radx'))
                    .map((list) => {
                        const { id_str, name } = list;
                        return { id_str, name: name.slice(5).toLowerCase() };
                    })
            );
        });
    });
}

function getListById(id) {
    return new Promise((resolve, reject) => {
        // Note: If lists exceed 5000 members, pagination will be needed.
        twitterV1.get('lists/members', { list_id: id, count: 5000 }, (err, data) => {
            if (err) return reject(err);

            if (typeof data !== 'object' || !Array.isArray(data.users)) {
                [];
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
    const maxRules1 = Math.ceil(((totalChars) + ((5 + 4) * accounts.length - 4) + 2) / (charsLeft * 1.0));

    // maximum rules computed by number of "positive clauses"
    const maxRules2 = Math.ceil((accounts.length * 1.0) / (MAX_POSITIVE_CLAUSE_COUNT - keywords.length));

    // pick the # of rules to be created
    const rulesCreated = Math.min(rulesLeft, Math.max(maxRules1, maxRules2));

    let i = 0;
    while (i < rulesCreated) {
        let expression = '';
        let j = 0;
        while (
            accountsCopy.length > 0
            && expression.length + (accountsCopy[0].length + 7) <= charsLeft
            && j + keywords.length < MAX_POSITIVE_CLAUSE_COUNT
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
    for (let i = 0; i < keywords.length; i += 1) {
        prefix += `${keywords[i]} OR `
    }
    prefix = `(${prefix.slice(0, -4)}) `;
    const charsLeft = MAX_RULE_LENGTH - prefix.length;
    const names = Object.keys(listsByName);
    let i = 0;
    while (i < names.length && rules.length < MAX_RULE_COUNT) {
        const name = names[i];''
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
        const lists = await getListsFor('amyzlc');

        //fetch the accounts from each Twitter List
        for (let i = 0; i < lists.length; i += 1) {
            const { id_str, name } = lists[i];
            const list = await getListById(id_str);
            listsByName[name] = list.sort();
        }

        // generate a set of rules from each Twitter List
        const toAdd = generateRules(listsByName);

        // fetch the old rules
        const toDelete = await getStreamRuleIds();

        // delete the old rules
        await deleteRules(toDelete);

        // ... We have a second or two of inevitable stream downtime here :/

        // add the new rules
        await addRules(toAdd);

        // done! :-)
        console.log('Rules updated.');
    } catch (err) {
        console.log(err);
    }
}

(async () => {
    await update();
    setInterval(update, INTERVAL);
})();
