// @ts-nocheck
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import c from './index.module.css';

import DateFilter from './DateFilter';
import TopicFilter from './TopicFilter';
import AccountFilters from './AccountFilters';
import PlatformFilter from './PlatformFilter';
import ClearFilters from '../ClearFilters';
import { getPosts } from 'api/post';
import notify from 'util/notify';
import SortSelect from 'components/SortSelect';
const Filters = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);
  const { dates, topic, accounts, platforms } = filters;

  useEffect(() => {
    getPosts(filters)
      .then((posts) => {
        dispatch({ type: 'posts/set', payload: posts });
      })
      .catch((_) => notify('An error occurred.'));
  }, [filters, dispatch]);

  return (
    <div className="bg-white border-r border-gray-400 px-2 py-4 space-y-4 overflow-x-hidden ">
      <SortSelect />
      <DateFilter dates={dates} />
      <TopicFilter topic={topic} />
      <AccountFilters accounts={accounts} />
      <PlatformFilter platforms={platforms} />
      <ClearFilters />
    </div>
  );
};

export default Filters;
