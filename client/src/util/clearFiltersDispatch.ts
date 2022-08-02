import formatDate from 'util/formatDate';

export const clearFilters = () => {
  const today = new Date();
  const startDate = new Date();
  startDate.setDate(today.getDate() - 7);

  const clearFiltersItems: any[] = [
    { type: 'dates/reset' },
    { type: 'topic/set', payload: 'all' },
    { type: 'accounts/institutions/set', payload: 'all' },
    { type: 'accounts/location/set', payload: 'all' },
    { type: 'accounts/identities/set', payload: 'all' },
    { type: 'accounts/categories/set', payload: 'all' },
    { type: 'platforms/reset' },
  ];

  return clearFiltersItems;
};
