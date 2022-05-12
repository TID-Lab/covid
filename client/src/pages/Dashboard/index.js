import './index.module.css';

import Filters from 'components/Filters';
import Posts from 'components/Posts';
import useAuth from 'hooks/auth';
import PostingMenu from 'components/PostingMenu';

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