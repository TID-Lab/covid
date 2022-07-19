import icons from 'util/icons/iconlist.json';
import { HTMLAttributes } from 'react';
type iconType = keyof typeof icons;

const iconSizes = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 28,
};

interface IconProps extends HTMLAttributes<HTMLDivElement> {
  type: iconType;
  size?: keyof typeof iconSizes;
}

const Icon = ({ type, size = 'xs', ...props }: IconProps) => {
  return (
    <div
      style={{ width: iconSizes[size], height: iconSizes[size] }}
      dangerouslySetInnerHTML={{ __html: icons[type] }}
      {...props}
    />
  );
};

export default Icon;
