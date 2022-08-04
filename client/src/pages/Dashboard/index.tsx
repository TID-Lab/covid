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
  const activetags = useAppSelector((state) => state.tags.activetags);
  const alltags = useAppSelector((state) => state.tags.alltags);
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
    updatePosts(page, filters, activetags);
  }, [filters, page, activetags]);

  function updatePosts(
    pageNumber: number,
    filterData: any,
    activetags: string[]
  ) {
    const activeTagObjects = activetags.map((index) => alltags[index]);
    fetchPostsFromPage(pageNumber, filterData, activeTagObjects)
      .then((data) => {
        const { posts, isLastPage } = data;
        setLastPage(isLastPage);
        dispatch({ type: 'posts/set', payload: posts });
      })
      .catch((_) => notify('An error occurred while fetching posts'));
  }

  function updatePage(toPage: number) {
    const newPage = page + toPage;
    if (newPage > 0 && !lastPage) setPage(page + toPage);
  }
  return (
    <div className={`overflow-hidden grid ${c.dashboard_grid}`}>
      <section className="flex flex-col  bg-white border-r border-slate-400 pt-13">
        <div className="mx-6">
          <SortSelect />
        </div>

        <Tab.Group as="div" className="flex flex-col flex-1 ">
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

          <Tab.Panels as="div" className={c.tabPanels}>
            <Tab.Panel className={c.tabPanel}>
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
            <Tab.Panel className={c.tabPanel}>
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
