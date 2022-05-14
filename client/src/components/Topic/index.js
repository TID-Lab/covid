import * as c from './index.module.css';
;


const Topic = (props) => {
  const { name, id, selected, onSelected } = props;

  function onChange() {
    if (onSelected) onSelected();
  }

  return (
    <div className='Topic'>
      <label>
        <input type='radio' name='topics' id={id} onChange={onChange} checked={selected} />
        {name}
      </label>
    </div>
  );
};

export default Topic;