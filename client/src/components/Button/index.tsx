import {
  AriaAttributes,
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  HTMLAttributes,
  ReactNode,
} from 'react';
// define button styles here

const btnStyle = {
  primary:
    'bg-blue-100 hover:bg-blue-200 border-[1.5px] border-blue-300 active:border-blue-400 ', //big primary button
  secondary:
    'bg-slate-100 border-[1.5px] border-slate-300 hover:bg-slate-300 text-black ',
  transparent: 'hover:bg-slate-300 rounded-xs ',
  outline: 'border border-currentColor hover:bg-gray-300 text-black ',
};

const btnSize = {
  sm: 'py-0 px-4 gap-2',
  md: 'py-1 px-4 gap-3',
  lg: 'py-2 px-6 gap-4',
  xl: 'py-4 px-9 gap-4',
};

const Button = ({
  children,
  onClick,
  className,
  variant = 'primary',
  size = 'lg',
  rounded = false,
  ...props
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={` flex items-center  ${
        rounded ? 'rounded-full' : 'rounded-xs'
      }  focus-visible:ring focus-visible:outline-0 ring-offset-2 font-medium ${
        btnStyle[variant]
      } ${btnSize[size]} ${className}`}
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
  onClick?: any;
  className?: undefined | string;
  rounded?: boolean;
  variant?: keyof typeof btnStyle;
  size?: keyof typeof btnSize;
}
export default Button;
