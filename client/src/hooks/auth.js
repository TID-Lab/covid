import { useEffect } from 'react';
import { checkAuth } from '../api/auth';

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