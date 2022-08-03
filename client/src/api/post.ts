// @ts-nocheck
// Functions for the /api/post API endpoints

import { authFetch } from '../util/auth';

let body = {};
const defaultOptions = {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};
// Converts from the filters state object to an HTTP request body
export function filtersToBody(filters) {
  const { dates, topic, accounts, platforms, page, sortBy, search, tags } =
    filters;
  const { curatedOnly, categories, identities, institutions, location } =
    accounts;
  const body = { platforms, page, sortBy, search };

  const { from: fromString, to: toString } = dates;

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
      body.institutions = institutions === 'institutional';
    }
    if (location !== 'all') {
      body.georgia = location === 'georgia';
    }
    if (tags && tags.length) {
      body.tags = tags;
    }
  }
  return body;
}

export function tagsToBody(givenTags) {
  const { tags } = givenTags;
  if (tags && tags.length) {
    body = tags;
  }
  return body;
}

// this shouldnt work LOL  i think it needs to be in a redux store, but it does so im not gonna touch it
export let page = 0;
export let lastPage = true;

/**
 * Fetches posts using the GET /api/post API endpoint.
 */
async function fetchPosts() {
  const options = {
    ...defaultOptions,
    body: JSON.stringify(body),
  };
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

/**
 * combined prev/next page fetch of posts.
 */
export async function getPrevNextPage(toPage) {
  if (toPage === 'next') return await getNextPage();
  else return await getPrevPage();
}

// below code attempts to turn functions pure

/**
 * Pure function that Fetches posts using the GET /api/post API endpoint.
 */
export async function fetchPostsFromPage(pageNumber: number, filters = {}) {
  const body = filtersToBody(filters);
  const options = {
    ...defaultOptions,
    body: JSON.stringify(body),
  };
  const res = await authFetch(`/api/post/${pageNumber}`, options);

  const { posts, lastPage: isLastPage } = await res.json();
  return { posts: posts, isLastPage: isLastPage };
}

/**
 * Fetches posts using the given tags.
 */
export async function getTaggedPosts(pageNumber: Number, tags) {
  const body = tagsToBody(tags);
  const options = {
    ...defaultOptions,
    body: JSON.stringify(body),
  };
  const res = await authFetch(`/api/post/tagsort/${pageNumber}`, options);

  const { posts, lastPage: isLastPage } = await res.json();
  return { posts: posts, isLastPage: isLastPage };
}