import { useDispatch } from 'react-redux';

import Radio from '../Radio';

import './index.css';

const CuratedToggle = (props) => {
  const { curatedOnly } = props;
  const dispatch = useDispatch();

  function onRadioClick(id) {
    dispatch({ type: 'accounts/curatedOnly/set', payload: id !== 'all' })
  }

  const selected = curatedOnly ? 'curatedOnly' : 'all';

  return (
    <div className='AccountFilter'>
      <Radio id={'all'} name={'All-platform search'} selected={selected} onClick={onRadioClick}/>
      <Radio id={'curatedOnly'} name={'Curated accounts'} selected={selected} onClick={onRadioClick}/>
    </div>
  );
}

export default CuratedToggle;