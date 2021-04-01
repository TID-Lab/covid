import {
  useLocation
} from 'react-router-dom';

import './index.css';

const Header = () => {
  const { pathname } = useLocation(); // TODO show search only if in dashboard mode

  return (
    <div className='Header'>
      
    </div>
  );
}

export default Header;