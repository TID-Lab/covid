import { ReactNode } from 'react';
import { RadioGroup } from '@headlessui/react';
import { HTMLAttributes } from 'react';
import Chip from 'components/Chip';

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
              <RadioGroup.Label>
                <Chip active={key === active}>{options[key]}</Chip>
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
