// @ts-nocheck
import { useAppDispatch, useAppSelector } from 'hooks/useTypedRedux';
import { useEffect } from 'react';

import MultiChip from 'components/MultiChip';
import { fetchTags } from 'api/tag';
import ClearFilters from 'components/ClearFilters';
import SortSelect from 'components/SortSelect';
import TagOptionItem from './TagOptionItem';
import TextSearch from 'components/TextSearch';
import Button from 'components/Button';
const Tags = () => {
  const dispatch = useAppDispatch();
  const alltags = useAppSelector((state) => state.tags.alltags);
  const activetags = useAppSelector((state) => state.tags.activetags);

  useEffect(() => {
    fetchTags()
      .then((fetchedTags) => {
        dispatch({ type: 'alltags/set', payload: fetchedTags });
        console.log(fetchedTags);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="flex flex-col justify-between h-full p-2">
      <section className="pb-4 overflow-x-hidden bg-white border-gray-400">
        <header className="pl-4 pr-2 py-4 sticky top-0 bg-white z-30 border-b-[1.5px] border-slate-300">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold ">Tags</h1>
            <ClearFilters>
              <span className="text-xs">Clear All</span>
            </ClearFilters>
          </div>

          {/* <SortSelect /> */}
          <div className="my-4">
            <TextSearch />
          </div>
        </header>

        <MultiChip options={alltags} active={activetags} />

        <TagOptionItem
          header="ACTIVE"
          items={activetags}
          selector={(state) => state.filters.topic}
          dispatchType="topic/set"
          track={{ category: 'Filter', action: 'Set Topic' }}
        />

        <TagOptionItem
          header="INACTIVE"
          items={activetags}
          selector={(state) => state.filters.topic}
          dispatchType="topic/set"
          track={{ category: 'Filter', action: 'Set Topic' }}
        />
      </section>

      <section className="px-2">
        <Button className="w-full">Delete Tags</Button>
      </section>
    </div>
  );
};

export default Tags;
