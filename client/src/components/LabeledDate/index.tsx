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
    <form className={`flex flex-col text-xs`}>
      <label
        className="font-bold mt-2 text-slate-500 "
        htmlFor={label.replace(' ', '_')}
      >
        {label}
      </label>

      <input
        className="border py-2 px-1 rounded-xs font-medium bg-slate-50 border-slate-200 cursor-pointer focus:bg-blue-100 focus:border-blue-300"
        id={label.replace(' ', '_')}
        type="date"
        value={date}
        onChange={onChange}
      />
    </form>
  );
};

export default LabeledDate;
