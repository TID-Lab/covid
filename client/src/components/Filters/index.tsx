//@ts-nocheck
import { useAppDispatch, useAppSelector } from 'hooks/useTypedRedux';
import { useState, useEffect } from 'react';

import DateFilter from './DateFilter';
import PlatformFilter from './PlatformFilter';
import ClearFilters from '../ClearFilters';
import { getPosts } from 'api/post';
import notify from 'util/notify';
import SortSelect from 'components/SortSelect';
import Tags from 'components/Tags';
import FilterOptionItem, { FilterOptionItemProps } from './FilterOptionItem';
import { fetchTags } from 'api/tag';
import {
  COVID_TOPICS,
  ACC_CATEGORIES,
  IDENTITIES,
  LOCATION,
  INSTITUTION,
} from 'util/filterData';
import TagsComboBox from 'components/TagsComboBox';
import Button from 'components/Button';
import PopupModal from 'components/PopupModal';

interface FiltersProps {
  showList: string[];
  showPlatforms?: boolean;
  showDate?: boolean;
}
const Filters = ({ showDate, showList, showPlatforms }: FiltersProps) => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.filters);
  const { platforms } = filters;
  // const [activeTags, setActiveTags] = useState([]);
  const [isManageTagsOpen, setIsManageTagsOpen] = useState(false);

  const activeTags = useAppSelector((state) => {
    return state.tags.activetags;
  });
  useEffect(() => {
    fetchTags()
      .then((fetchedTags) => {
        dispatch({ type: 'alltags/set', payload: fetchedTags });
        // console.log(fetchedTags);
      })
      .catch((error) => console.log(error));
  }, []);

  function setActiveTags(newActiveTags: []) {
    console.log(newActiveTags);
    dispatch({ type: 'activetags/set', payload: newActiveTags });
  }
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
    <section className="flex flex-col mt-0  h-full overflow-hidden bg-white border-slate-400 ">
      <header className="pl-4 pr-4  pb-2 sticky top-0 bg-white z-30 border-b-[1.5px] border-slate-300">
        <div className="flex items-center justify-between mt-2">
          <h1 className="text-lg font-bold text-slate-700 ">Filters</h1>
          <ClearFilters>
            <span className="text-xs">Clear Filters</span>
          </ClearFilters>
        </div>
      </header>
      <div
        className="space-y-4 divide-y-[1.5px] overflow-x-hidden flex-grow divide-slate-300 hoverscroll"
        style={{ overflowY: 'overlay' }}
      >
        <div className="pl-4 pr-6">
          <div className="flex items-center justify-between ">
            <label className="inline-block  font-bold mb-3 text-sm mt-3 text-slate-700">
              Custom Tags
            </label>
            <Button
              variant="outline"
              size="md"
              className="text-xs"
              onClick={() => setIsManageTagsOpen(true)}
            >
              Manage Tags
            </Button>
          </div>

          <TagsComboBox activeTags={activeTags} setActiveTags={setActiveTags} />
        </div>
        {showDate && <DateFilter selector={(state) => state.filters.dates} />}
        {filterList
          .filter((item) => showList.includes(item.header))
          .map((props, index) => (
            <FilterOptionItem {...props} key={index} />
          ))}

        {showPlatforms && <PlatformFilter platforms={platforms} />}
      </div>
      <PopupModal
        title="Manage Tags"
        isOpen={isManageTagsOpen}
        onClose={() => setIsManageTagsOpen(false)}
        className="w-[90rem]"
      >
        <Tags />
      </PopupModal>
    </section>
  );
};

export default Filters;
