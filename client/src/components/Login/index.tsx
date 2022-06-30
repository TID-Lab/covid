// @ts-nocheck
import c from './index.module.css';

import useAuth from 'hooks/auth';
import LoginModal from '../LoginModal';

const Login = () => {
  useAuth(false, '/social-media-dashboard');

  return (
    <div className="flex flex-auto flex-row justify-center items-center overflow-auto overflow-y-auto">
      <LoginModal />
    </div>
  );
};

export default Login;
