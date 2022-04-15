// Functions for the /api/post API endpoints

import { authFetch } from '../util/auth';

let body = {};
const defaultOptions = {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
}
// Converts from the filters state object to an HTTP request body
function filtersToBody(filters) {
  const { dates, topic, accounts, platforms, page, sortBy, search } = filters;
  const { curatedOnly, categories, identities, institutions, location } = accounts;
  const body = { platforms, page, sortBy, search };

  const { from:fromString, to:toString } = dates;

  const from = new Date(fromString);
  from.setMinutes(from.getMinutes() + from.getTimezoneOffset());

  const to = new Date(toString);
  to.setMinutes(to.getMinutes() + to.getTimezoneOffset());
  to.setDate(to.getDate() + 1);

  body.dates = { from, to };

  if (topic !== 'all') {
    body.topic = topic;
  }
  if (curatedOnly) {
    if (categories !== 'all') {
      body.category = categories;
    }
    if (identities !== 'all') {
      body.identity = identities;
    }
    if (institutions !== 'all') {
      body.institutions = (institutions === 'institutional');
    }
    if (location !== 'all') {
      body.georgia = (location === 'georgia');
    }
  }
  return body;
}

export let page = 0;
export let lastPage = true;

/**
 * Fetches posts using the GET /api/post API endpoint.
 */
async function fetchPosts() {
  const options = {
    ...defaultOptions,
    body: JSON.stringify(body)
  }
  const res = await authFetch(`/api/post/${page}`, options);

  const { posts, lastPage: isLastPage } = await res.json();
  lastPage = isLastPage;
  return posts;
}

/**
 * Fetches posts using the given set of filters.
 */
export async function getPosts(filters) {
  page = 0;
  body = filtersToBody(filters);
  return await fetchPosts();
}
/**
 * Fetches the next page of posts.
 */
export async function getNextPage() {
  page += 1;
  return await fetchPosts();
}

/**
 * Fetches the previous page of posts.
 */
export async function getPrevPage() {
  if (page > 0) page -= 1;
  return await fetchPosts();
}