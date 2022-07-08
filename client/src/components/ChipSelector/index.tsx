import Icon from 'components/Icon';
import { ReactNode } from 'react';
import { RadioGroup } from '@headlessui/react';

//for whatever reason tailwind is not detecting classes if i dont have the space in front of the string
const style = {
  default:
    ' border-slate-400 active:bg-slate-200 text-slate-700 hover:bg-slate-100 py-2 px-5  ',
  active: ' bg-slate-200 border-slate-300 font-bold py-2 pl-3 pr-5 ',
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
    <div {...props}>
      <RadioGroup value={active} onChange={onSelect}>
        <RadioGroup.Label
          className={`inline-block text-sm font-bold mb-3 mt-3 text-slate-700 ${
            hideLabel ? ' overflow-hidden w-0 h-0 ' : ''
          }`}
        >
          {header}
        </RadioGroup.Label>
        <div className="gap-x-2 gap-y-4 flex relative flex-wrap mr-[-2rem]">
          {Object.keys(options).map((key, index) => (
            <RadioGroup.Option key={index} value={key}>
              <RadioGroup.Label
                className={` cursor-pointer border text-sm rounded-xs flex gap-x-1 items-center  ${
                  key === active ? style.active : style.default
                }}`}
              >
                <span
                  className={`overflow-hidden inline-block  ${
                    key === active ? ' w-auto text-slate-600' : ' w-0 '
                  }`}
                >
                  <Icon type="check-sm" />
                </span>
                {options[key]}
              </RadioGroup.Label>
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
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
