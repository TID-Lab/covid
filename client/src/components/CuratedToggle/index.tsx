// @ts-nocheck
import { useAppDispatch } from 'hooks/useTypedRedux';

import Radio from '../Radio';

import c from './index.module.css';
import useTracker from 'hooks/useTracker';

const CuratedToggle = (props) => {
  const { curatedOnly } = props;
  const dispatch = useAppDispatch();
  const { trackEvent } = useTracker();

  function onRadioClick(id) {
    dispatch({ type: 'accounts/curatedOnly/set', payload: id !== 'all' });
    trackEvent({
      category: 'Filter',
      action: 'Set Curated Accounts',
      name: id !== 'all',
    });
  }

  const selected = curatedOnly ? 'curatedOnly' : 'all';

  return (
    <div className="AccountFilter">
      <Radio
        id={'all'}
        name={'All-platform search'}
        selected={selected}
        onClick={onRadioClick}
      />
      <Radio
        id={'curatedOnly'}
        name={'Curated accounts'}
        selected={selected}
        onClick={onRadioClick}
      />
    </div>
  );
};

export default CuratedToggle;
