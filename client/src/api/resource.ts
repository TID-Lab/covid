// @ts-nocheck
// Functions for the /api/resource API endpoints

import { authFetch } from '../util/auth';

let body = {};
const defaultOptions = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

export function filtersToBody(filters) {
  const { dates, topic, accounts, platforms, page, sortBy, search } = filters;
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
  }
  return body;
}

export let page = 0;
export let lastPage = true;

/**
 * Fetches resources using the GET /api/resource API endpoint.
 */
async function fetchResources() {
  const options = {
    ...defaultOptions,
    method: 'GET',
  };
  const res = await fetch('/api/resource', options);
  const resources = await res.json();
  console.log(resources);
  return resources;
}

/**
 * Fetches resources using the given set of filters.
 */
async function getResources(filters) {
  page = 0;
  body = filtersToBody(filters);
  return await fetchResources();
}
/**
 * Fetches the next page of resources.
 */
async function getNextPage() {
  page += 1;
  return await fetchResources();
}

/**
 * Fetches the previous page of resources.
 */
async function getPrevPage() {
  if (page > 0) page -= 1;
  return await fetchResources();
}

async function createResource(resource) {
  const options = {
    ...defaultOptions,
    method: 'POST',
    body: JSON.stringify(resource),
  };
  const res = await authFetch(`/api/resource`, options);
  if (res.status === 200) {
    var body = await res.json();
  } else {
    return null;
  }
  return body;
}

async function deleteResource(resourceUrl) {
  const options = {
    ...defaultOptions,
    method: 'DELETE',
    body: JSON.stringify(resourceUrl),
  };
  const res = await authFetch(`/api/resource`, options);
  return res.status === 200;
}

async function editResource(resourceUrl, replacementResource) {
  const options = {
    ...defaultOptions,
    method: 'PUT',
    body: JSON.stringify(resourceUrl),
    replacementBody: JSON.stringify(replacementResource),
  };
  const res = await authFetch(`/api/resource`, options);
  const body = await res.json();
  return body;
}

// below code attempts to turn functions pure

/**
 * Pure function that Fetches posts using the GET /api/post API endpoint.
 */
export async function fetchResourceFromPage(pageNumber: number, filters = {}) {
  const options = {
    ...defaultOptions,
    // uncomment line below when the filter magic is ready
    //  body: JSON.stringify(filtersToBody(filters)),
    method: 'GET',
  };
  const res = await fetch('/api/resource', options);
  const resources = await res.json();
  return resources;
}

export {
  getResources,
  getNextPage,
  getPrevPage,
  createResource,
  fetchResources,
  deleteResource,
  editResource,
};
