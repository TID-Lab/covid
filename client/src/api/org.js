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
  const res = await authFetch('/api/org', options);
  const orgs = await res.json();
  return orgs;
}

export { fetchOrganizations };