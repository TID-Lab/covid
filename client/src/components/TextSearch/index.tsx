import Icon from 'components/Icon';
import useTracker from 'hooks/useTracker';
import { useAppDispatch } from 'hooks/useTypedRedux';
import { ChangeEvent } from 'react';
import c from './index.module.css';

let timeout: any;

const TextSearch = ({ ...props }) => {
  const dispatch = useAppDispatch();
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
    <div className={` ml-6 flex items-center ${c.TextSearch}`}>
      <input
        type="text"
        className="w-[400px] py-1 pr-8  placeholder:text-slate-500 rounded-xs pl-[15px]  "
        onChange={onChange}
        placeholder="Search"
      />

      <Icon type="search-sm" className="-ml-9 text-slate-500" />
    </div>
  );
};

export default TextSearch;
