//@ts-nocheck
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
import { fetchTags } from 'api/tag';
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
    //fetch tags initially
    fetchTags()
      .then((fetchedTags) => {
        dispatch({ type: 'alltags/set', payload: fetchedTags });
        // console.log(fetchedTags);
      })
      .catch((error) => console.log(error));

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
    //const activeTagObjects = activetags.map((index) => alltags[index]);
    fetchPostsFromPage(pageNumber, filterData, activetags)
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

  function getNumberOfFilters(filters) {
    let n = 0;

    if (filters.dates.preset !== '7days') {
      n++;
    }

    if (filters.topic !== 'all') {
      n++;
    }

    if (filters.accounts.institutions !== 'all') {
      n++;
    }

    if (filters.accounts.location !== 'all') {
      n++;
    }

    if (filters.accounts.categories !== 'all') {
      n++;
    }

    if (filters.accounts.identities !== 'all') {
      n++;
    }

    if (filters.platforms.length !== 3) {
      n++;
    }

    return n;
  }

  return (
    <div className={`overflow-hidden  grid ${c.dashboard_grid}`}>
      <section className="flex flex-col  min-h-0 bg-white border-r border-slate-400 pt-13 ">
        <div className="mx-6">
          <SortSelect />
        </div>

        {/* <Tab.Group as="div" className="block flex-1 h-full ">
          <Tab.List className={c.tabList}>
            <Tab key="filters" className={c.tab}>
              {({ selected }) => (
                <div className={selected ? c.selectedTab : ''}>
                  <div className="flex items-center justify-center ">
                    <span>Filters</span>
                    <span
                      className={`flex items-center justify-center w-8 h-8 ml-2 rounded-md ${
                        selected
                          ? 'text-white bg-blue-400'
                          : 'text-gray-400 bg-gray-200'
                      }`}
                    >
                      {getNumberOfFilters(filters)}
                    </span>
                  </div>
                </div>
              )}
            </Tab>
            <Tab key="tags" className={c.tab}>
              {({ selected }) => (
                <div className={selected ? c.selectedTab : ''}>
                  <div className="flex items-center justify-center">
                    <span>Tags</span>
                    <span
                      className={`flex items-center justify-center w-8 h-8 ml-2 rounded-md ${
                        selected
                          ? 'text-white bg-blue-400'
                          : 'text-gray-400 bg-gray-200'
                      }`}
                    >
                      {activetags.length}
                    </span>
                  </div>
                </div>
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
        </Tab.Group> */}
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
