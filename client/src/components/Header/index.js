import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

import './index.css';

import Logo from '../Logo';
import SortSelect from '../SortSelect';
import TextSearch from '../TextSearch';

const Header = () => {
  const { pathname } = useLocation(); // TODO show search only if in dashboard mode

  if (pathname === '/') {
    return (
      <div className='PageHeader'>
        <Logo />
        <SortSelect />
        {/* <TextSearch /> */}
        <Link to='/privacy-policy'>Privacy Policy</Link>
        <Link to='/terms'>Terms of Service</Link>
        <Link to='/data-deletion'>Data Deletion</Link>
      </div>
    )
  } else {
    return (
      <div className='PageHeader'>
        <Logo />
        <Link to='/privacy-policy'>Privacy Policy</Link>
        <Link to='/terms'>Terms of Service</Link>
        <Link to='/data-deletion'>Data Deletion</Link>
      </div>
    )
  }
}

export default Header;