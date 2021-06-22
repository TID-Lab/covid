import { useEffect, useState } from 'react';
import { fetchOrganizations } from '../../api/org';
import NewOrganizationForm from '../NewOrganizationForm';
import Organization from '../Organization';

import './index.css';

const OrganizationModal = () => {
  const [ newOrgMode, setNewOrgMode ] = useState(false);
  const [ orgs, setOrgs ] = useState([]);

  useEffect(() => {
    (async () => {
      const organizations = await fetchOrganizations();
      setOrgs(organizations);
    })();
  }, []);

  function openNewOrgForm() {
    setNewOrgMode(true);
  }

  function onDelete(id) {
    const i = orgs.findIndex((org) => org._id === id);
    setOrgs(
      [
        ...orgs.slice(0, i),
        ...orgs.slice(i + 1)
      ]
    );
  }

  function onSubmit(org) {
    setOrgs(
      [
        ...orgs,
        org,
      ]
    )
    setNewOrgMode(false);
  }

  const newOrgForm = (
    <NewOrganizationForm
      onSubmit={onSubmit}
    />
  );

  const orgComponents = orgs.map(({ _id, name, role }) => (
    <Organization
      key={_id}
      _id={_id}
      name={name}
      role={role}
      onDelete={onDelete}
    />
  ));

  return (
    <div className='Modal OrganizationModal'>
        <h1>Organization Settings</h1>
        <div className='Row Header'>
          <p><b>{orgs.length} Organizations</b></p>
          <button onClick={openNewOrgForm}>New Organization</button>
        </div>
        {newOrgMode ? newOrgForm : orgComponents }
    </div>
  );
};

export default OrganizationModal;