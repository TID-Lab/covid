// @ts-nocheck
import { useAppDispatch, useAppSelector } from 'hooks/useTypedRedux';
import { Listbox } from '@headlessui/react';
import Icon from 'components/Icon';
const SORT_BY = {
  engagementNormed: 'Most engagement (scaled)',
  engagementRaw: 'Most engagement (not scaled)',
  recent: 'Most recent',
};

const SortSelect = () => {
  const selected = useAppSelector((state) => state.filters.sortBy);
  const dispatch = useAppDispatch();

  function setSelected(selectItem) {
    dispatch({ type: 'sortBy/set', payload: selectItem });
  }

  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative z-50">
        <Listbox.Button className="relative w-full py-2 pl-3 text-sm font-medium text-left border cursor-pointer rounded-xs bg-slate-50 border-slate-300 pr-7 focus:outline-none focus-visible:border-blue-300 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 ">
          <span className="text-slate-600">Sort By:</span>
          <span className="truncate"> {SORT_BY[selected]}</span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <Icon type="chevron-down" size="sm" />
          </span>
        </Listbox.Button>

        <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-sm border shadow-lg max-h-60 rounded-xs bg-slate-50 border-slate-400 ring-opacity-5 focus:outline-none">
          {Object.keys(SORT_BY).map((item, index) => (
            <Listbox.Option
              key={index}
              className={({ active }) =>
                `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                  active ? 'bg-blue-100 text-blue-800' : 'text-gray-900'
                }`
              }
              value={item}
            >
              <span
                className={`block truncate ${
                  selected === item ? 'font-medium' : 'font-normal'
                }`}
              >
                {SORT_BY[item]}
              </span>
              {selected === item ? (
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                  <Icon type="check" size="sm" />
                </span>
              ) : null}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  );
};

export default SortSelect;
