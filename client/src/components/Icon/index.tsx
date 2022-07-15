import icons from 'util/icons/iconlist.json';

type iconType = keyof typeof icons;

interface IconProps {
  type: iconType;
}

const Icon = ({ type }: IconProps) => {
  return <div dangerouslySetInnerHTML={{ __html: icons[type] }} />;
};

export default Icon;
