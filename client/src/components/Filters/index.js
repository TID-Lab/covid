import './index.css';

import DateFilter from '../DateFilter';
import TopicFilter from '../TopicFilter';
import SourceFilter from '../SourceFilter';
import PlatformFilter from '../PlatformFilter';

const Filters = () => {
  return (
    <div class='Filters'>
      <DateFilter />
      <TopicFilter />
      <SourceFilter />
      <PlatformFilter />
    </div>
  );
}

export default Filters;