import { useAppDispatch, useAppSelector } from 'hooks/useTypedRedux';

import useTracker, { MatomoEvent } from 'hooks/useTracker';
import ChipSelector, { ChipSelectorProps } from 'components/ChipSelector';
import { RootState } from 'store';

export interface FilterOptionItemProps extends ChipSelectorProps {
  selector: (state: RootState) => any;

  dispatchType: string;
  track: MatomoEvent;
}

const FilterOptionItem = ({
  selector,

  dispatchType,
  track,
  ...props
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
        className={' pl-4 pr-2'}
        {...props}
        onSelect={onRadioClick}
        active={selected}
      />
    </>
  );
};

export default FilterOptionItem;
