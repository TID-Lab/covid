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
import TagSort from 'components/TagSort';
import {
  COVID_TOPICS,
  ACC_CATEGORIES,
  IDENTITIES,
  LOCATION,
  INSTITUTION,
} from 'util/filterData';
import MultiChip from 'components/MultiChip';
import { fetchTags } from 'api/tag';
const Tags = () => {
  const dispatch = useAppDispatch();
  const alltags = useAppSelector((state) => state.tags.alltags);
  const activetags = useAppSelector((state) => state.tags.activetags);

  useEffect(() => {
    fetchTags().then((fetchedTags) => {
      dispatch({ type: 'tags/set', payload: fetchedTags })
    })
  }, []);

  return (
    <section>
    <MultiChip option={alltags} active={activetags}/>
    <TagSort />
    </section>
  );
};

export default Tags;
