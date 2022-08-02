import { useAppDispatch, useAppSelector } from 'hooks/useTypedRedux';
import Button from 'components/Button';
import c from './index.css';
import useTracker from 'hooks/useTracker';
import { HTMLAttributes, ReactNode } from 'react';
import formatDate from 'util/formatDate';
import { clearFilters } from 'util/clearFiltersDispatch';

interface ClearFiltersProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}
const ClearFilters = ({ children, ...props }: ClearFiltersProps) => {
  const dispatch = useAppDispatch();
  const { trackEvent } = useTracker();
  function onClick() {
    const clearItems = clearFilters();
    clearItems.forEach((item: any) => dispatch(item));
    trackEvent({
      category: 'Filter',
      action: 'Clear All Filters',
    });
  }

  return (
    <div {...props}>
      <Button variant="outline" size="md" onClick={onClick}>
        {children}
      </Button>
    </div>
  );
};

export default ClearFilters;
