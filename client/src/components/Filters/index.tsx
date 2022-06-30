// @ts-nocheck
import { useAppDispatch, useAppSelector } from 'hooks/useTypedRedux';
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
import FilterOptionItem from './FilterOptionItem';
import { COVID_TOPICS } from 'util/filterData';
const Filters = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.filters);
  const { dates, topic, accounts, platforms } = filters;

  useEffect(() => {
    getPosts(filters)
      .then((posts) => {
        dispatch({ type: 'posts/set', payload: posts });
      })
      .catch((_) => notify('An error occurred.'));
  }, [filters, dispatch]);

  return (
    <div className="bg-white border-r border-gray-400 pl-4 pr-2 py-4 space-y-4 overflow-x-hidden ">
      <SortSelect />
      <DateFilter dates={dates} />
      <FilterOptionItem
        header="COVID_19 TOPICS"
        items={COVID_TOPICS}
        selector={(state) => state.filters.topic}
        dispatchType="topic/set"
        track={{ category: 'Filter', action: 'Set Topic' }}
      />
      <AccountFilters accounts={accounts} />
      <PlatformFilter platforms={platforms} />
      <ClearFilters />
    </div>
  );
};

export default Filters;
