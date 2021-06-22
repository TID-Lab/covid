import { useDispatch } from 'react-redux';

import Radio from '../Radio';

import './index.css';

const AccountLocation = (props) => {
  const { location } = props;
  const dispatch = useDispatch();

  function onRadioClick(id) {
    dispatch({ type: 'accounts/location/set', payload: id })
  }

  return (
    <div className='AccountFilter'>
      <h4>Account location</h4>
      <Radio id={'all'} name={'All'} selected={location} onClick={onRadioClick}/>
      <Radio id={'georgia'} name={'Georgia'} selected={location} onClick={onRadioClick}/>
      <Radio id={'nonGeorgia'} name={'Non-Georgia'} selected={location} onClick={onRadioClick}/>
    </div>
  );
}

export default AccountLocation;