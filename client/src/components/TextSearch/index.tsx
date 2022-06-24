import useTracker from 'hooks/useTracker';
import { useDispatch } from 'react-redux';
import { ChangeEvent } from 'react';
import c from './index.module.css';

let timeout: any;

const TextSearch = () => {
  const dispatch = useDispatch();
  const { trackEvent } = useTracker();

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      dispatch({ type: 'search/set', payload: e.target.value });
      trackEvent({
        category: 'Filter',
        action: 'Search',
        name: e.target.value,
      });
    }, 2000);
  }

  return (
    <div className={c.TextSearch}>
      <input type="text" onChange={onChange} placeholder="Search" />
    </div>
  );
};

export default TextSearch;
