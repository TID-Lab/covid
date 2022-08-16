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
import TagCreate from 'components/TagCreate';
const states = {
  successCreate: 'Tag has been created successfully',
  failCreate: 'Unknown error has occured while posting',
  successDelete: 'Tag(s) has been deleted successfully',
  failDelete: 'Failed to delete Tag(s)',
  none: '',
};
var timeout;
const Tags = () => {
  const [createMode, setCreateMode] = useState(false);
  const [notifyState, setNotifyState] = useState('none');

  const dispatch = useAppDispatch();
  //const tagSearch = useAppSelector((state) => state.tags.search);
  const [activeTags, setActiveTags] = useState<string>([]);
  const alltags = useAppSelector((state) => {
    // console.log('Search', tagSearch);
    // return state.tags.alltags.filter((tag) => {
    //   console.log('Curr', tag);
    //   if (tag && tagSearch) {
    //     return tag.name.toLowerCase().indexOf(tagSearch.toLowerCase()) !== -1;
    //   } else {
    //     return true;
    //   }
    // });
    return state.tags.alltags;
  });
  // const activetags = useAppSelector((state) => {
  //   return state.tags.activetags;
  // });
  // const inactiveTags = useAppSelector((state) => {
  //   return state.tags.alltags
  //     .map((_, index) => {
  //       return state.tags.activetags.map(Number).indexOf(index) === -1
  //         ? index
  //         : -1;
  //     })
  //     .filter((index) => index !== -1);
  //   // .map((index) => state.tags.alltags[index].name);
  // });
  useEffect(() => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      setNotifyState('none');
    }, 5000);
    return () => {
      clearTimeout(timeout);
    };
  }, [notifyState]);
  useEffect(() => {
    fetchTags()
      .then((fetchedTags) => {
        dispatch({ type: 'alltags/set', payload: fetchedTags });
        // console.log(fetchedTags);
      })
      .catch((error) => console.log(error));
  }, []);

  // const activeTagNames = activetags
  //   .filter((index) => !!alltags[index])
  //   .map((index) => alltags[index].name);
  // const inactiveTagNames = inactiveTags
  //   .filter((index) => !!alltags[index])
  //   .map((index) => alltags[index].name);

  // console.log('Active Tags', activeTagNames, 'Inactive Tags', inactiveTagNames);
  function returnStyle() {
    if (notifyState.includes('fail')) return ' bg-red-100 border-red-300 ';
    if (notifyState.includes('success'))
      return ' bg-emerald-100 border-emerald-300  ';
    else return ' invisible ';
  }
  return (
    <div className="flex flex-col justify-between h-full pb-4 px-4 ">
      {/* <h1>Inactive Tags {inactiveTags && t}</h1> */}
      <div className="h-[4rem]">
        <div className={`border px-4 py-4 rounded-xs text-sm ${returnStyle()}`}>
          {states[notifyState]}
        </div>
      </div>
      {createMode ? (
        <>
          <TagCreate onClose={() => setCreateMode(false)} />
        </>
      ) : (
        <>
          <section className="pb-4 overflow-x-hidden bg-white border-gray-400 w-full">
            <label className="inline-block  font-bold mb-3 text-sm mt-3 text-slate-700">
              All Custom Tags
            </label>
            <div className="pl-4 pr-2 w-3/4">
              <MultiChip
                options={alltags}
                active={activeTags}
                setActive={setActiveTags}
              />
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

          <section className="px-2 flex gap-x-2 justify-end mt-13 ">
            {activeTags.length > 0 ? (
              <Button
                variant="secondary"
                className="h-fit"
                onClick={() => setActiveTags([])}
              >
                <Icon type="x" size="sm" />
                Cancel
              </Button>
            ) : (
              <Button className=" h-fit" onClick={() => setCreateMode(true)}>
                <Icon type="plus" size="sm" /> Create New Tag
              </Button>
            )}

            <Button className="" disabled={!activeTags.length > 0}>
              <Icon type="trash-2" size="sm" />
              {activeTags.length > 0
                ? `Delete ${activeTags.length} Selected Tag(s)`
                : 'Delete Tags'}
            </Button>
          </section>
        </>
      )}
    </div>
  );
};

export default Tags;
