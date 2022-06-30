// @ts-nocheck
import { useAppDispatch, useAppSelector } from 'hooks/useTypedRedux';
import { useEffect } from 'react';

import DateFilter from './DateFilter';
import PlatformFilter from './PlatformFilter';
import ClearFilters from '../ClearFilters';
import { getPosts } from 'api/post';
import notify from 'util/notify';
import SortSelect from 'components/SortSelect';
import FilterOptionItem from './FilterOptionItem';
import {
  COVID_TOPICS,
  ACC_CATEGORIES,
  IDENTITIES,
  LOCATION,
  INSTITUTION,
} from 'util/filterData';
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
    <section className="bg-white border-r border-gray-400 pb-4  overflow-x-hidden ">
      <header className="pl-4 pr-2 py-4 sticky top-0 bg-white z-30 border-b-[1.5px] border-slate-300">
        <SortSelect />
        <div className="flex justify-between">
          <h1 class="font-bold text-xl ">Filters</h1>
          <ClearFilters>
            <span className="text-xs">Clear Filters</span>
          </ClearFilters>
        </div>
      </header>
      <div className="space-y-4 divide-y-[1.5px] divide-slate-300">
        <DateFilter selector={(state) => state.filters.dates} />
        <FilterOptionItem
          header="COVID_19 TOPICS"
          items={COVID_TOPICS}
          selector={(state) => state.filters.topic}
          dispatchType="topic/set"
          track={{ category: 'Filter', action: 'Set Topic' }}
        />
        <FilterOptionItem
          header="Account Categories"
          items={ACC_CATEGORIES}
          selector={(state) => state.filters.accounts.categories}
          dispatchType="accounts/categories/set"
          track={{ category: 'Filter', action: 'Set Account Category' }}
        />
        <FilterOptionItem
          header="Account Identity"
          items={IDENTITIES}
          selector={(state) => state.filters.accounts.identities}
          dispatchType="accounts/identities/set"
          track={{ category: 'Filter', action: 'Set Account Identity' }}
        />
        <FilterOptionItem
          header="Account Location"
          items={LOCATION}
          selector={(state) => state.filters.accounts.location}
          dispatchType="accounts/location/set"
          track={{ category: 'Filter', action: 'Set Account Location' }}
        />
        <FilterOptionItem
          header="Account Type"
          items={INSTITUTION}
          selector={(state) => state.filters.accounts.institutions}
          dispatchType="accounts/institutions/set"
          track={{ category: 'Filter', action: 'Set Account Institution' }}
        />
        <PlatformFilter platforms={platforms} />
      </div>
    </section>
  );
};

export default Filters;
