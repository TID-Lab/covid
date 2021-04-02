import './index.css';

const LabeledDate = (props) => {
  const {
    date,
    onDateChanged,
    label,
  } = props;

  function onChange(e) {
    if (onDateChanged) onDateChanged(e.target.value)
  }

  return (
    <div className='LabeledDate'>
      <label>
        {label}
        <input type='date' value={date} onChange={onChange}/>
      </label>
    </div>
  );
};

export default LabeledDate;