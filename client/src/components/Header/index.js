import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

import './index.css';

import Logo from '../Logo';
import SortSelect from '../SortSelect';
import TextSearch from '../TextSearch';
import LandingHeader from '../LandingHeader';

const Header = () => {
  const { pathname } = useLocation(); // TODO show search only if in dashboard mode
  if (pathname === '/dashboard') {
    return (
      <div className='PageHeader'>
        <Logo />
        <SortSelect />
        <TextSearch />
      </div>
    )
  } else if (pathname.includes('/dashboard') || pathname.includes('/login')) {
    return (
      <div className='PageHeader'>
        <Logo />
      </div>
    )
  }
   else {
      return (<LandingHeader />)
  }
}

export default Header;