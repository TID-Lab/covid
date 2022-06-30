// @ts-nocheck
// import CuratedToggle from '../CuratedToggle';
import AccountTypes from './AccountType';
import AccountLocation from './AccountLocation';
import AccountIdentity from './AccountIdentity';
import AccountCategories from './AccountCategory';

import c from './index.module.css';

const AccountFilter = (props) => {
  const { accounts } = props;
  const { institutions, location, identities, categories } = accounts; //curatedOnly,
  return (
    <div className="Filter">
      <h3>Account Filters</h3>
      {/* <CuratedToggle curatedOnly={curatedOnly} /> */}
      <AccountTypes institutions={institutions} />
      <AccountLocation location={location} />
      <AccountIdentity identities={identities} />
      <AccountCategories categories={categories} />
    </div>
  );
};
export default AccountFilter;
