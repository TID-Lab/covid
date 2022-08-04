// @ts-nocheck

import { useEffect, useState } from 'react';
import Filters from 'components/Filters';
import Posts from 'components/Posts';
import useAuth from 'hooks/auth';
import PostingMenu from 'components/PostingMenu';
import useTracker from 'hooks/useTracker';
import { useAppDispatch, useAppSelector } from 'hooks/useTypedRedux';
import c from './index.module.css';
import { fetchResourceFromPage } from 'api/resource';
import notify from 'util/notify';
import ResourcesPost from 'components/Posts/ResourcesPost';
import { clearFilters } from 'util/clearFiltersDispatch';
// Need to import resources
// Need to import Filters for Resources

// This is the resources dashboard and it assembles the resource posts and filters associated with it.

const ResourceDashboard = () => {
  useAuth();
  const { trackPageView } = useTracker();
  const dispatch = useAppDispatch();

  const posts = useAppSelector((state) => state.resources);
  const filters = useAppSelector((state) => ({
    ...state.filters,
    tags: [],
  }));
  const [page, setPage] = useState(0);
  const [lastPage, setLastPage] = useState(false);

  // Track page view
  useEffect(() => {
    trackPageView();
    //on page unmount
    dispatch({ type: 'dates/resetresource' });
    return () => {
      const clearItems = clearFilters();
      clearItems.forEach((item: any) => dispatch(item));
    };
  }, []);

  console.log('Page', page);

  //update posts whenver filters or page number is updated
  useEffect(() => {
    console.log('Resources Effect', page);
    updatePosts(page, filters);
  }, [page]);

  function updatePosts(pageNumber: number, filterData: any) {
    fetchResourceFromPage(pageNumber, filterData)
      .then((data) => {
        const resources = data;
        //setLastPage(isLastPage);
        dispatch({ type: 'resources/set', payload: resources });
      })
      .catch((_) => notify('An error occurred while fetching resources'));
  }

  function updatePage(toPage: number) {
    const newPage = page + toPage;
    if (newPage > 0 && !lastPage) setPage(page + toPage);
  }

  return (
    <div
      className={`overflow-hidden h-full grid mt-[61px] ${c.dashboard_grid}`}
    >
      <section className="border-r border-slate-400">
        <Filters showDate showList={['COVID-19 Topics']} />
      </section>

      <Posts
        page={page}
        hasContent={posts.length > 0}
        isLastPage={lastPage}
        category={'Resources Page'}
        changePage={(num: number) => updatePage(num)}
      >
        {posts.map((post, index) => (
          <ResourcesPost data={post} key={index} />
        ))}
      </Posts>

      <PostingMenu />
    </div>
  );
};

export default ResourceDashboard;
