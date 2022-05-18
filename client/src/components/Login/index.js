import * as c from './index.module.css';

import useAuth from 'hooks/auth';
import LoginModal from '../LoginModal';

const Login = () => {
  useAuth(false, '/social-media-dashboard');

  return (
  <div className={c.Login}>
    <LoginModal />
  </div>
  );
};

export default Login;