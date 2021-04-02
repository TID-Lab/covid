import { useState, useEffect } from 'react';

import './index.css';

const LabeledDate = (props) => {
  const {
    date:defaultDate,
    onDateChanged,
    label,
  } = props;
  const [ date, setDate ] = useState(defaultDate);

  function onChange(e) {
    setDate(e.target.value);
  }

  useEffect(() => {
    if (onDateChanged) onDateChanged(date);
  });

  return (
    <div className='LabeledDate'>
      <label>
      {label}
      <input type='date' value={defaultDate} onChange={onChange}/>
      </label>
    </div>
  );
};

export default LabeledDate;