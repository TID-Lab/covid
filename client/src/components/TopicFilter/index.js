import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { COVID_TOPICS } from '../../../../constants';

import './index.css';

import Radio from '../Radio';

const TopicFilter = (props) => {
  const { topic } = props;
  const dispatch = useDispatch();

  function onSelected(id) {
    return () => {
      dispatch({ type: 'topic/set', payload: id });
    }
  }

  return (
    <div className='Filter Topics'>
      <h3>COVID-19 Topics</h3>
      {Object.keys(COVID_TOPICS).map(id => (
        <Radio key={id} id={id} name='topics' value={COVID_TOPICS[id]} selected={id === topic} onSelected={onSelected(id)}/>
      ))}
      <Link to='/settings/topics'>
        <span>Edit Topics</span>
      </Link>
    </div>
  );
};

export default TopicFilter;