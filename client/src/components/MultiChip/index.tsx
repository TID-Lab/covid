import Icon from 'components/Icon';
import { ReactNode, useEffect } from 'react';
import { RadioGroup } from '@headlessui/react';
import { useAppDispatch } from 'hooks/useTypedRedux';

//for whatever reason tailwind is not detecting classes if i dont have the space in front of the string
const style = {
  default:
    ' border-slate-500 active:bg-slate-200 hover:bg-slate-100 py-2 px-4  ',
  active: ' bg-slate-200 border-slate-300 font-bold py-2 pl-2 pr-4 ',
};

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

  useEffect(() => console.log(active), [active]);
  function onClick(key: string) {
    if (active.find((i) => i === key)) {
      const newActiveTags = active.filter((i) => i !== key);
      console.log(active.filter((i) => i !== key));
      dispatch({ type: 'activetags/set', payload: newActiveTags });
    } else {
      dispatch({ type: 'activetags/set', payload: [...active, key] });
    }
  }
  return (
    <div {...props}>
      {options &&
        Object.keys(options).map((key, index) => (
          <div
            key={index}
            onClick={() => onClick(key)}
            className={`px-4 py-2 rounded-xs ${
              active.find((i) => i === key) ? 'bg-blue-100' : 'bg-slate-100'
            }`}
          >
            {options[key].name}
          </div>
        ))}
      <div></div>
    </div>
  );
}

interface MultiChipProps {
  options: {
    [key: string]: any;
  };
  dispatchType?: string;
  active: string[];
  header?: ReactNode;
  onSelect?: any;
  className?: string;
  hideLabel?: boolean;
  id?: string;
}

export default MultiChip;
