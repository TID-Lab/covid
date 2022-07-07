import { useAppDispatch, useAppSelector } from 'hooks/useTypedRedux';
import Button from 'components/Button';
import c from './index.css';
import useTracker from 'hooks/useTracker';
import { ReactNode } from 'react';
import formatDate from 'util/formatDate';

interface ClearFiltersProps {
  children: ReactNode;
}
const ClearFilters = ({ children }: ClearFiltersProps) => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.filters);
  const { platforms } = filters;
  const { trackEvent } = useTracker();
  function onClick() {
    const today = new Date();
    let startDate = new Date();
    startDate.setDate(today.getDate() - 1);

    dispatch({
      type: 'dates/set',
      payload: {
        preset: 'today',
        from: formatDate(startDate),
        to: formatDate(today),
      },
    });

    dispatch({ type: 'topic/set', payload: 'all' });
    dispatch({ type: 'accounts/institutions/set', payload: 'all' });
    dispatch({ type: 'accounts/location/set', payload: 'all' });
    dispatch({ type: 'accounts/identities/set', payload: 'all' });
    dispatch({ type: 'accounts/categories/set', payload: 'all' });

    if (!platforms.includes('facebook')) {
      dispatch({ type: 'platforms/added', payload: 'facebook' });
    }
    if (!platforms.includes('instagram')) {
      dispatch({ type: 'platforms/added', payload: 'instagram' });
    }
    if (!platforms.includes('twitter')) {
      dispatch({ type: 'platforms/added', payload: 'twitter' });
    }
    trackEvent({
      category: 'Filter',
      action: 'Clear All Filters',
    });
  }

  return (
    <div>
      <Button variant="outline" size="md" onClick={onClick}>
        {children}
      </Button>
    </div>
  );
};

export default ClearFilters;
