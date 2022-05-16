import './index.css';

import useAuth from '../../hooks/auth';
import LoginModal from '../LoginModal';

const Login = () => {
  useAuth(false, '/dashboard');

  return (
  <div className='Login'>
    <LoginModal />
  </div>
  );
};

export default Login;