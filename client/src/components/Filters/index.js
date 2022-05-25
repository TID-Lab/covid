import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import './index.css';

import DateFilter from '../DateFilter';
import TopicFilter from '../TopicFilter';
import AccountFilters from '../AccountFilters';
import PlatformFilter from '../PlatformFilter';
import { getPosts } from '../../api/post';
import notify from '../../util/notify';

const Filters = () => {
  const dispatch = useDispatch();
  const filters = useSelector(state => state.filters);
  const { dates, topic, accounts, platforms } = filters;

  useEffect(() => {
    getPosts(filters)
      .then(posts => {
        dispatch({ type: 'posts/set', payload: posts });
      })
      .catch(_ => notify('An error occurred.'));
  }, [ filters, dispatch ])

  return (
    <div className='Filters'>
        <DateFilter dates={dates } />
        <TopicFilter topic={topic} />
        <AccountFilters accounts={accounts} />
        <PlatformFilter platforms={platforms} />
    </div>
  );
}

export default Filters;