import PropTypes from 'prop-types';
// define button styles here
const btnStyle = {
  primary: "bg-primary hover:bg-gray-600 text-white rounded-full", //big primary button
  transparent: "",
  outline: ""
}

const btnSize = {
  sm:"",
  md:"",
  lg:"py-2 px-6 "
}


const Button = ({
  children, 
  onClick, 
  className, 
  style,
  variant = "primary",
  size = "lg"
}) => {

  return (
    <button 
    type="button"
    className={`grid gap-4 auto-cols-auto ${btnStyle[variant]} ${btnSize[size]} ${className}`}
    style={style}
    onClick={onClick}
    onKeyDown={onClick}
    >
     {children}
    </button>
  );
};
// replace with typescript way in the future
Button.propTypes = {
  variant: PropTypes.oneOf(["primary","transparent","outline"]),
  size: PropTypes.oneOf(["sm","md","lg"])

}

export default Button;