import './index.css';

import Toggle from '../Toggle';

const SourceFilter = () => {
  return (
    <div className='Filter Sources'>
      <h3>Source Filters</h3>
      <Toggle name='Official only' value='official-only' />
      <section>
        <Toggle name='Government' value='government' />
        <Toggle name='Media' value='media' />
        <Toggle name='Health' value='health' />
      </section>
      <Toggle name='Non-official only' value='non-official-only' />
      <Toggle name='Georgia only' value='georgia-only' />
      <Toggle name='Health only' value='health-only' />
      <section>
        <Toggle name='Diabetes' value='diabetes' />
      </section>
    </div>
  );
};

export default SourceFilter;