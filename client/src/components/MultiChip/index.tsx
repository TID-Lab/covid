import Icon from 'components/Icon';
import { ReactNode, useEffect } from 'react';
import { RadioGroup } from '@headlessui/react';
import { useAppDispatch } from 'hooks/useTypedRedux';

//colors for customtags
const COLORS = {
  red: 'bg-red-200 border-red-300',
  green: 'bg-emerald-200 border-emerald-300',
  purple: 'bg-violet-200 border-violet-300',
  blue: 'bg-blue-200 border-blue-300',
  pink: 'bg-pink-200 border-pink-300',
};
//colors for customtags
const ACTIVE_COLORS = {
  red: 'bg-red-400 text-white',
  green: 'bg-emerald-400 text-white',
  purple: 'bg-violet-400 text-white',
  blue: 'bg-blue-400 text-white',
  pink: ' bg-pink-400 text-white',
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
  onSelect,
  dispatchType,
  hideLabel = false,
  id,
  ...props
}: MultiChipProps) {
  const dispatch = useAppDispatch();

  // useEffect(() => console.log(active), [active]);
  function onClick(key: string) {
    console.log('Active', active, key);
    if (active.find((i) => i === +key) !== undefined) {
      //refactor to be generic later
      const newActiveTags = active.filter((i) => i !== +key);
      dispatch({ type: 'activetags/set', payload: newActiveTags });
    } else {
      dispatch({ type: 'activetags/set', payload: [...active, +key] });
    }
  }

  return (
    <div
      {...props}
      className="flex flex-wrap text-sm font-medium gap-x-2 gap-y-3"
    >
      {options &&
        Object.keys(options).map((key, index) => (
          <div
            key={index}
            onClick={() => onClick(key)}
            className={`px-3 py-1 rounded border cursor-pointer ${
              active.find((i) => i === +key) !== undefined
                ? ACTIVE_COLORS[options[key].color as keyof typeof COLORS]
                : COLORS[options[key].color as keyof typeof COLORS]
            }`}
          >
            {options[key].name}
          </div>
        ))}
    </div>
  );
}

interface MultiChipProps {
  options: {
    [key: string]: any;
  };
  dispatchType?: string;
  active: number[];
  header?: ReactNode;
  onSelect?: any;
  className?: string;
  hideLabel?: boolean;
  id?: string;
}

export default MultiChip;
