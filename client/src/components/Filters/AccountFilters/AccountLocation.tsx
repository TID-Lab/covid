// @ts-nocheck
import { useAppDispatch } from 'hooks/useTypedRedux';

import Radio from 'components/Radio';

import c from './index.module.css';
import useTracker from 'hooks/useTracker';

const AccountLocation = (props) => {
  const { location } = props;
  const dispatch = useAppDispatch();
  const { trackEvent } = useTracker();

  function onRadioClick(id) {
    dispatch({ type: 'accounts/location/set', payload: id });
    trackEvent({
      category: 'Filter',
      action: 'Set Account Location',
      name: id,
    });
  }

  return (
    <div className={c.AccountFilter}>
      <h4>Account location</h4>

      <Radio
        id={'all'}
        name={'All'}
        selected={location}
        onClick={onRadioClick}
      />
      <Radio
        id={'georgia'}
        name={'Georgia'}
        selected={location}
        onClick={onRadioClick}
      />
      <Radio
        id={'nonGeorgia'}
        name={'Non-Georgia'}
        selected={location}
        onClick={onRadioClick}
      />
    </div>
  );
};

export default AccountLocation;
