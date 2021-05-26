/* eslint-disable no-await-in-loop */
/**
 * Downloads a local copy of the CrowdTangle Lists.
 */

const axios = require('axios').default;
const { URL } = require('url');
const { parentPort } = require('worker_threads');

const {
  fetch: {
    credentials: {
      instagram: instagramToken,
      facebook: facebookToken,
    },
  },
} = require('../util/config');

const BASE_URL = 'https://api.crowdtangle.com/';

function generateAxiosConfig(token) {
  return {
    method: 'GET',
    baseURL: BASE_URL,
    params: { token },
  };
}

async function getRADxListsWith(token) {
  const config = {
    ...generateAxiosConfig(token),
    url: '/lists',
  };
  const response = await axios(config);
  const { data: { result: { lists } } } = response;
  if (Array.isArray(lists)) {
    return lists
      .filter(({ type, title }) => type === 'LIST' && title.toLowerCase().startsWith('radx'))
      .map(({ id, title: name }) => ({ id, name: name.slice(5).toLowerCase() }));
  }
  return [];
}

async function getListWith(token, listId) {
  const list = [];
  const config = {
    ...generateAxiosConfig(token),
    url: `/lists/${listId}/accounts`,
  };
  config.params.count = 100;

  let nextPageURL;
  let isFirstRequest = true;
  while (nextPageURL || isFirstRequest) {
    if (isFirstRequest) isFirstRequest = false;
    const response = await axios(config);
    const { data: { result: { accounts, pagination } } } = response;
    list.push(...accounts.map(({ id }) => id));
    if (!pagination || !pagination.nextPage) break;
    nextPageURL = new URL(pagination.nextPage);
    config.params.offset = parseInt(nextPageURL.searchParams.get('offset'), 10);
  }
  return list;
}

async function assembleListsWith(token) {
  const radxLists = await getRADxListsWith(token);
  const listDictionary = {};
  for (let i = 0; i < radxLists.length; i += 1) {
    const { name, id } = radxLists[i];
    const radxList = await getListWith(token, id);
    if (listDictionary[name]) {
      listDictionary[name].push(...radxList);
    } else {
      listDictionary[name] = radxList;
    }
  }
  return listDictionary;
}

async function sync() {
  try {
    const facebookLists = await assembleListsWith(facebookToken);
    const instagramLists = await assembleListsWith(instagramToken);

    console.log('CrowdTangle lists synced.');

    return {
      facebook: facebookLists,
      instagram: instagramLists,
    };
  } catch (err) {
    console.log(err);
  }
  return {};
}

sync().then((lists) => {
  parentPort.postMessage(lists);
});
