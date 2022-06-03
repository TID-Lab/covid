// @ts-nocheck
const Radio = (props) => {
  const { name, id, selected, onClick } = props;

  const isSelected = selected === id;

  const color = isSelected ? 'var(--body-primary-orange)' : '#868686';

  function onRadioClick() {
    onClick(id);
  }

  return (
    <div className="my-2" onClick={onRadioClick}>
      <label className="text-base flex items-center">
        <svg
          viewBox="0 0 100 100"
          className="w-4 h-4 mr-2"
          height="100"
          width="100"
          stroke={color}
          fill={color}
        >
          <circle cx="50" cy="50" r="40" strokeWidth="15" fill="rgb(0,0,0,0)" />
          {isSelected ? <circle cx="50" cy="50" r="20" strokeWidth="0" /> : ''}
        </svg>
        {name}
      </label>
    </div>
  );
};

export default Radio;
