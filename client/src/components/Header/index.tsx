// @ts-nocheck
import { useLocation } from 'react-router-dom';
import './index.module.css';

import TagSort from '../TagSort';
import Logo from '../Logo';
import SortSelect from '../SortSelect';
import TextSearch from '../TextSearch';
import LandingHeader from '../LandingHeader';
// import { Button } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Header = () => {
  const { pathname } = useLocation(); // TODO show search only if in dashboard mode
  // const [postingVisible, setPostingVisible] = useState(false);
  const dispatch = useDispatch();
  const postingMenu = useSelector((state) => state.postingMenu);
  function onMenuClick() {
    dispatch({ type: 'postingMenu/set', payload: !postingMenu });
  }
  if (pathname === '/social-media-dashboard') {
    return (
      <div className="PageHeader">
        <Logo />
        <SortSelect />
        <TextSearch />
        <TagSort />
        <button
          style={{
            marginLeft: 'auto',
            marginRight: '1.5rem',
            marginTop: '0.5rem',
            marginBottom: '0.5rem',
            maxHeight: '3rem',
          }}
          onClick={onMenuClick}
        >
          {' '}
          + Create Post{' '}
        </button>
      </div>
    );
  } else if (
    pathname.includes('/social-media-dashboard') ||
    pathname.includes('/login')
  ) {
    return (
      <div className="PageHeader">
        <Logo />
      </div>
    );
  } else {
    return <LandingHeader />;
  }
};

export default Header;
