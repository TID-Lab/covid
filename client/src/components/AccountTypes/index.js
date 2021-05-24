import { useDispatch } from 'react-redux';

import Radio from '../Radio';

import './index.css';

const AccountTypes = (props) => {
  const { institutions } = props;
  const dispatch = useDispatch();

  function onAllSelected() {
    dispatch({ type: 'accounts/institutions/set', payload: 'all' })
  }

  function onInstitutionalSelected() {
    dispatch({ type: 'accounts/institutions/set', payload: 'institutional' })
  }

  function onNonInstitutionalSelected() {
    dispatch({ type: 'accounts/institutions/set', payload: 'nonInstitutional' })
  }

  return (
    <div className='AccountFilter'>
      <h4>Type of account</h4>
      <Radio key={'all'} id={'all'} name='accountInstitutional' value={'All'} selected={institutions === 'all'} onSelected={onAllSelected}/>
      <Radio key={'institutional'} id={'institutional'} name='accountInstitutional' value={'Institutional'} selected={institutions === 'institutional'} onSelected={onInstitutionalSelected}/>
      <Radio key={'nonInstitutional'} id={'nonInstitutional'} name='accountInstitutional' value={'Non-Institutional'} selected={institutions === 'nonInstitutional'} onSelected={onNonInstitutionalSelected}/>
    </div>
  );
}

export default AccountTypes;