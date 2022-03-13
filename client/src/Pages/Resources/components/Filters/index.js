import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import "./index.css";

//import TopicFilter from '../TopicFilter';

// Filter by Topic
import TopicFilter from "../TopicFilter";
// Filter by Account
// Other Filters
import { getPosts } from '../../../../api/post';
import notify from '../../../../util/notify';



const Filter = () => {
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
        <TopicFilter topic={topic} />
    </div>
  )
}

export default Filter;