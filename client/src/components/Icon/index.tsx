import icons from 'util/icons/iconlist.json';
import { HTMLAttributes } from 'react';
type iconType = keyof typeof icons;

interface IconProps extends HTMLAttributes<HTMLDivElement> {
  type: iconType;
}

const Icon = ({ type, ...props }: IconProps) => {
  return <div dangerouslySetInnerHTML={{ __html: icons[type] }} {...props} />;
};

export default Icon;
