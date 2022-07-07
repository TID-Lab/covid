import Icon from 'components/Icon';
import { Fragment, ReactNode } from 'react';
import c from './index.module.css';

//for whatever reason tailwind is not detecting classes if i dont have the space in front of the string
const style = {
  default:
    ' border-slate-500 active:bg-slate-200 hover:bg-slate-100 py-2 px-4  ',
  active: ' bg-slate-200 border-slate-300 font-bold py-2 pl-2 pr-4 ',
};

function ChipSelector({
  options,
  active,
  header,
  onSelect,
  hideLabel = false,
  id,
  ...props
}: ChipSelectorProps) {
  return (
    <form {...props}>
      <h2
        className={`text-sm font-bold mb-3 mt-3 text-slate-700 ${
          hideLabel ? ' overflow-hidden w-0 h-0 ' : ''
        }`}
      >
        {header}
      </h2>
      <div className="gap-x-2 gap-y-3 flex relative flex-wrap ">
        {Object.keys(options).map((key, index) => (
          <Fragment key={key}>
            <input
              type="radio"
              className={`${c.radio}`}
              id={`${id}:${index}`}
              value={key}
              checked={key === active}
              onChange={(e) => onSelect(e.target.value)}
            />
            <label
              className={` cursor-pointer border text-xs rounded-lg flex gap-x-1 items-center  ${
                key === active ? style.active : style.default
              }}`}
              htmlFor={`${id}:${index}`}
            >
              <span
                className={`overflow-hidden inline-block  ${
                  key === active ? ' w-auto text-slate-600' : '  w-0 '
                }`}
              >
                <Icon type="check-sm" />
              </span>
              {options[key]}
            </label>
          </Fragment>
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
  className?: string;
  hideLabel?: boolean;
  id: string;
}

export default ChipSelector;
