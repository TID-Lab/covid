import './index.css';

import LabeledDate from '../LabeledDate';

const DateFilter = () => {
  return (
    <div className='Filter'>
      <h3>Date Filter</h3>
      <LabeledDate label='From' />

      <LabeledDate label='To' />
    </div>
  );
};

export default DateFilter;