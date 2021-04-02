import { useDispatch } from 'react-redux';

import './index.css';

import Toggle from '../Toggle';

const SourceFilter = (props) => {
  const { sources } = props;
  const dispatch = useDispatch();

  function onToggled(value) {
    return (toggled) => {
      if (!toggled) {
        dispatch({ type: 'sources/added', payload: value });
      } else {
        dispatch({ type: 'sources/removed', payload: value });
      }
    }
  }

  console.log(sources);

  return (
    <div className='Filter Sources'>
      <h3>Source Filters</h3>
      <Toggle name='Official only' value='official-only' toggled={sources.includes('official-only')} onToggled={onToggled('official-only')} />
      <section>
        <Toggle name='Government' value='government' toggled={sources.includes('government')} onToggled={onToggled('government')} />
        <Toggle name='Media' value='media' toggled={sources.includes('media')} onToggled={onToggled('media')} />
        <Toggle name='Health' value='health' toggled={sources.includes('health')} onToggled={onToggled('health')} />
      </section>
      <Toggle name='Non-official only' value='non-official-only' toggled={sources.includes('non-official-only')} onToggled={onToggled('non-official-only')} />
      <Toggle name='Georgia only' value='georgia-only'toggled={sources.includes('georgia-only')}  onToggled={onToggled('georgia-only')} />
      <Toggle name='Health only' value='health-only' toggled={sources.includes('health-only')} onToggled={onToggled('health-only')} />
      <section>
        <Toggle name='Diabetes' value='diabetes' toggled={sources.includes('diabetes')} onToggled={onToggled('diabetes')} />
      </section>
    </div>
  );
};

export default SourceFilter;