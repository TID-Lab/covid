import { useLocation } from 'react-router-dom';
import c from './index.module.css';
import Logo from '../Logo';
import SortSelect from '../SortSelect';
import TextSearch from '../TextSearch';
// import { Button } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'components/Button';

const Header = () => {
  const { pathname } = useLocation(); // TODO show search only if in dashboard mode
  // const [postingVisible, setPostingVisible] = useState(false);
  const dispatch = useDispatch();
  const postingMenu = useSelector(state => state.postingMenu);
  function onMenuClick() {
    dispatch({type: 'postingMenu/set', payload: !postingMenu})
  }
  if (pathname === '/social-media-dashboard') {
    return (
      <div className="flex justify-between bg-white items-center px-2 py-1 border-b border-gray-400">
        <div className='flex '>
          <Logo />
          <SortSelect />
          <TextSearch />
        </div>
     
        <Button onClick={ onMenuClick }>
        + Create Post
        </Button>
      </div>
    )
  } else if (pathname === '/' ) {
    return (
      <div className="flex bg-white items-center px-2 py-1 border-b border-gray-400">
        <Logo />
      </div>
    ) 
  } else {
      return ( // return nothing for now LOL
        <div></div>
      )
    }
}


export default Header;