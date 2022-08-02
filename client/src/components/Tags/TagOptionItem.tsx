import { useAppDispatch, useAppSelector } from 'hooks/useTypedRedux';

import useTracker, { MatomoEvent } from 'hooks/useTracker';
import ChipSelector from 'components/ChipSelector';
import { RootState } from 'store';

interface TagOptionItemProps {
  selector: (state: RootState) => any;
  header: string;
  items: {
    [key: string]: string;
  };
  dispatchType: string;
  track: MatomoEvent;
}

const TagOptionItem = ({
  selector,
  items,
  header,
  dispatchType,
  track,
}: TagOptionItemProps) => {
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
        className={' pl-4 pr-2'}
        id={header.replace('', '_')}
      />
    </>
  );
};

export default TagOptionItem;
