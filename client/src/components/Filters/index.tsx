// @ts-nocheck
import { useAppDispatch, useAppSelector } from 'hooks/useTypedRedux';
import { useEffect } from 'react';

import DateFilter from './DateFilter';
import PlatformFilter from './PlatformFilter';
import ClearFilters from '../ClearFilters';
import { getPosts } from 'api/post';
import notify from 'util/notify';
import SortSelect from 'components/SortSelect';
import FilterOptionItem, { FilterOptionItemProps } from './FilterOptionItem';
import {
  COVID_TOPICS,
  ACC_CATEGORIES,
  IDENTITIES,
  LOCATION,
  INSTITUTION,
} from 'util/filterData';

interface FiltersProps {
  showList: string[];
  showPlatforms?: boolean;
  showDate?: boolean;
}
const Filters = ({ showDate, showList, showPlatforms }: FiltersProps) => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.filters);
  const { platforms } = filters;

  // useEffect(() => {
  //   getPosts(filters)
  //     .then((posts) => {
  //       dispatch({ type: 'posts/set', payload: posts });
  //     })
  //     .catch((_) => notify('An error occurred while filtering posts'));
  // }, [filters, dispatch]);

  const filterList: FilterOptionItemProps[] = [
    {
      header: 'COVID-19 Topics',
      options: COVID_TOPICS,
      selector: (state) => state.filters.topic,
      dispatchType: 'topic/set',
      track: { category: 'Filter', action: 'Set Topic' },
      adjust: ' mr-[-1.5rem] ',
    },
    {
      header: 'Account Categories',
      options: ACC_CATEGORIES,
      selector: (state) => state.filters.accounts.categories,
      dispatchType: 'accounts/categories/set',
      track: { category: 'Filter', action: 'Set Account Category' },
      adjust: ' mr-[-2rem] ',
    },
    {
      header: 'Account Identity',
      options: IDENTITIES,
      selector: (state) => state.filters.accounts.identities,
      dispatchType: 'accounts/identities/set',
      track: { category: 'Filter', action: 'Set Account Identity' },
    },
    {
      header: 'Account Location',
      options: LOCATION,
      selector: (state) => state.filters.accounts.location,
      dispatchType: 'account/location/set',
      track: { category: 'Filter', action: 'Set Account Location' },
    },
    {
      header: 'Account Type',
      options: INSTITUTION,
      selector: (state) => state.filters.accounts.institutions,
      dispatchType: 'account/institutions/set',
      track: { category: 'Filter', action: 'Set Account Institution' },
    },
  ];
  return (
    <section className="flex flex-col overflow-hidden bg-white border-r mt-13 border-slate-400 ">
      <header className="pl-4 pr-2  pb-2 sticky top-0 bg-white z-30 border-b-[1.5px] border-slate-300">
        <SortSelect />
        <div className="flex justify-between mt-2">
          <h1 className="text-lg font-bold text-slate-700 ">Filters</h1>
          <ClearFilters>
            <span className="text-xs">Clear Filters</span>
          </ClearFilters>
        </div>

        <SortSelect />
      </header>
      <div
        className="space-y-4 divide-y-[1.5px] overflow-x-hidden flex-grow divide-slate-300 hoverscroll"
        style={{ overflowY: 'overlay' }}
      >
        {showDate && <DateFilter selector={(state) => state.filters.dates} />}
        {filterList
          .filter((item) => showList.includes(item.header))
          .map((props, index) => (
            <FilterOptionItem {...props} key={index} />
          ))}

        {showPlatforms && <PlatformFilter platforms={platforms} />}
      </div>
    </section>
  );
};

export default Filters;
