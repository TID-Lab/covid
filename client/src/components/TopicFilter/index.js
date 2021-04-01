import { useState } from 'react';

import '../Topic';
import Topic from '../Topic';

const TOPICS = {
  'all': 'All',
  'covid-diabetes': 'COVID x Diabetes',
  'testing': 'Testing',
  'vaccines': 'Vaccines',
  'long-hauler': 'Long-hauler',
  'georgia': 'Georgia'
}

const TopicFilter = () => {
  const [ selected, setSelected ] = useState(Object.keys(TOPICS)[0]);

  function onClick(id) {
    return () => {
      setSelected(id);
    }
  }

  return (
    <div className='Filter'>
      <h3>COVID Topics</h3>
      {Object.keys(TOPICS).map( id => (
        <Topic key={id} id={id} name={TOPICS[id]} onClick={onClick(id)} />
      ))}
    </div>
  );
};

export default TopicFilter;