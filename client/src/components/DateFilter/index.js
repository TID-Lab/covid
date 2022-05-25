import { useDispatch } from 'react-redux';

import './index.css';

import LabeledDate from '../LabeledDate';

const DateFilter = (props) => {
  const { from, to } = props.dates;
  const dispatch = useDispatch();
  
  function onFromChanged(date) {
    dispatch({ type: 'dates/fromSet', payload: date })
  }

  function onToChanged(date) {
    dispatch({ type: 'dates/toSet', payload: date })
  }

  return (
    <div className='Filter'>
      <h3>Date Range</h3>
      <LabeledDate label='From' date={from} onDateChanged={onFromChanged} />
      <LabeledDate label='To' date={to} onDateChanged={onToChanged} />
    </div>
  );
};

export default DateFilter;