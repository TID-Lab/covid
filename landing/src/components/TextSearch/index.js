import { useDispatch } from 'react-redux';

import './index.css';

let timeout

const TextSearch = () => {
  const dispatch = useDispatch();

  function onChange(e) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      dispatch({ type: 'search/set', payload: e.target.value });
    }, 2000)
  }

  return (
    <div className='TextSearch'>
      <input type='text' onChange={onChange} placeholder='Search' />
    </div>
  );
};

export default TextSearch;