// @ts-nocheck
// Functions for the /api/resource API endpoints

import { authFetch } from '../util/auth';

const defaultOptions = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

export function filtersToBody(filters) {
  const { dates, topic, page, sortBy, search } = filters;
  const body = { page, sortBy, search };

  if (dates) {
    const { from: fromString, to: toString } = dates;

    const from = new Date(fromString);
    from.setMinutes(from.getMinutes() + from.getTimezoneOffset());

    const to = new Date(toString);
    to.setMinutes(to.getMinutes() + to.getTimezoneOffset());
    to.setDate(to.getDate() + 1);

    body.dates = { from, to };
  }

  if (topic !== 'all') {
    body.topic = topic;
  }
  return body;
}

export let page = 0;
export let lastPage = true;

/**
 * Fetches resources using the GET /api/resource API endpoint.
 */
async function fetchResources(pageNumber: Number, body: Object) {
  const options = {
    ...defaultOptions,
    method: 'POST',
    body: JSON.stringify(body),
  };
  const res = await fetch(`/api/resource/${pageNumber}`, options);
  const { resources, lastPage: isLastPage } = await res.json();
  lastPage = isLastPage;
  return resources;
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
  let bd = filtersToBody(filters);
  return fetchResources(pageNumber, bd);
}

export type Base64ImageData = string;

async function getScreenshot(website: string): Base64ImageData {
  const res = await authFetch(`/api/resource/screenshot`, {
    ...defaultOptions,
    method: 'POST',
    body: JSON.stringify({
      website,
    }),
  });

  const base64Data = await res?.text();

  return base64Data;
}

export {
  getNextPage,
  getPrevPage,
  createResource,
  fetchResources,
  deleteResource,
  editResource,
  getScreenshot,
};
