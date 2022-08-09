// @ts-nocheck
import { useAppDispatch, useAppSelector } from 'hooks/useTypedRedux';
import { useEffect, useState } from 'react';

import MultiChip from 'components/MultiChip';
import { fetchTags } from 'api/tag';
import ClearFilters from 'components/ClearFilters';
import TagOptionItem from './TagOptionItem';
import TextSearch from 'components/TextSearch';
import Button from 'components/Button';
import Icon from 'components/Icon';

const Tags = () => {
  const [deleteMode, setDeleteMode] = useState(false);
  const dispatch = useAppDispatch();
  const tagSearch = useAppSelector((state) => state.tags.search);
  const alltags = useAppSelector((state) => {
    console.log('Search', tagSearch);
    return state.tags.alltags.filter((tag) => {
      console.log('Curr', tag);
      if (tag && tagSearch) {
        return tag.name.toLowerCase().indexOf(tagSearch.toLowerCase()) !== -1;
      } else {
        return true;
      }
    });
  });
  const activetags = useAppSelector((state) => {
    return state.tags.activetags;
  });
  const inactiveTags = useAppSelector((state) => {
    return state.tags.alltags
      .map((_, index) => {
        return state.tags.activetags.map(Number).indexOf(index) === -1
          ? index
          : -1;
      })
      .filter((index) => index !== -1);
    // .map((index) => state.tags.alltags[index].name);
  });

  useEffect(() => {
    fetchTags()
      .then((fetchedTags) => {
        dispatch({ type: 'alltags/set', payload: fetchedTags });
        // console.log(fetchedTags);
      })
      .catch((error) => console.log(error));
  }, []);

  const activeTagNames = activetags
    .filter((index) => !!alltags[index])
    .map((index) => alltags[index].name);
  const inactiveTagNames = inactiveTags
    .filter((index) => !!alltags[index])
    .map((index) => alltags[index].name);

  console.log('Active Tags', activeTagNames, 'Inactive Tags', inactiveTagNames);

  return (
    <div className="flex flex-col justify-between h-full pb-4">
      {/* <h1>Inactive Tags {inactiveTags && t}</h1> */}
      <section className="pb-4 overflow-x-hidden bg-white border-gray-400">
        <header className="pl-4 pr-2 py-4 mb-4 sticky top-0 bg-white z-30 border-b-[1.5px] border-slate-300">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-bold ">Tags</h1>
            <ClearFilters>
              <span className="text-xs">Clear All</span>
            </ClearFilters>
          </div>

          {/* <SortSelect /> */}
          <div className="my-4">
            <TextSearch storetarget="tags/search/set" />
          </div>
        </header>
        <div className="pl-4 pr-2">
          <MultiChip options={alltags} active={activetags} />
        </div>

        {/* <TagOptionItem
          header="ACTIVE"
          items={activeTagNames}
          selector={(state) => state.filters.topic}
          dispatchType="topic/set"
          track={{ category: 'Filter', action: 'Set Topic' }}
        />

        <TagOptionItem
          header="INACTIVE"
          items={inactiveTagNames}
          selector={(state) => state.filters.topic}
          dispatchType="topic/set"
          track={{ category: 'Filter', action: 'Set Topic' }}
        /> */}
      </section>

      <section className="px-2 space-y-6">
        <div className="px-2">
          <Button className=" w-full">
            <Icon type="plus" size="sm" /> Create New Tag
          </Button>
        </div>

        <div
          className={`px-2 py-2 space-y-2 rounded-sm ${
            deleteMode && 'bg-slate-100'
          }`}
        >
          {deleteMode && (
            <Button className="w-full">
              <Icon type="trash-2" size="sm" /> Delete Selected Tags
            </Button>
          )}

          <Button
            variant="outline"
            className="w-full text-center bg-white"
            onClick={() => setDeleteMode(!deleteMode)}
          >
            <p className="text-center ">
              {deleteMode ? 'Cancel' : 'Manage Tags'}
            </p>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Tags;
