// @ts-nocheck
import { useEffect } from 'react';
import Filters from 'components/Filters';
import Posts from 'components/Posts';
import useAuth from 'hooks/auth';
import PostingMenu from 'components/PostingMenu';
import useTracker from 'hooks/useTracker';

import c from './index.module.css';

const Dashboard = () => {
  useAuth();
  const {trackPageView} = useTracker();

   // Track page view
   useEffect(() => {
    trackPageView()
  }, [])

  return (
    <div className={c.Dashboard}>
      <Filters />
      <Posts />
      <PostingMenu />
    </div>
  );
};

export default Dashboard;
