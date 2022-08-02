// @ts-nocheck
// Functons for the /api/tag API endpoints

import { authFetch } from 'util/auth';

const defaultOptions = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

/**
 * Fetches all tags via GET /api/tag
 */
async function fetchTags() {
  const options = {
    ...defaultOptions,
    method: 'GET',
  };
  const res = await fetch('/api/tag', options);
  console.log(res);
  const tags = await res.json().then((tags) => {
    console.log('Tags', tags);
    return tags;
  });
  return tags;
}

/**
 * Deletes a tag via DELETE /api/tag
 */
async function deleteTag(tag) {
  const options = {
    ...defaultOptions,
    method: 'DELETE',
    body: JSON.stringify(tag),
  };
  const res = await authFetch(`/api/tag`, options);
  return res.status === 200;
}

/**
 * Creates a new tag via POST /api/tag
 */
async function createTag(tag) {
  const options = {
    ...defaultOptions,
    method: 'POST',
    body: JSON.stringify(tag),
  };
  const res = await authFetch(`/api/tag`, options);
  const body = await res.json();
  return body;
}

/**
 * Edits a tag via PUT /api/tag
 */
async function editTag(tag, replacementTag) {
  const options = {
    ...defaultOptions,
    method: 'PUT',
    body: JSON.stringify({ tag: tag, replacementTag: replacementTag }),
    //replacementBody: JSON.stringify(replacementTag),
  };
  const res = await authFetch(`/api/tag/replace`, options);
  try {
    const body = await res.json();
    return body;
  } catch (error) {
    console.log(res);
  }

  return;
}

export { fetchTags, deleteTag, createTag, editTag };
