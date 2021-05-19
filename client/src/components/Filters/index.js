import { useSelector, useDispatch } from 'react-redux';

import './index.css';

import DateFilter from '../DateFilter';
import TopicFilter from '../TopicFilter';
import SourceFilter from '../SourceFilter';
import PlatformFilter from '../PlatformFilter';
import { getPosts } from '../../api/post';
import { useEffect } from 'react';

const Filters = () => {
  const dispatch = useDispatch();
  const filters = useSelector(state => state.filters);
  const { dates, topic, sources, platforms } = filters;

  // useEffect(() => {
  //   getPosts(filters).then(posts => dispatch('posts/set', { payload: posts }))
  // }, [ filters, dispatch ])

  return (
    <div className='Filters'>
        <DateFilter dates={dates } />
        <TopicFilter topic={topic} />
        <SourceFilter sources={sources} />
        <PlatformFilter platforms={platforms} />
    </div>
  );
}

export default Filters;