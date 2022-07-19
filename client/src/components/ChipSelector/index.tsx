import Icon from 'components/Icon';
import { ReactNode } from 'react';
import { RadioGroup } from '@headlessui/react';
import { HTMLAttributes } from 'react';
//for whatever reason tailwind is not detecting classes if i dont have the space in front of the string
const style = {
  default:
    ' border-slate-400 active:bg-blue-200 text-slate-700 hover:bg-blue-100 py-2 px-5  ',
  active:
    ' bg-blue-100 border-blue-300 text-blue-800 font-bold py-2 pl-3 pr-5 ',
};

function ChipSelector({
  options,
  active,
  header,
  onSelect,
  hideLabel = false,
  adjust = 'mr-[-1.75rem]',
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
        <div
          className={`gap-x-2 gap-y-4 flex relative flex-wrap ${adjust} font-regular`}
        >
          {Object.keys(options).map((key, index) => (
            <RadioGroup.Option key={index} value={key}>
              <RadioGroup.Label
                className={` cursor-pointer border text-sm rounded-xs flex gap-x-1 items-center  ${
                  key === active ? style.active : style.default
                }}`}
              >
                <span
                  className={`overflow-hidden inline-block  ${
                    key === active ? ' w-auto ' : ' w-0 '
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

export interface ChipSelectorProps extends HTMLAttributes<HTMLDivElement> {
  options: {
    [key: string]: string;
  };
  active: string;
  header: ReactNode;
  onSelect: any;
  adjust?: string;
  hideLabel?: boolean;
}

export default ChipSelector;
