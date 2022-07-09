// @ts-nocheck
import { useLocation } from 'react-router-dom';
import c from './index.module.css';
import Logo from '../Logo';
import SortSelect from '../SortSelect';
import TextSearch from '../TextSearch';
// import { Button } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/useTypedRedux';
import Button from 'components/Button';
import useTracker from 'hooks/useTracker';
import { Link, NavLink } from 'react-router-dom';

const Header = () => {
  const { trackEvent } = useTracker();
  const { pathname } = useLocation(); // TODO show search only if in dashboard mode
  // const [postingVisible, setPostingVisible] = useState(false);
  const dispatch = useAppDispatch();
  const postingMenu = useAppSelector((state) => state.postingMenu);

  function onMenuClick() {
    dispatch({ type: 'postingMenu/set', payload: !postingMenu });
    trackEvent({ category: 'Post', action: 'Create Post' });
  }

  if (pathname === '/social-media-dashboard' || pathname === '/resources') {
    return (
      <header className={`bg-white grid font-medium ${c.header_grid}`}>
        <div className="border-r border-gray-400 px-2 py-2">
          <div className="hover:bg-slate-100 rounded-xs">
            <Link to="/">
              <Logo />
            </Link>
          </div>
        </div>

        <div className="flex justify-between items-center px-4 py-2 text-base">
          <div className="flex items-center h-fit grow space-x-2 pl-2 basis-0">
            <NavLink
              className={`${c.navlink} py-1 `}
              activeClassName={c.active}
              to="/social-media-dashboard"
            >
              <p className={`${c.navlink_inner}  px-4 py-1 rounded-xs`}>
                Monitoring
              </p>
            </NavLink>
            <NavLink
              className={`${c.navlink} py-1 `}
              activeClassName={c.active}
              to="/resources"
            >
              <p className={`${c.navlink_inner} px-4 py-1 rounded-xs`}>
                Resources
              </p>{' '}
            </NavLink>
          </div>
          <TextSearch />
          <div className="grow basis-0 flex justify-end">
            <Button onClick={onMenuClick}>+ Create Post</Button>
          </div>
        </div>
      </header>
    );
  } else if (pathname === '/') {
    return (
      <header className="flex bg-white items-center px-2 py-1 border-b border-gray-400">
        <Logo />
      </header>
    );
  } else {
    return (
      // return nothing for now LOL
      <></>
    );
  }
};

export default Header;
