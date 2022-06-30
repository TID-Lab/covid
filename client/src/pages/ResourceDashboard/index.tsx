// @ts-nocheck
import c from './index.module.css';

import Filters from 'components/Filters';
import Posts from 'components/Posts';
import useAuth from 'hooks/auth';
import PostingMenu from 'components/PostingMenu';
// Need to import resources
// Need to import Filters for Resources

// This is the resources dashboard and it assembles the resource posts and filters associated with it.

const ResourceDashboard = () => {
  useAuth();

  return (
    <div className={c.Dashboard}>
      <Filters />
      <Posts />
      <PostingMenu />
    </div>
  );
};

export default ResourceDashboard;
