import CuratedToggle from '../CuratedToggle';
import AccountTypes from '../AccountTypes';
import AccountLocation from '../AccountLocation';
import AccountCategories from '../AccountCategories';

import './index.css';

const AccountFilter = (props) => {
  const { accounts } = props;
  const { curatedOnly, institutions, location, categories } = accounts;
  return (
    <div className='Filter'>
      <h3>Account Filters</h3>
      <CuratedToggle curatedOnly={curatedOnly} />
      <AccountTypes institutions={institutions} />
      <AccountLocation location={location} />
      <AccountCategories categories={categories} />
    </div>
  );
}
export default AccountFilter;