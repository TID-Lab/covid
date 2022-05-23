import { useDispatch } from 'react-redux';

import * as c from './index.module.css';


import Toggle from 'components/Toggle';

const PlatformFilter = (props) => {
  const { platforms } = props;
  const dispatch = useDispatch();
  
  function onToggled(value) {
    return (toggled) => {
      if (!toggled) {
        dispatch({ type: 'platforms/added', payload: value });
      } else {
        dispatch({ type: 'platforms/removed', payload: value });
      }
    }
  }

  return (
    <div className={c.Filter}>
      <h3>Platforms</h3>
      <Toggle name='Facebook' toggled={platforms.includes('facebook')} onToggled={onToggled('facebook')} />
      <Toggle name='Instagram' toggled={platforms.includes('instagram')} onToggled={onToggled('instagram')} />
      <Toggle name='Twitter' toggled={platforms.includes('twitter')} onToggled={onToggled('twitter')} />
    </div>
  );
};

export default PlatformFilter;