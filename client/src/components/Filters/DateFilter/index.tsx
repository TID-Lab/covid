import { useAppDispatch, useAppSelector } from 'hooks/useTypedRedux';
import { RootState } from 'store';
import LabeledDate from 'components/LabeledDate';
import useTracker from 'hooks/useTracker';
import formatDate from 'util/formatDate';
import { DATE_PRESETS, DATE_PRESET_TYPE } from 'util/filterData';
import Icon from 'components/Icon';
import { Listbox, RadioGroup } from '@headlessui/react';
import Chip, { ChipStyle } from 'components/Chip';
interface DateFilterProps {
  selector: (state: RootState) => any;
}

//for whatever reason tailwind is not detecting classes if i dont have the space in front of the string
const style = {
  default: ' border-slate-400 active:bg-blue-200 hover:bg-blue-100 py-2 px-5  ',
  active:
    ' bg-blue-100 border-blue-300 text-blue-800 font-bold py-2 pl-2 pr-5 ',
};

interface dateType {
  preset: DATE_PRESET_TYPE;
  from: string;
  to: string;
}
// number of visisble options vs hidden away inside the dropdown
const showNumber = 2;

//array of keys of dates
const presetArray = Object.keys(DATE_PRESETS);

const DateFilter = ({ selector }: DateFilterProps) => {
  const dispatch = useAppDispatch();
  const selected: dateType = useAppSelector(selector);
  const { trackEvent } = useTracker();

  function onFromChanged(date: string) {
    dispatch({
      type: 'dates/set',
      payload: { ...selected, preset: 'custom', from: date },
    });
    trackEvent({ category: 'Filter', action: 'Set From Date', name: date });
  }
  function onToChanged(date: string) {
    dispatch({
      type: 'dates/set',
      payload: { ...selected, preset: 'custom', to: date },
    });
    trackEvent({ category: 'Filter', action: 'Set To Date', name: date });
  }

  function setPreset(preset: DATE_PRESET_TYPE) {
    const today = new Date();
    let startDate = new Date();
    switch (preset) {
      //we need to refactor this later LOL
      case 'today':
        startDate.setDate(today.getDate() - 1);
        break;

      case '7days':
        startDate.setDate(today.getDate() - 7);
        break;
      case 'month':
        startDate = new Date(today.getFullYear(), today.getMonth(), 1);
        break;
      case '30days':
        startDate.setDate(today.getDate() - 30);
        break;
      case '60days':
        startDate.setDate(today.getDate() - 60);
        break;
      case 'year':
        startDate = new Date(today.getFullYear(), 0, 1);
        break;
      // Really stupid method to just set this 20 years in the past, I don't have time to figure out a better way rn, but this should work
      case 'all':
        startDate.setDate(today.getDate() - 7200);
    }
    dispatch({
      type: 'dates/set',
      payload: {
        preset: preset,
        from: formatDate(startDate),
        to: formatDate(today),
      },
    });
    trackEvent({
      category: 'Filter',
      action: 'Set Date preset ',
      name: preset,
    });
  }

  return (
    <div className="pl-4 pr-8 mr-[-2rem] font-regular">
      <RadioGroup value={selected.preset} onChange={setPreset}>
        <RadioGroup.Label
          className={`inline-block text-sm font-bold mb-3 mt-3 text-slate-700`}
        >
          Date Range
        </RadioGroup.Label>
        <div
          className={`gap-x-2 gap-y-4 flex relative flex-wrap mr-[-3rem] font-regular`}
        >
          {presetArray.slice(0, showNumber).map((key, index) => (
            <RadioGroup.Option key={index} value={key}>
              <RadioGroup.Label>
                <Chip active={key === selected.preset}>
                  {DATE_PRESETS[key as DATE_PRESET_TYPE]}
                </Chip>
              </RadioGroup.Label>
            </RadioGroup.Option>
          ))}
          <Listbox value={selected.preset} onChange={setPreset}>
            <div className="relative">
              <Listbox.Button
                className={`${ChipStyle.common} ${
                  presetArray
                    .slice(-(presetArray.length - showNumber))
                    .find((i) => i === selected.preset)
                    ? ChipStyle.active
                    : ChipStyle.default
                }`}
              >
                <span
                  className={`overflow-hidden inline-block  ${
                    presetArray
                      .slice(-(presetArray.length - showNumber))
                      .find((i) => i === selected.preset)
                      ? ' w-auto '
                      : '  w-0 '
                  }`}
                >
                  <Icon type="check" size="sm" />
                </span>
                {presetArray
                  .slice(0, showNumber)
                  .find((i) => i === selected.preset)
                  ? 'more'
                  : DATE_PRESETS[selected.preset]}
                <Icon
                  type="chevron-down"
                  size="sm"
                  className={'mr-[-0.25rem]'}
                />
              </Listbox.Button>
              <Listbox.Options className="absolute font-normal mt-1 max-h-60 right-0 w-max overflow-auto z-50 bg-slate-50 rounded-xs py-1 text-base shadow-lg border border-slate-400 focus:outline-none sm:text-sm">
                {presetArray
                  .slice(-(presetArray.length - showNumber))
                  .map((key, index) => (
                    <Listbox.Option
                      key={index}
                      className={`cursor-pointer  text-sm py-2 pl-2 pr-4 hover:bg-blue-100
                 m-0 flex gap-x-1 items-center ${
                   selected.preset === key ? 'font-bold' : ''
                 }`}
                      value={key}
                    >
                      {' '}
                      <span
                        className={`overflow-hidden inline-block w-[20px] `}
                      >
                        {selected.preset === key && (
                          <Icon type="check" size="sm" />
                        )}
                      </span>
                      {DATE_PRESETS[key as DATE_PRESET_TYPE]}
                    </Listbox.Option>
                  ))}
              </Listbox.Options>
            </div>
          </Listbox>
        </div>
      </RadioGroup>

      <div className="flex gap-2 ">
        <LabeledDate
          label="From"
          date={selected.from}
          onDateChanged={onFromChanged}
        />
        <LabeledDate
          label="To"
          date={selected.to}
          onDateChanged={onToChanged}
        />
      </div>
    </div>
  );
};

export default DateFilter;
