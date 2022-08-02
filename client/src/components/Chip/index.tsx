import Icon from 'components/Icon';
import { HTMLAttributes, ReactNode } from 'react';

interface ChipProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  active: boolean;
}

export const ChipStyle = {
  common:
    ' cursor-pointer border text-sm rounded-xs flex gap-x-1 items-center ',
  default:
    ' border-slate-400 active:bg-blue-200 text-slate-700 hover:bg-blue-100 py-2 px-5  ',
  active:
    ' bg-blue-100 border-blue-300 text-blue-800 font-bold py-2 pl-3 pr-5 ',
};

const Chip = ({ children, className, active, ...props }: ChipProps) => {
  return (
    <div
      className={`${ChipStyle.common} ${
        active ? ChipStyle.active : ChipStyle.default
      } ${className}`}
      {...props}
    >
      <span
        className={`overflow-hidden inline-block  ${
          active ? ' w-auto ' : ' w-0 '
        }`}
      >
        <Icon type="check" size="sm" />
      </span>
      {children}
    </div>
  );
};

export default Chip;
