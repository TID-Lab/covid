import './index.css';

const Toggle = (props) => {
  const {
    toggled,
    onToggled,
    name,
    value,
  } = props;

  function toggle() {
    if (onToggled) onToggled(toggled);
  }

  return (
    <div className='Toggle'>
      <label>
      <input type='checkbox' value={value} checked={toggled} onChange={toggle}/>
      {name}
      </label>
    </div>
  );
};

export default Toggle;