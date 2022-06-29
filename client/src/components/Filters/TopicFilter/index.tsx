import { useAppDispatch, useAppSelector } from 'hooks/useTypedRedux';

import c from './index.module.css';

import Radio from 'components/Radio';
import useTracker from 'hooks/useTracker';
import ChipSelector from 'components/ChipSelector';
import { COVID_TOPICS } from 'util/filterData';

const TopicFilter = (props: any) => {
  const { topic } = props;
  const dispatch = useAppDispatch();
  const selected = useAppSelector((state) => state.filters.topic);

  const { trackEvent } = useTracker();

  function onRadioClick(id: string) {
    dispatch({ type: 'topic/set', payload: id });
    trackEvent({ category: 'Filter', action: 'Set Topic', name: id });
  }

  return (
    <div className="Filter Topics">
      <ChipSelector
        options={COVID_TOPICS}
        header="COVID_19 Topics"
        active={selected}
        onSelect={onRadioClick}
        id="filterTopics"
      />
      {/* <h3>COVID-19 Topics</h3>
      {Object.keys(COVID_TOPICS).map((id) => (
        <Radio
          key={id}
          id={id}
          name={COVID_TOPICS[id]}
          selected={topic}
          onClick={onRadioClick}
        />
      ))} */}

      {/* <Link to='/settings/topics'>
        <span>Edit Topics</span>
      </Link> */}
    </div>
  );
};

export default TopicFilter;
