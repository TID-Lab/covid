

// Functions for the /api/auth endpoints

/**
 * Returns whether the user is authenticated via GET /api/auth/check
 */
async function checkAuth() {
  const res = await fetch('/api/auth/check', { method: 'GET' });
  return res.status === 200;
}

/**
 * Returns Oauth https://www.quod.ai/post/how-to-integrate-twitter-login-api-into-your-react-app
 */
function twitterLogin(setButtonDisabled) {
  (async () => {
  try {
    setButtonDisabled(true)
    // Oauth Step 1
    const res = await fetch('/api/auth/twitter/oauth/request_token', {method: 'POST'});
    const { oauth_token } = await res.json();
    
    setButtonDisabled(false)
    // Oauth Step 2
    window.location.href = `https://api.twitter.com/oauth/authenticate?oauth_token=${oauth_token}`;
    
  } catch(error) {
    console.log(error);
  }
  setButtonDisabled(false)
})();
}

const twitterLogout = () => {
  (async () => {
    try {
      await fetch(`/api/auth/twitter/logout`, 
        {method: 'POST'}
      );
    } catch (error) {
      console.error(error); 
    }
  })();
}


export { checkAuth, twitterLogin, twitterLogout};