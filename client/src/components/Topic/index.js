import './index.css';

const Topic = (props) => {
  const { name, id, onClick } = props;

  return (
    <div className='Topic'>
      <label>
        <input type='radio' name='topics' id={id} onClick={onClick} />
        {name}
      </label>
    </div>
  );
};

export default Topic;