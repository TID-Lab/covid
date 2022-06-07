import React, { CSSProperties } from "react";

// define button styles here

export enum Style {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  OUTLINE = 'outline'
}

export enum Size {
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl'
}
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
  xl: ''
};

const Button = ({
  children,
  disabled = false,
  id,
  onClick,
  className,
  style,
  variant = Style.PRIMARY,
  size = Size.LG,
}:ButtonProps) => {
  return (
    <button
      type="button"
      id={id}
      className={`grid gap-4 auto-cols-auto ${btnStyle[variant]} ${btnSize[size]} ${className}`}
      style={style}
      onClick={()=> onClick()}
      //onKeyDown={()=>onClick()}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
interface ButtonProps {
  children?: React.ReactNode
  disabled?: boolean
  id?: string
  onClick?:any
  className?: string
  style?: CSSProperties
  variant?: Style
  size?: Size
}
export default Button;
