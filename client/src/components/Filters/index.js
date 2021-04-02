import { useSelector } from 'react-redux';

import './index.css';

import DateFilter from '../DateFilter';
import TopicFilter from '../TopicFilter';
import SourceFilter from '../SourceFilter';
import PlatformFilter from '../PlatformFilter';

const Filters = () => {
  const { dates, topic, sources, platforms} = useSelector(state => state.filters);

  return (
    <div className='Filters'>
        <DateFilter dates={dates }/>
        <TopicFilter topic={topic} />
        <SourceFilter sources={sources} />
        <PlatformFilter platforms={platforms} />
    </div>
  );
}

export default Filters;