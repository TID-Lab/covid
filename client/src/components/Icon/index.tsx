import icons from 'util/icons/iconlist.json';
import { HTMLAttributes } from 'react';
export type iconType = keyof typeof icons;

const iconSizes = {
  '2xs': 12,
  xs: 16,
  sm: 20,
  md: 24,
  lg: 28,
};

interface IconProps extends HTMLAttributes<HTMLDivElement> {
  type: iconType;
  size?: keyof typeof iconSizes;
}

const Icon = ({ type, size = 'sm', ...props }: IconProps) => {
  return (
    <div
      {...props}
      style={{ width: iconSizes[size], height: iconSizes[size] }}
      dangerouslySetInnerHTML={{ __html: icons[type] }}
    />
  );
};

export default Icon;
