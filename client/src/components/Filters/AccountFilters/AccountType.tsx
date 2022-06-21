// @ts-nocheck
import { useDispatch } from 'react-redux';

import Radio from 'components/Radio';

import c from './index.module.css';
import useTracker from 'hooks/useTracker';
import { ACC_TYPE } from 'util/filterData';

const AccountTypes = (props) => {
  const { institutions } = props;
  const dispatch = useDispatch();
  const { trackEvent } = useTracker();

  function onRadioClick(id) {
    dispatch({ type: 'accounts/institutions/set', payload: id });
    trackEvent({
      category: 'Filter',
      action: 'Set Account Type',
      name: id,
    } as MatomoEvent);
  }

  return (
    <div className={c.AccountFilter}>
      <h4>Type of account</h4>
      {Object.keys(ACC_TYPE).map((id) => (
        <Radio
          key={id}
          id={id}
          name={ACC_TYPE[id]}
          selected={institutions}
          onClick={onRadioClick}
        />
      ))}
    </div>
  );
};

export default AccountTypes;
