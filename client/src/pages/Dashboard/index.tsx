// @ts-nocheck
import { useEffect, useState } from 'react';
import Filters from 'components/Filters';
import Posts from 'components/Posts';
import useAuth from 'hooks/auth';
import PostingMenu from 'components/PostingMenu';
import useTracker from 'hooks/useTracker';
import { useAppDispatch, useAppSelector } from 'hooks/useTypedRedux';
import c from './index.module.css';
import Post from 'components/Posts/Post';
import { fetchPostsFromPage } from 'api/post';
import notify from 'util/notify';
import { clearFilters } from 'util/clearFiltersDispatch';
import { Tab } from '@headlessui/react';
import Tags from 'components/Tags';
import SortSelect from 'components/SortSelect';

const Dashboard = () => {
  useAuth();
  const { trackPageView } = useTracker();
  const dispatch = useAppDispatch();

  const posts = useAppSelector((state) => state.posts);
  const filters = useAppSelector((state) => state.filters);
  const [page, setPage] = useState(0);
  const [lastPage, setLastPage] = useState(false);

  // Track page view
  useEffect(() => {
    trackPageView();
    //on page unmount
    return () => {
      const clearItems = clearFilters();
      clearItems.forEach((item: any) => dispatch(item));
    };
  }, []);

  //update posts whenver filters or page number is updated
  useEffect(() => {
    updatePosts(page, filters);
  }, [filters, page]);

  function updatePosts(pageNumber: number, filterData: any) {
    fetchPostsFromPage(pageNumber, filterData)
      .then((data) => {
        const { posts, isLastPage } = data;
        setLastPage(isLastPage);
        dispatch({ type: 'posts/set', payload: posts });
      })
      .catch((_) => notify('An error occurred while fetching posts'));
  }
  const Tabs = (
    <div className={`overflow-hidden h-full grid ${c.dashboard_grid}`}>
      <div className="relative h-full">
        <Tab.Group>
          <Tab.List as="div" className={c.tabList}>
            <Tab key={'Filters'} as="div" className={c.tab}>
              {({ selected }) => (
                <p className={selected ? c.selectedTab : ''}>Filters</p>
              )}
            </Tab>

            <Tab key={'Tags'} as="div" className={c.tab}>
              {({ selected }) => (
                <p className={selected ? c.selectedTab : ''}>Tags</p>
              )}
            </Tab>
          </Tab.List>

          <Tab.Panels className="h-full">
            <Tab.Panel className="h-full overflow-hidden">
              <Filters />
            </Tab.Panel>
            <Tab.Panel className="h-full overflow-hidden">
              <Tags />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );

  function updatePage(toPage: number) {
    const newPage = page + toPage;
    if (newPage > 0 && !lastPage) setPage(page + toPage);
  }
  return (
    <div className={`overflow-hidden grid ${c.dashboard_grid}`}>
      <section className="flex flex-col mt-0 overflow-hidden bg-white border-r pt-13 border-slate-400 ">
        <SortSelect />

        <Tab.Group>
          <Tab.List className={c.tabList}>
            <Tab key="filters" className={c.tab}>
              {({ selected }) => (
                <span className={selected ? c.selectedTab : ''}>Filters</span>
              )}
            </Tab>
            <Tab key="tags" className={c.tab}>
              {({ selected }) => (
                <span className={selected ? c.selectedTab : ''}>Tags</span>
              )}
            </Tab>
          </Tab.List>

          <Tab.Panels>
            <Tab.Panel>
              <Filters
                showDate
                showPlatforms
                showList={[
                  'COVID-19 Topics',
                  'Account Categories',
                  'Account Identity',
                  'Account Location',
                  'Account Type',
                ]}
              />
            </Tab.Panel>
            <Tab.Panel>
              <Tags />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </section>

      <Posts
        page={page}
        hasContent={posts.length > 0}
        isLastPage={lastPage}
        category={'Monitoring Page'}
        changePage={(num: number) => updatePage(num)}
      >
        {posts.map((post) => (
          <Post data={post} key={post.url} />
        ))}
      </Posts>
      <PostingMenu />
    </div>
  );
};

export default Dashboard;
