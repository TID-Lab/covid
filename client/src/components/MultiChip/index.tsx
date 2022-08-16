import Icon from 'components/Icon';
import { ReactNode, useEffect } from 'react';
import { RadioGroup } from '@headlessui/react';
import { useAppDispatch } from 'hooks/useTypedRedux';

//colors for customtags
const COLORS = {
  red: 'bg-rose-100 border-rose-300',
  green: 'bg-emerald-100 border-emerald-300',
  purple: 'bg-violet-100 border-violet-300',
  blue: 'bg-blue-100 border-blue-300',
  pink: 'bg-pink-100 border-pink-300',
};
//colors for customtags
const ACTIVE_COLORS = {
  red: 'bg-red-600 text-white border-red-600',
  green: 'bg-emerald-600 text-white border-emerald-600',
  purple: 'bg-violet-600 text-white border-violet-600',
  blue: 'bg-blue-400 text-white border-blue-400',
  pink: ' bg-pink-600 text-white border-pink-600',
};

// //for whatever reason tailwind is not detecting classes if i dont have the space in front of the string
// const style = {
//   default:
//     ' border-slate-500 active:bg-slate-200 hover:bg-slate-100 py-2 px-4  ',
//   active: ' bg-slate-200 border-slate-300 font-bold py-2 pl-2 pr-4 ',
// };

function MultiChip({
  options,
  active,
  header,
  setActive,
  dispatchType,
  hideLabel = false,
  id,
  ...props
}: MultiChipProps) {
  // useEffect(() => console.log(active), [active]);
  function onClick(key: string) {
    console.log('Active', active, key);
    if (active.find((i) => i === key) !== undefined) {
      //refactor to be generic later
      const newActiveTags = active.filter((i) => i !== key);
      setActive(newActiveTags);
    } else {
      setActive([...active, key]);
    }
  }

  return (
    <div
      {...props}
      className="flex flex-wrap text-sm font-medium gap-x-4 gap-y-6"
    >
      {options &&
        options.map((item, index) => (
          <div
            key={index}
            onClick={() => onClick(item._id)}
            className={`px-3 py-1 rounded-xs border flex gap-1 items-center cursor-pointer ${
              active.find((i) => i === item._id) !== undefined
                ? ACTIVE_COLORS[item.color as keyof typeof COLORS]
                : COLORS[item.color as keyof typeof COLORS]
            }`}
          >
            {active.find((i) => i === item._id) !== undefined && (
              <Icon type="check" size="xs" />
            )}
            {item.name}
          </div>
        ))}
    </div>
  );
}

interface MultiChipProps {
  options: any[];
  dispatchType?: string;
  active: string[];
  setActive: any;
  header?: ReactNode;
  deleteSelection?: string[];
  className?: string;
  hideLabel?: boolean;
  isDelete?: boolean;
  id?: string;
}

export default MultiChip;
