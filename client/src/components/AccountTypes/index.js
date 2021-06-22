import { useDispatch } from 'react-redux';

import Radio from '../Radio';

import './index.css';

const AccountTypes = (props) => {
  const { institutions } = props;
  const dispatch = useDispatch();

  function onRadioClick(id) {
    dispatch({ type: 'accounts/institutions/set', payload: id })
  }

  return (
    <div className='AccountFilter'>
      <h4>Type of account</h4>
      <Radio id={'all'} name={'All'} selected={institutions} onClick={onRadioClick}/>
      <Radio id={'institutional'} name={'Institutional'} selected={institutions} onClick={onRadioClick}/>
      <Radio id={'nonInstitutional'} name={'Non-Institutional'} selected={institutions} onClick={onRadioClick}/>
    </div>
  );
}

export default AccountTypes;