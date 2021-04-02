import { useDispatch } from 'react-redux';

import Topic from '../Topic';

const TOPICS = {
  'all': 'All',
  'covid-diabetes': 'COVID x Diabetes',
  'testing': 'Testing',
  'vaccines': 'Vaccines',
  'long-hauler': 'Long-hauler',
  'georgia': 'Georgia'
}

const TopicFilter = (props) => {
  const { topic } = props;
  const dispatch = useDispatch();

  function onSelected(id) {
    return () => {
      dispatch({ type: 'topic/set', payload: id });
    }
  }

  return (
    <div className='Filter'>
      <h3>COVID-19 Topics</h3>
      {Object.keys(TOPICS).map(id => (
        <Topic key={id} id={id} name={TOPICS[id]} selected={id === topic} onSelected={onSelected(id)}/>
      ))}
    </div>
  );
};

export default TopicFilter;