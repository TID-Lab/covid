import './index.css';

import Filters from '../Filters';
import Posts from '../Posts';
import useAuth from '../../hooks/auth';
import PostingMenu from '../PostingMenu';

const Dashboard = () => {
  useAuth();

  return (
    <div className='Dashboard'>
      <Filters />
      <Posts />
      <PostingMenu />
    </div>
  )
}

export default Dashboard;