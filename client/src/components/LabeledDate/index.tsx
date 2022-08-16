import { ChangeEvent } from 'react';

interface LabeledDateProps {
  date: string | number | readonly string[] | undefined;
  onDateChanged: (value: any) => any;
  label: string;
}

const LabeledDate = ({ date, onDateChanged, label }: LabeledDateProps) => {
  function onChange(e: ChangeEvent<HTMLInputElement>) {
    if (onDateChanged) onDateChanged(e.currentTarget.value);
  }

  return (
    <div className={`flex flex-col text-sm`}>
      <label
        className="mt-2 font-bold text-slate-500 "
        htmlFor={label.replace(' ', '_')}
      >
        {label}
      </label>

      <input
        className="input px-1 py-2 border cursor-pointer rounded-xs font-regular bg-slate-50 border-slate-200 focus:bg-blue-100 focus:border-blue-300"
        id={label.replace(' ', '_')}
        type="date"
        value={date}
        onChange={onChange}
      />
    </div>
  );
};

export default LabeledDate;
