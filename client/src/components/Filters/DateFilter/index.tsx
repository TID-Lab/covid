import { useAppDispatch, useAppSelector } from 'hooks/useTypedRedux';
import { RootState } from 'store';
import LabeledDate from 'components/LabeledDate';
import useTracker from 'hooks/useTracker';
import formatDate from 'util/formatDate';
import { DATE_PRESETS, DATE_PRESET_TYPE } from 'util/filterData';
import Icon from 'components/Icon';
interface DateFilterProps {
  selector: (state: RootState) => any;
}

//for whatever reason tailwind is not detecting classes if i dont have the space in front of the string
const style = {
  default:
    ' border-slate-500 active:bg-slate-200 hover:bg-slate-100 py-2 px-4  ',
  active: ' bg-slate-200 border-slate-300 font-bold py-1 pl-2 pr-4 ',
};

interface dateType {
  preset: DATE_PRESET_TYPE;
  from: string;
  to: string;
}
const showNumber = 2;
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
    <form className="pl-4 pr-8 ">
      <h2
        id="presetDates "
        className="text-sm font-bold mt-4 mb-2 text-slate-700"
      >
        Date Range
      </h2>
      <div
        className="flex flex-wrap gap-x-2 gap-y-3"
        role="radiogroup"
        aria-labelledby="presetDates"
      >
        {presetArray.slice(0, showNumber).map((key, index) => (
          <div
            key={index}
            role="radio"
            className={`cursor-pointer border text-xs rounded-lg flex gap-x-1 items-center ${
              selected.preset === key ? style.active : style.default
            }`}
            aria-checked={selected.preset === key}
            onClick={() => setPreset(key as DATE_PRESET_TYPE)}
            tabIndex={selected.preset === key ? 0 : -1}
          >
            {' '}
            <span
              className={`overflow-hidden inline-block  ${
                key === selected.preset ? ' w-auto text-slate-600' : '  w-0 '
              }`}
            >
              <Icon type="check-sm" />
            </span>
            {DATE_PRESETS[key as DATE_PRESET_TYPE]}
          </div>
        ))}
        <button
          className={`cursor-pointer border text-xs rounded-lg flex gap-x-1 items-center ${
            selected.preset === 'custom' ? style.active : style.default
          }`}
        >
          more
          <Icon type="chevron-down-sm" />
        </button>
        <ul
          className="  dropdown-menu min-w-max absolute hidden bg-white z-50 float-left py-2 list-none   text-left rounded-lg shadow-lg
          mt-1 hidden m-0 bg-clip-padding border-none"
        >
          {presetArray
            .slice(-(presetArray.length - showNumber))
            .map((key, index) => (
              <li
                key={index}
                role="radio"
                className={`cursor-pointer border text-xs rounded-lg flex gap-x-1 items-center ${
                  selected.preset === key ? style.active : style.default
                }`}
                aria-checked={selected.preset === key}
                onClick={() => setPreset(key as DATE_PRESET_TYPE)}
                tabIndex={selected.preset === key ? 0 : -1}
              >
                {' '}
                <span
                  className={`overflow-hidden inline-block  ${
                    key === selected.preset
                      ? ' w-auto text-slate-600'
                      : '  w-0 '
                  }`}
                >
                  <Icon type="check-sm" />
                </span>
                {DATE_PRESETS[key as DATE_PRESET_TYPE]}
              </li>
            ))}
        </ul>
      </div>
      <div className="flex gap-2 mr-4">
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
