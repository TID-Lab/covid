import {
  AriaAttributes,
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  ReactNode,
} from 'react';
// define button styles here

const btnStyle = {
  primary:
    'bg-blue-100 hover:bg-blue-200 border-[1.5px] border-blue-300 active:border-blue-400 rounded-xs', //big primary button
  secondary: 'bg-slate-100 hover:bg-slate-300 text-black rounded-xs',
  transparent: '',
  outline:
    'border border-currentColor hover:bg-gray-300 text-black rounded-full',
};

const btnSize = {
  sm: 'py-0 px-2',
  md: 'py-1 px-4',
  lg: 'py-2 px-6 ',
  xl: 'py-4 px-9',
};

const Button = ({
  children,
  onClick,
  className,
  variant = 'primary',
  size = 'lg',
  ...props
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={`grid gap-4 auto-cols-auto  focus-visible:ring focus-visible:outline-0 ring-offset-2 font-medium ${btnStyle[variant]} ${btnSize[size]} ${className}`}
      onClick={() => onClick()}
      //onKeyDown={()=>onClick()}
      {...props}
    >
      {children}
    </button>
  );
};
interface ButtonProps
  extends DetailedHTMLProps<
      ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    AriaAttributes {
  children?: ReactNode;
  disabled?: boolean;
  onClick?: any;
  className?: string;
  variant?: keyof typeof btnStyle;
  size?: keyof typeof btnSize;
}
export default Button;
