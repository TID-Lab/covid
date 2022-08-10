import c from './index.module.css';
import Logo from '../Logo';
import TextSearch from '../TextSearch';
import { useAppDispatch, useAppSelector } from 'hooks/useTypedRedux';
import Button from 'components/Button';
import useTracker from 'hooks/useTracker';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu } from '@headlessui/react';
import Icon from 'components/Icon';
import path from 'path';
import HeaderMenu from './HeaderMenu';
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
      <header
        className={`grid font-medium ${c.header_grid} text-slate-700 fixed top-0 left-0 z-50 w-full`}
      >
        <div className="border-r bg-white  border-slate-400 px-2 py-2  ">
          <Logo />
        </div>

        <div
          className={`flex justify-between items-center px-4 py-2 text-base  ${c.firefoxfix}`}
        >
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
          <div className="grow basis-0 flex justify-end gap-x-2">
            {pathname === '/social-media-dashboard' && (
              <Button onClick={onMenuClick}>+ Create Post</Button>
            )}
            <HeaderMenu />
          </div>
        </div>
      </header>
    );
  } else if (pathname === '/') {
    return (
      <header className="flex bg-white items-center px-2 py-1 border-b border-slate-300">
        <Logo />
      </header>
    );
  } else if (pathname.includes('/settings')) {
    return (
      <header
        className={`container mx-auto grid font-medium ${c.header_grid} text-slate-700   z-50 w-full py-2 mb-2`}
      >
        <Logo />
        <div className="flex justify-end">
          <HeaderMenu />
        </div>
      </header>
    );
  }
  return (
    // return nothing for now LOL
    <></>
  );
};

export default Header;
