import { useLocation } from 'react-router-dom';
import c from './index.module.css';
import Logo from '../Logo';
import TextSearch from '../TextSearch';
import { useAppDispatch, useAppSelector } from 'hooks/useTypedRedux';
import Button from 'components/Button';
import useTracker from 'hooks/useTracker';
import { Link, NavLink } from 'react-router-dom';
import { Menu } from '@headlessui/react';
import Icon from 'components/Icon';
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
  function onLogout() {
    fetch('/api/auth/logout', { method: 'POST' }).then((response) => {
      if (response.redirected) {
        window.location.href = response.url;
      }
    });
  }

  if (pathname === '/social-media-dashboard' || pathname === '/resources') {
    return (
      <header
        className={`grid font-medium ${c.header_grid} text-slate-700 fixed top-0 left-0 z-50 w-full`}
      >
        <div className="flex items-center justify-between px-2 py-2 bg-white border-r border-slate-400">
          <Logo />
          <Menu as="div" className="relative text-left">
            <Menu.Button className="flex items-center py-1 pl-3 pr-1 text-sm font-medium hover:bg-slate-200 gap-x-1 border-slate-300 rounded-xs">
              Menu <Icon type="more-vertical" />
            </Menu.Button>
            <Menu.Items className="absolute right-0 z-50 p-1 mt-1 text-sm font-medium border divide-y divide-slate-300 drop-shadow-lg bg-slate-50 rounded-xs border-slate-300">
              <Menu.Item>
                {({ active }) => (
                  <button
                    type="button"
                    className={`${
                      active && 'bg-blue-300'
                    } flex mb-1 items-center gap-x-1 font-medium hover:bg-blue-100 hover:text-blue-800 w-[10rem] rounded-2xs py-1 pr-2 pl-1`}
                    onClick={onLogout}
                  >
                    <Icon type="log-out" size="xs" className="text-red-700" />
                    Logout
                  </button>
                )}
              </Menu.Item>
              <div className="pt-1 font-regular">
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      className="flex items-center gap-x-1 text-slate-700 hover:bg-blue-100 hover:text-blue-800 w-[10rem] rounded-2xs py-1 pr-2 pl-1"
                      to="/privacy-policy"
                    >
                      <Icon type="link" size="xs" className="text-blue-800" />
                      Privacy Policy
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      className="flex items-center gap-x-1 text-slate-700 hover:bg-blue-100 hover:text-blue-800 w-[10rem] rounded-2xs py-1 pr-2 pl-1"
                      to="/terms"
                    >
                      <Icon type="link" size="xs" className="text-blue-800" />
                      Terms of Service
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      className="flex items-center text-slate-700 gap-x-1 hover:bg-blue-100 hover:text-blue-800 w-[10rem] rounded-2xs py-1 pr-2 pl-1"
                      to="/data-deletion"
                    >
                      <Icon type="link" size="xs" className="text-blue-800" />
                      Data Deletion
                    </Link>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Menu>
        </div>

        <div
          className={`flex justify-between items-center px-4 py-2 text-base  ${c.firefoxfix}`}
        >
          <div className="flex items-center pl-2 space-x-2 h-fit grow basis-0">
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
          <div className="ml-6 w-[400px]">
            <TextSearch />
          </div>
          <div className="flex justify-end grow basis-0">
            {pathname === '/resources' ? (
              <Button
                onClick={() => window.open('/settings/resources', '_self')}
              >
                Settings
              </Button>
            ) : (
              <Button onClick={onMenuClick}>+ Create Post</Button>
            )}
          </div>
        </div>
      </header>
    );
  } else if (pathname === '/') {
    return (
      <header className="flex items-center px-2 py-1 bg-white border-b border-slate-300">
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
