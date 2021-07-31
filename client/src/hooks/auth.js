import { useEffect } from 'react';
import { checkAuth } from '../api/auth';

// A React hook that redirects to the login page if the user is not authenticated
function useAuth(shouldBeLoggedIn = true, href='/') {
  useEffect(() => {
    (async () => {
      const isAuthenticated = await checkAuth();
      if (shouldBeLoggedIn) {
        if (!isAuthenticated) window.location.href = '/login';
      } else {
        if (isAuthenticated) window.location.href = href;
      }
    })();
  }, [shouldBeLoggedIn, href]);
}

export default useAuth;