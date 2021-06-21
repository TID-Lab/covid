async function checkAuth() {
  const res = await fetch('/api/auth/check', { method: 'GET' });
  return res.status === 200;
}

export { checkAuth };