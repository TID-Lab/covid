// @ts-nocheck
// Functons for the /api/tag API endpoints

import { tagSchema } from 'reducers/tags/alltags';
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
  // console.log(res);
  const tags = await res.json().then((tags) => {
    return [
      ...tags,
      {
        name: 'First',
        description: 'Test',
        color: 'red',
        posts: [],
        _id: 1416342184317,
      },
      {
        name: 'Second',
        description: 'Test',
        color: 'green',
        posts: [],
        _id: 492756498735,
      },
      {
        name: 'Third',
        description: 'Test',
        color: 'red',
        posts: [],
        _id: 4134572945,
      },
      {
        name: 'Fourth',
        description: 'Test',
        color: 'blue',
        posts: [],
        _id: 8729465295,
      },
      {
        name: 'Fifth',
        description: 'Test',
        color: 'green',
        posts: [],
        _id: 5764348,
      },
    ];
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
