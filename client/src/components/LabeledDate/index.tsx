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
    <form className={`flex flex-col text-sm`}>
      <label
        className="font-bold mt-2 mb-1 text-slate-500 "
        htmlFor={label.replace(' ', '_')}
      >
        {label}{' '}
      </label>

      <input
        className="border py-2 px-1 font-bold rounded-xs bg-slate-100 border-slate-300 cursor-pointer"
        id={label.replace(' ', '_')}
        type="date"
        value={date}
        onChange={onChange}
      />
    </form>
  );
};

export default LabeledDate;
