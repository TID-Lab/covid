// @ts-nocheck
import PropTypes from 'prop-types';
// define button styles here
const btnStyle = {
  primary: 'bg-primary hover:bg-gray-600 text-white rounded-full', //big primary button
  secondary: 'bg-gray-100 hover:bg-gray-300 text-black rounded-md',
  transparent: '',
  outline: '',
};

const btnSize = {
  sm: '',
  md: 'py1 px-4',
  lg: 'py-2 px-6 ',
};

const Button = ({
  children,
  disabled = false,
  id,
  onClick,
  className,
  style,
  variant = 'primary',
  size = 'lg',
}) => {
  return (
    <button
      type="button"
      id={id}
      className={`grid gap-4 auto-cols-auto ${btnStyle[variant]} ${btnSize[size]} ${className}`}
      style={style}
      onClick={onClick}
      onKeyDown={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
// replace with typescript way in the future
Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'transparent', 'outline']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
};

export default Button;
