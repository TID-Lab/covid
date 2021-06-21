import { useEffect } from 'react';
import { checkAuth } from '../api/auth';

function useAuth() {
  useEffect(() => {
    (async () => {
      const isAuthenticated = await checkAuth(); 
      if (!isAuthenticated) {
        window.location.href = '/login';
      }
    })();
  }, []);
}

export default useAuth;