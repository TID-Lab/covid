import './index.css';

import Toggle from '../Toggle';

const PlatformFilter = () => {
  return (
    <div className='Filter'>
      <h3>Platforms</h3>
      <Toggle name='Facebook' value='facebook' />
      <Toggle name='Instagram' value='instagram' />
      <Toggle name='Twitter' value='twitter' />
    </div>
  );
};

export default PlatformFilter;