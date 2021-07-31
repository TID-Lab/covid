// Functions for the /api/auth endpoints

/**
 * Returns whether the user is authenticated via GET /api/auth/check
 */
async function checkAuth() {
  const res = await fetch('/api/auth/check', { method: 'GET' });
  return res.status === 200;
}

export { checkAuth };