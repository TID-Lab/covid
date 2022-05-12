import { useEffect } from 'react';
import { checkAuth } from '../api/auth';

// A React hook that redirects to the login page if the user is not authenticated
function useAuth(shouldBeLoggedIn = true, href='/social-media-dashboard') {
  useEffect(() => {
    (async () => {
      const isAuthenticated = await checkAuth();
      if (shouldBeLoggedIn) {
        if (!isAuthenticated) window.location.href = '/';
      } else {
        if (isAuthenticated && window.location.href.includes('/')) window.location.href = href;
      }
    })();
  }, [shouldBeLoggedIn, href]);
}

export default useAuth;