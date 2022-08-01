// @ts-nocheck
import { useAppDispatch, useAppSelector } from 'hooks/useTypedRedux';
import { useEffect } from 'react';

import MultiChip from 'components/MultiChip';
import { fetchTags } from 'api/tag';
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
    <section className="h-full px-2">
      <label className="my-2">Tags:</label>
      <MultiChip options={alltags} active={activetags} />
    </section>
  );
};

export default Tags;
