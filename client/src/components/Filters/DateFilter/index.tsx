// @ts-nocheck
import { useDispatch } from 'react-redux';

import c from './index.module.css';

import LabeledDate from 'components/LabeledDate';
import useTracker from 'hooks/useTracker';

const DateFilter = (props) => {
  const { from, to } = props.dates;
  const dispatch = useDispatch();
  const {trackEvent} = useTracker();
  
  function onFromChanged(date) {
    dispatch({ type: 'dates/fromSet', payload: date });
    trackEvent({ category: 'Filter', action: 'Set From Date', name: date} as MatomoEvent)

  }

  function onToChanged(date) {
    dispatch({ type: 'dates/toSet', payload: date });
    trackEvent({ category: 'Filter', action: 'Set To Date', name: date} as MatomoEvent)

  }

  return (
    <div className="Filter">
      <h3>Date Range</h3>
      <LabeledDate label="From" date={from} onDateChanged={onFromChanged} />
      <LabeledDate label="To" date={to} onDateChanged={onToChanged} />
    </div>
  );
};

export default DateFilter;
