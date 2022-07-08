import icons from 'util/icons/iconlist.json';

type iconType = keyof typeof icons;

interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
  type: iconType;
}

const Icon = ({ type, ...props }: IconProps) => {
  return (
    <div dangerouslySetInnerHTML={{ __html: icons[type] }} {...props}></div>
  );
};

export default Icon;
