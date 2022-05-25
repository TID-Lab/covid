import './index.css';

const Toggle = (props) => {
  const {
    toggled,
    onToggled,
    name,
  } = props;

  function onClick() {
    onToggled(toggled);
  }

  const fillColor = toggled ? 'var(--body-primary-orange)': 'rgba(0,0,0,0)';
  const strokeColor = toggled ? 'var(--body-primary-orange)': '#868686';

  return (
    <div className='Toggle' onClick={onClick}>
      <label>
        <svg className="ToggleImage" viewBox="0 0 100 100" fill={fillColor} stroke={strokeColor}>
          <rect x="10" y="10" width="80" height="80" strokeWidth="15" rx="10" ry="10" />
          {
            toggled ?
            <path d="M 25 50 L 45 75 L 80 25" strokeWidth="12" stroke="white" strokeLinejoin="round" />
            : ''
          }
        </svg>
        {name}
      </label>
    </div>
  );
};

export default Toggle;