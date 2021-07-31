// Functons for the /api/org API endpoints

import { authFetch } from "../util/auth";

const defaultOptions = {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
}

/**
 * Fetches all partner organizations via GET /api/org
 */
async function fetchOrganizations() {
  const options = {
    ...defaultOptions,
    method: 'GET',
  }
  const res = await fetch('/api/org', options);
  const orgs = await res.json();
  return orgs;
}

/**
 * Deletes a partner organization via DELETE /api/org
 */
async function deleteOrganization(id) {
  const options = {
    ...defaultOptions,
    method: 'DELETE',
  }
  const res = await authFetch(`/api/org/${id}`, options);
  return res.status === 200;
}

/**
 * Creates a new partner organization via POST /api/org
 */
async function createOrganization(org) {
  const options = {
    ...defaultOptions,
    method: 'POST',
    body: JSON.stringify(org),
  }
  const res = await authFetch(`/api/org`, options);
  const body = await res.json();
  return body;
}

/**
 * Edits a partner organization via GET /api/org
 */
async function editOrganization(org) {
  const options = {
    ...defaultOptions,
    method: 'PUT',
    body: JSON.stringify(org),
  }
  const res = await authFetch(`/api/org`, options);
  const body = await res.json();
  return body;
}

export {
  fetchOrganizations,
  deleteOrganization,
  createOrganization,
  editOrganization,
};