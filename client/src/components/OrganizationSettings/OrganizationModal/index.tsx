// @ts-nocheck
import { useEffect, useState } from 'react';
import { fetchOrganizations } from 'api/org';
import PopupModal from 'components/PopupModal';
import NewOrganization from '../NewOrganization';
import Organization from '../Organization';

import c from './index.module.css';

const OrganizationModal = () => {
  const [orgs, setOrgs] = useState([]);
  const [isNewOrganizationPopupOpen, setNewOrganizationPopupOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const organizations = await fetchOrganizations();
      setOrgs(organizations);
    })();
  }, []);

  function onDelete(id) {
    const i = orgs.findIndex((org) => org._id === id);
    setOrgs([...orgs.slice(0, i), ...orgs.slice(i + 1)]);
  }

  function onCreate(org) {
    setOrgs([...orgs, org]);
    setNewOrganizationPopupOpen(false);
  }

  return (
    <div className={`Modal ${c.OrganizationModal}`}>
      <h1>Organization Settings</h1>
      <div className={`Row ${c.Header}`}>
        <p>
          <b>{orgs.length} Organizations</b>
        </p>
        <button onClick={() => setNewOrganizationPopupOpen(true)}>New Organization</button>
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
      <PopupModal
        title="New Organization"
        isOpen={isNewOrganizationPopupOpen}
        onClose={() => setNewOrganizationPopupOpen(false)}
        className="w-[30rem]"
      >
        <NewOrganization onCreate={onCreate} />
      </PopupModal>
    </div>
  );
};

export default OrganizationModal;
