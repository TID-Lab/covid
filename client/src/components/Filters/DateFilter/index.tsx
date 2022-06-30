import { useAppDispatch, useAppSelector } from 'hooks/useTypedRedux';
import { RootState } from 'store';
import LabeledDate from 'components/LabeledDate';
import useTracker from 'hooks/useTracker';
interface DateFilterProps {
  selector: (state: RootState) => any;
}

interface dateType {
  from: string;
  to: string;
}
const DateFilter = ({ selector }: DateFilterProps) => {
  const dispatch = useAppDispatch();
  const selected: dateType = useAppSelector(selector);
  const { trackEvent } = useTracker();

  function onFromChanged(date: string) {
    dispatch({ type: 'dates/fromSet', payload: date });
    trackEvent({ category: 'Filter', action: 'Set From Date', name: date });
  }

  function onToChanged(date: string) {
    dispatch({ type: 'dates/toSet', payload: date });
    trackEvent({ category: 'Filter', action: 'Set To Date', name: date });
  }

  return (
    <form className="pl-4 pr-8 ">
      <h2 className="text-sm font-bold mt-4 mb-2 text-slate-700">Date Range</h2>
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
