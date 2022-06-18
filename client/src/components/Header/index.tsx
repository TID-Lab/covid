// @ts-nocheck
import { useLocation } from 'react-router-dom';
import c from './index.module.css';
import Logo from '../Logo';
import SortSelect from '../SortSelect';
import TextSearch from '../TextSearch';
// import { Button } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'components/Button';
import useTracker from 'hooks/useTracker';

const Header = () => {
  const { trackEvent } = useTracker();
  const { pathname } = useLocation(); // TODO show search only if in dashboard mode
  // const [postingVisible, setPostingVisible] = useState(false);
  const dispatch = useDispatch();
  const postingMenu = useSelector((state) => state.postingMenu);

  function onMenuClick() {
    dispatch({ type: 'postingMenu/set', payload: !postingMenu });
    trackEvent({ category: 'Post', action: 'Create Post' } as MatomoEvent);
  }

  if (pathname === '/social-media-dashboard' || pathname === '/resources') {
    return (
      <header className={`bg-white grid ${c.header_grid}`}>
        <div className="border-r border-gray-400">
          <Logo />
        </div>

        <div className="flex justify-between items-center px-2 py-1 border-b  border-gray-400">
          <div className="flex items-center h-fit grow basis-0">
            <Button
              variant="secondary"
              size="md"
              onClick={() =>
                window.open(
                  pathname === '/resources'
                    ? '/social-media-dashboard'
                    : '/resources',
                  '_self'
                )
              }
            >
              {pathname === '/resources' ? 'Resources' : 'Monitoring'}
            </Button>
          </div>
          <TextSearch />
          <div className="grow basis-0"></div>
          <Button onClick={onMenuClick}>+ Create Post</Button>
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
