// Functions for the /api/resource API endpoints

import { authFetch } from '../util/auth';

let body = {};
const defaultOptions = {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
}

export let page = 0;
export let lastPage = true;

/**
 * Fetches resources using the GET /api/resource API endpoint.
 */
async function fetchResources() {
  const options = {
    ...defaultOptions,
    body: JSON.stringify(body)
  }
  const res = await authFetch(`/api/resource/${page}`, options);

  const { resources, lastPage: isLastPage } = await res.json();
  lastPage = isLastPage;
  return resources;
}

/**
 * Fetches resources using the given set of filters.
 */
export async function getResources(filters) {
  page = 0;
  //body = filtersToBody(filters);
  return await fetchResources();
}
/**
 * Fetches the next page of resources.
 */
export async function getNextPage() {
  page += 1;
  return await fetchPosts();
}

/**
 * Fetches the previous page of resources.
 */
export async function getPrevPage() {
  if (page > 0) page -= 1;
  return await fetchPosts();
}