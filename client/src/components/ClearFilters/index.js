import { useDispatch, useSelector } from 'react-redux';

import c from './index.css';

const ClearFilters = () => {
  const dispatch = useDispatch();
  const filters = useSelector(state => state.filters);
  const { platforms } = filters;

  function onClick() {
    dispatch({ type: 'dates/fromSet', payload: ''});
    dispatch({ type: 'dates/toSet', payload: ''});

    dispatch({ type: 'topic/set', payload: 'all' });
    dispatch({ type: 'accounts/institutions/set', payload: 'all' });
    dispatch({ type: 'accounts/location/set', payload: 'all' });
    dispatch({ type: 'accounts/identities/set', payload: 'all' });
    dispatch({ type: 'accounts/categories/set', payload: 'all' });

    if (!platforms.includes('facebook')) {
      dispatch({ type: 'platforms/added', payload: 'facebook'});
    }
    if (!platforms.includes('instagram')) {
      dispatch({ type: 'platforms/added', payload: 'instagram'});
    }
    if (!platforms.includes('twitter')) {
      dispatch({ type: 'platforms/added', payload: 'twitter'});
    }
  }

  return(
    <div className='ClearFilters' onClick={onClick}>
      <button>Clear Filters</button>
    </div>
  );
}

export default ClearFilters;
