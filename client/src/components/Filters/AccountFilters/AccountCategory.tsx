// @ts-nocheck
import { useAppDispatch } from 'hooks/useTypedRedux';

import Radio from 'components/Radio';

import c from './index.module.css';
import useTracker from 'hooks/useTracker';

const CATEGORIES = {
  all: 'All',
  government: 'Government',
  media: 'Media',
  faith: 'Faith',
  health: 'Health',
  diabetes: 'Diabetes',
  misinfo: 'Known Misinfo Spreaders',
  partners: 'Project Partners',
  trusted: 'Trusted Resources',
};

const AccountCategories = (props) => {
  const { categories: category } = props;
  const dispatch = useAppDispatch();
  const { trackEvent } = useTracker();

  function onRadioClick(id) {
    dispatch({ type: 'accounts/categories/set', payload: id });
    trackEvent({
      category: 'Filter',
      action: 'Set Account Category',
      name: id,
    });
  }

  return (
    <div className={c.AccountFilter}>
      <h4>Account categories</h4>
      {Object.keys(CATEGORIES).map((id) => (
        <Radio
          key={id}
          id={id}
          name={CATEGORIES[id]}
          selected={category}
          onClick={onRadioClick}
        />
      ))}
    </div>
  );
};

export default AccountCategories;
