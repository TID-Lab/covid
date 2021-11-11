import { useDispatch } from 'react-redux';

import Radio from '../Radio';

import './index.css';

const CATEGORIES = {
  'all': 'All',
  'government': 'Government',
  'media': 'Media',
  'faith': 'Faith',
  'health': 'Health',
  'diabetes': 'Diabetes',
  'misinfo': 'Known Misinfo Spreaders',
  'partners': 'Project Partners',
  'trusted': 'Trusted Resources',
}

const AccountCategories = (props) => {
  const { categories: category } = props;
  const dispatch = useDispatch();

  function onRadioClick(id) {
    dispatch({ type: 'accounts/categories/set', payload: id })
  }


  return (
    <div className='AccountFilter'>
      <h4>Account categories</h4>
      {Object.keys(CATEGORIES).map(id => (
        <Radio key={id} id={id} name={CATEGORIES[id]} selected={category} onClick={onRadioClick}/>
      ))}
    </div>
  );
}

export default AccountCategories;