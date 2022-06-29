// @ts-nocheck
import { useAppDispatch, useAppSelector } from 'hooks/useTypedRedux';

import c from './index.module.css';

const SORT_BY = {
  engagementNormed: 'Most engagement (scaled)',
  engagementRaw: 'Most engagement (not scaled)',
  recent: 'Most recent',
};

const SortSelect = () => {
  const sortBy = useAppSelector((state) => state.filters.sortBy);
  const dispatch = useAppDispatch();

  function onChange(e) {
    dispatch({ type: 'sortBy/set', payload: e.target.value });
  }

  return (
    <div className={c.SortSelect}>
      <select value={sortBy} onChange={onChange}>
        {Object.keys(SORT_BY).map((val) => (
          <option key={val} value={val}>
            {SORT_BY[val]}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortSelect;
