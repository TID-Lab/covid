import { useAppDispatch, useAppSelector } from 'hooks/useTypedRedux';
import { RootState } from 'store';
import LabeledDate from 'components/LabeledDate';
import useTracker from 'hooks/useTracker';
import formatDate from 'util/formatDate';
import { DATE_PRESETS, DATE_PRESET_TYPE } from 'util/filterData';
import Icon from 'components/Icon';
import { Listbox } from '@headlessui/react';

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
    <form className="pl-4 pr-8 mr-[-3rem] font-regular">
      <h2
        id="presetDates "
        className="text-sm font-bold mt-3 mb-3 text-slate-700"
      >
        Date Range
      </h2>
      <div
        className="flex flex-wrap gap-x-2 gap-y-4 "
        role="radiogroup"
        aria-labelledby="presetDates"
      >
        {presetArray.slice(0, showNumber).map((key, index) => (
          <div
            key={index}
            role="radio"
            className={`cursor-pointer border text-sm rounded-xs flex gap-x-1 items-center ${
              selected.preset === key ? style.active : style.default
            }`}
            aria-checked={selected.preset === key}
            onClick={() => setPreset(key as DATE_PRESET_TYPE)}
            tabIndex={selected.preset === key ? 0 : -1}
          >
            {' '}
            <span
              className={`overflow-hidden inline-block  ${
                key === selected.preset ? ' w-auto ' : '  w-0 '
              }`}
            >
              <Icon type="check-sm" />
            </span>
            {DATE_PRESETS[key as DATE_PRESET_TYPE]}
          </div>
        ))}
        <Listbox value={selected.preset} onChange={setPreset}>
          <div className="relative">
            <Listbox.Button
              className={`cursor-pointer border text-sm font-medium rounded-xs flex gap-x-1 items-center ${
                presetArray
                  .slice(-(presetArray.length - showNumber))
                  .find((i) => i === selected.preset)
                  ? style.active
                  : style.default
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
                <Icon type="check-sm" />
              </span>
              {presetArray
                .slice(0, showNumber)
                .find((i) => i === selected.preset)
                ? 'more'
                : DATE_PRESETS[selected.preset]}
              <Icon type="chevron-down-sm" className={'mr-[-0.25rem]'} />
            </Listbox.Button>
            <Listbox.Options className="absolute font-normal mt-1 max-h-60 right-0 w-max overflow-auto z-50 bg-white rounded-xs py-1 text-base shadow-lg border border-blue-300 focus:outline-none sm:text-sm">
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
                    <span className={`overflow-hidden inline-block w-[20px] `}>
                      {selected.preset === key && <Icon type="check-sm" />}
                    </span>
                    {DATE_PRESETS[key as DATE_PRESET_TYPE]}
                  </Listbox.Option>
                ))}
            </Listbox.Options>
          </div>
        </Listbox>
      </div>
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
    </form>
  );
};

export default DateFilter;
