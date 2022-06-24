// @ts-nocheck
import { useDispatch, useSelector } from 'react-redux';

import c from './index.module.css';

import Toggle from 'components/Toggle';
import useTracker from 'hooks/useTracker';

const PlatformFilter = (props) => {
  const { platforms } = props;
  const dispatch = useDispatch();
  const { trackEvent } = useTracker();

  function onToggled(value) {
    return (toggled) => {
      if (!toggled) {
        dispatch({ type: 'platforms/added', payload: value });
        trackEvent({ category: 'Filter', action: 'Add Platform', name: value });
      } else {
        dispatch({ type: 'platforms/removed', payload: value });
        trackEvent({
          category: 'Filter',
          action: 'Remove Platform',
          name: value,
        });
      }
    };
  }

  return (
    <div className={c.Filter}>
      <h3>Platforms</h3>
      <Toggle
        name="Facebook"
        toggled={platforms.includes('facebook')}
        onToggled={onToggled('facebook')}
      />
      <Toggle
        name="Instagram"
        toggled={platforms.includes('instagram')}
        onToggled={onToggled('instagram')}
      />
      <Toggle
        name="Twitter"
        toggled={platforms.includes('twitter')}
        onToggled={onToggled('twitter')}
      />
    </div>
  );
};

export default PlatformFilter;
