import { useDispatch } from 'react-redux';

import Radio from 'components/Radio';

import * as c from './index.module.css';


const IDENTITIES = {
  'all': 'All',
  'blackafam': 'Black/African American',
  'latinx': 'Hispanic/Latinx',
}

const AccountIdentity = (props) => {
  const { identities: identity } = props;
  const dispatch = useDispatch();

  function onRadioClick(id) {
    dispatch({ type: 'accounts/identities/set', payload: id })
  }


  return (
    <div className={c.AccountFilter}>
      <h4>Account identity</h4>
      {Object.keys(IDENTITIES).map(id => (
        <Radio key={id} id={id} name={IDENTITIES[id]} selected={identity} onClick={onRadioClick}/>
      ))}
    </div>
  );
}

export default AccountIdentity;