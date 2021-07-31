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
        <TextSearch />
      </div>
    )
  } else {
    return (
      <div className='PageHeader'>
        <Logo />
      </div>
    )
  }
}

export default Header;