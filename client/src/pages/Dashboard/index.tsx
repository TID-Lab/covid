// @ts-nocheck
import React, { useEffect } from 'react';
import Filters from 'components/Filters';
import Posts from 'components/Posts';
import useAuth from 'hooks/auth';
import PostingMenu from 'components/PostingMenu';
import useTracker from 'hooks/useTracker';
import Tags from 'components/Tags';
import c from './index.module.css';
import { Tab } from '@headlessui/react';

const Dashboard = () => {
  useAuth();
  const { trackPageView } = useTracker();

  // Track page view
  useEffect(() => {
    trackPageView();
  }, []);

  return (
    <div className={`overflow-hidden grid ${c.dashboard_grid}`}>
      <div className="overflow-hidden">
        <Tab.Group>
          <Tab.List className={`border-b-2`}>
            <Tab key={'Filters'}>
              {({ selected }) => (
                <button
                  className={`px-4 py-1 ml-2 border-2 border-b-0 rounded-md bg-white ${
                    selected ? 'bg-slate-200 text-black' : 'bg-white text-black'
                  }`}
                >
                  Filters
                </button>
              )}
            </Tab>
            <Tab key={'Tags'}>
              {({ selected }) => (
                <button
                  className={`px-4 py-1 ml-2 border-2 border-b-0 rounded-md bg-white ${
                    selected ? 'bg-slate-200 text-black' : 'bg-white text-black'
                  }`}
                >
                  Tags
                </button>
              )}
            </Tab>
          </Tab.List>

          <Tab.Panels>
            <Tab.Panel className="overflow-auto h-full">
              <Filters />
            </Tab.Panel>
            <Tab.Panel className="overflow-auto h-full">
              {' '}
              <Tags />{' '}
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>

      <Posts />

      <PostingMenu />
    </div>
  );
};

export default Dashboard;
