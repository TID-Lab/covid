import './index.css';


const Source = (props) => {
  const { name, id, selected, onSelected } = props;

  function onChange() {
    if (onSelected) onSelected();
  }

  return (
    <div className='Source'>
      <label>
        <input type='radio' name='sources' id={id} onChange={onChange} checked={selected} />
        {name}
      </label>
    </div>
  );
};

export default Source;