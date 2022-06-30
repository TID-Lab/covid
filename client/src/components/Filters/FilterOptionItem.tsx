import { useAppDispatch, useAppSelector } from 'hooks/useTypedRedux';

import useTracker, { MatomoEvent } from 'hooks/useTracker';
import ChipSelector from 'components/ChipSelector';
import { RootState } from 'store';

interface FilterOptionItemProps {
  selector: (state: RootState) => any;
  header: string;
  items: {
    [key: string]: string;
  };
  dispatchType: string;
  track: MatomoEvent;
}
const FilterOptionItem = ({
  selector,
  items,
  header,
  dispatchType,
  track,
}: FilterOptionItemProps) => {
  const dispatch = useAppDispatch();
  const selected = useAppSelector(selector);

  const { trackEvent } = useTracker();

  function onRadioClick(id: string) {
    dispatch({ type: dispatchType, payload: id });
    trackEvent({ ...track, name: id });
  }

  return (
    <>
      <ChipSelector
        options={items}
        header={header}
        active={selected}
        onSelect={onRadioClick}
        id={header.replace('', '_')}
      />
      <p>{selected}</p>
    </>
  );
};

export default FilterOptionItem;
