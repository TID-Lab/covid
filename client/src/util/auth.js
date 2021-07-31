
/**
 * `fetch`, but it redirects to the login
 * page when 401 Unauthorized is returned.
 */
async function authFetch(url, options) {
  const res = await fetch(url, options);
  if (res.status === 401) {
    window.location.href = '/login';
    return null;
  }
  return res;
}

export { authFetch };