import { useDispatch } from 'react-redux';

import './index.css';

import Radio from '../Radio';

const COVID_TOPICS = { // temporary
  'all': 'All',
  'vaccines': 'Vaccines',
  'booster': 'Boosters',
  'treatments':' Treatments',
  'variants': 'Variants',
  'long-hauler': 'Long COVID',
  'testing': 'Testing',
  'covid-diabetes': 'COVID x Diabetes',
  'georgia': 'Georgia'
}

const TopicFilter = (props) => {
  const { topic } = props;
  const dispatch = useDispatch();

  function onRadioClick(id) {
    dispatch({ type: 'topic/set', payload: id });
  }

  return (
    <div className='Filter Topics'>
      <h3>COVID-19 Topics</h3>
      {Object.keys(COVID_TOPICS).map(id => (
        <Radio key={id} id={id} name={COVID_TOPICS[id]} selected={topic} onClick={onRadioClick}/>
      ))}
      {/* <Link to='/settings/topics'>
        <span>Edit Topics</span>
      </Link> */}
    </div>
  );
};

export default TopicFilter;