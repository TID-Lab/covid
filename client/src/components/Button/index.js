const Button = ({children,onClick}) => {


  return (
    <button 
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    onClick={onClick}
    onKeyPress={onClick}
    >
     {children}
    </button>
  );
};

export default Button;