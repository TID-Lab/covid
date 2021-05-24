import { useDispatch } from 'react-redux';

import Radio from '../Radio';

import './index.css';

const AccountLocation = (props) => {
  const { location } = props;
  const dispatch = useDispatch();

  function onAllSelected() {
    dispatch({ type: 'accounts/location/set', payload: 'all' })
  }

  function onGeorgiaSelected() {
    dispatch({ type: 'accounts/location/set', payload: 'georgia' })
  }

  function onNonGeorgiaSelected() {
    dispatch({ type: 'accounts/location/set', payload: 'nonGeorgia' })
  }

  return (
    <div className='AccountFilter'>
      <h4>Account location</h4>
      <Radio key={'all'} id={'all'} name='accountLocation' value={'All'} selected={location === 'all'} onSelected={onAllSelected}/>
      <Radio key={'georgia'} id={'georgia'} name='accountLocation' value={'Georgia'} selected={location === 'georgia'} onSelected={onGeorgiaSelected}/>
      <Radio key={'nonGeorgia'} id={'nonGeorgia'} name='accountLocation' value={'Non-Georgia'} selected={location === 'nonGeorgia'} onSelected={onNonGeorgiaSelected}/>
    </div>
  );
}

export default AccountLocation;