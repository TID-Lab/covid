// @ts-nocheck
import { useDispatch } from 'react-redux';
import Radio from 'components/Radio';
import c from './index.module.css';
import useTracker from 'hooks/useTracker';
import { ACC_CATEGORIES } from 'util/filterData';

const AccountCategories = (props) => {
  const { categories: category } = props;
  const dispatch = useDispatch();
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
      {Object.keys(ACC_CATEGORIES).map((id) => (
        <Radio
          key={id}
          id={id}
          name={ACC_CATEGORIES[id]}
          selected={category}
          onClick={onRadioClick}
        />
      ))}
    </div>
  );
};

export default AccountCategories;
