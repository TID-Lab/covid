import './index.css';


const Radio = (props) => {
  const { name, value, id, selected, onSelected } = props;

  function onChange() {
    if (onSelected) onSelected();
  }

  return (
    <div className='Radio'>
      <label>
        <input type='radio' name={name} id={id} onChange={onChange} checked={selected} />
        {value}
      </label>
    </div>
  );
};

export default Radio;