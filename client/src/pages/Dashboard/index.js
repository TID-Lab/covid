import * as c from './index.module.css';


import Filters from 'components/Filters';
import Posts from 'components/Posts';
import useAuth from 'hooks/auth';
import PostingMenu from 'components/PostingMenu';

const Dashboard = () => {
  useAuth();

  return (
    <div className={c.Dashboard}>
      <Filters />
      <Posts />
      <PostingMenu />
    </div>
  )
}

export default Dashboard;