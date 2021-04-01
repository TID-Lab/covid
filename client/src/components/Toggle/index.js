import { useState, useEffect } from 'react';

import './index.css';

const Toggle = (props) => {
  const {
    checked:defaultChecked,
    onChecked,
    name,
    value,
  } = props;
  const [ checked, setChecked ] = useState(!!defaultChecked || false);

  function toggleChecked(e) {
    setChecked(e.target.checked);
  }

  useEffect(() => {
    if (onChecked) onChecked(checked);
  });

  return (
    <div className='Toggle'>
      <label>
      <input type='checkbox' value={value} checked={checked} onChange={toggleChecked}/>
      {name}
      </label>
    </div>
  );
};

export default Toggle;