import { useSelector, useDispatch } from 'react-redux';

import './index.css';

const SORT_BY = {
  'engagement': 'Most engagement (scaled)',
  'foo-bar': 'Foo bar',
}

const SortSelect = () => {
  const sortBy = useSelector(state => state.filters.sortBy);
  const dispatch = useDispatch();

  function onChange(e) {
    dispatch({ type: 'sortBy/set', payload: e.target.value });
  }

  return (
    <div className='SortSelect'>
      <select value={sortBy} onChange={onChange}>
      {Object.keys(SORT_BY).map(val => (
        <option value={val}>{SORT_BY[val]}</option>
      ))}
      </select>
    </div>
  );
};

export default SortSelect;