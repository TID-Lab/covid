import { ReactNode } from 'react';
import c from './index.module.css';

//for whatever reason tailwind is not detecting classes if i dont have the space in front of the string
const style = {
  default: ' border-slate-500 active:bg-slate-200 hover:bg-slate-100',
  active: ' bg-slate-200 border-slate-300 ',
};

function ChipSelector({
  options,
  active,
  header,
  onSelect,
}: ChipSelectorProps) {
  return (
    <form className="focus:outline ">
      <legend>{header}</legend>
      <div className="gap-x-2 gap-y-3 flex relative flex-wrap ">
        {Object.keys(options).map((id) => (
          <div key={id}>
            <input
              type="radio"
              className={`${c.radio}`}
              id={id}
              value={id}
              checked={id === active}
              onChange={onSelect}
            />
            <label
              className={`cursor-pointer border text-xs py-2 px-4 rounded-lg outline-gray-500 focus:outline focus: outline-2 outline-offset-1  ${
                id === active ? style.active : style.default
              }}`}
              htmlFor={id}
            >
              {options[id]}
            </label>
          </div>
        ))}
      </div>
    </form>
  );
}

interface ChipSelectorProps {
  options: {
    [key: string]: string;
  };
  active: string;
  header: ReactNode;
  onSelect: any;
}

export default ChipSelector;
