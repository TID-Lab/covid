// @ts-nocheck
import c from './index.module.css';

import notify from 'util/notify';
import { deleteOrganization } from 'api/org';
import PopupModal from 'components/PopupModal';
import EditOrganization from '../EditOrganization';
import { useState } from 'react';

const Organization = (props) => {
  const { _id, name: initName, role, onDelete } = props;

  const [name, setName] = useState(initName);
  const [isEditOrganizationPopupOpen, setEditOrganizationPopupOpen] = useState(false);

  async function deleteOrg() {
    const success = await deleteOrganization(_id);
    if (!success) {
      notify('An error occurred.');
      return;
    }
    onDelete(_id);
  }

  function onEdit(org) {
    setName(org.name);
    setEditOrganizationPopupOpen(false);
  }

  return (
    <div className={`Row ${c.Organization}`}>
      <div>
        <span>{role}</span>
        {name}
      </div>
      <div>
        <button className="Edit" onClick={() => setEditOrganizationPopupOpen(true)}>
          Edit
        </button>
        <button onClick={deleteOrg}>Delete</button>
      </div>
      <PopupModal
        title="Edit Organization"
        isOpen={isEditOrganizationPopupOpen}
        onClose={() => setEditOrganizationPopupOpen(false)}
        className="w-[30rem]"
      >
        <EditOrganization _id={_id} name={name} onEdit={onEdit} />
      </PopupModal>
    </div>
  );
};

export default Organization;
