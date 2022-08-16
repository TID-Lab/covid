import Icon from 'components/Icon';
import useTracker from 'hooks/useTracker';
import { useAppDispatch } from 'hooks/useTypedRedux';
import { ChangeEvent, HTMLAttributes } from 'react';
import c from './index.module.css';

let timeout: any;

interface TextSearchProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  storetarget?: string;
}

const TextSearch = ({ className, ...props }: TextSearchProps) => {
  const dispatch = useAppDispatch();
  const { trackEvent } = useTracker();

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      dispatch({
        type: props.storetarget || 'search/set',
        payload: e.target.value,
      });
      trackEvent({
        category: 'Filter',
        action: 'Search',
        name: e.target.value,
      });
    }, 2000);
  }

  function onKeyUp(e: any) {
    dispatch({
      type: props.storetarget || 'search/set',
      payload: e.target.value,
    });
  }

  return (
    <div
      className={`flex items-center w-full ${c.TextSearch} ${className}`}
      {...props}
    >
      <input
        type="text"
        className="input w-full py-1 pr-8  placeholder:text-slate-500 rounded-xs pl-[15px]  "
        onChange={onChange}
        onKeyUp={onKeyUp}
        placeholder="Search"
      />

      <Icon type="search" size="sm" className="-ml-9 text-slate-500" />
    </div>
  );
};

export default TextSearch;
