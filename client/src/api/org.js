import { authFetch } from "../util/auth";

const defaultOptions = {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
}

async function fetchOrganizations() {
  const options = {
    ...defaultOptions,
    method: 'GET',
  }
  const res = await fetch('/api/org', options);
  const orgs = await res.json();
  return orgs;
}

async function deleteOrganization(id) {
  const options = {
    ...defaultOptions,
    method: 'DELETE',
  }
  const res = await authFetch(`/api/org/${id}`, options);
  return res.status === 200;
}

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