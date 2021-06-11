import { useDispatch } from 'react-redux';

import Radio from '../Radio';

import './index.css';

const CATEGORIES = {
  'all': 'All',
  'government': 'Government',
  'media': 'Media',
  'faith': 'Faith',
  'health': 'Health',
  'diabetes': 'Diabetes'
}

const AccountCategories = (props) => {
  const { categories: category } = props;
  const dispatch = useDispatch();

  function onSelected(id) {
    return () => {
      dispatch({ type: 'accounts/categories/set', payload: id });
    }
  }

  return (
    <div className='AccountFilter'>
      <h4>Account categories</h4>
      {Object.keys(CATEGORIES).map(id => (
        <Radio key={id} id={id} name='accountCategories' value={CATEGORIES[id]} selected={id === category} onSelected={onSelected(id)}/>
      ))}
    </div>
  );
}

export default AccountCategories;