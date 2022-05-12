import { useEffect, useState } from 'react';
import { fetchOrganizations } from '../../api/org';
import { useShowPopup } from '../../hooks/popup';
import NewOrganization from '../NewOrganization';
import Organization from '../Organization';

import './index.css';

const OrganizationModal = () => {
  const [ orgs, setOrgs ] = useState([]);

  const showPopup = useShowPopup();

  useEffect(() => {
    (async () => {
      const organizations = await fetchOrganizations();
      setOrgs(organizations);
    })();
  }, []);

  function onDelete(id) {
    const i = orgs.findIndex((org) => org._id === id);
    setOrgs(
      [
        ...orgs.slice(0, i),
        ...orgs.slice(i + 1)
      ]
    );
  }

  function onCreate(org) {
    setOrgs(
      [
        ...orgs,
        org,
      ]
    )
  }

  function showCreateModal() {
    showPopup(
      <NewOrganization
        onCreate={onCreate}
      />
    );
  }

  return (
    <div className='Modal OrganizationModal'>
        <h1>Organization Settings</h1>
        <div className='Row Header'>
          <p><b>{orgs.length} Organizations</b></p>
          <button onClick={showCreateModal}>New Organization</button>
        </div>
        {orgs.map(({ _id, name, role }) => (
          <Organization
            key={_id}
            _id={_id}
            name={name}
            role={role}
            onDelete={onDelete}
          />
        ))}
    </div>
  );
};

export default OrganizationModal;