import './index.css';

import notify from '../../util/notify';
import { deleteOrganization } from '../../api/org';
import { useShowPopup } from '../../hooks/popup';
import EditOrganization from '../EditOrganization';
import { useState } from 'react';

const Organization = (props) => {
  const { _id, name: initName, role, onDelete } = props;

  const [ name, setName ] = useState(initName);

  const showPopup = useShowPopup();

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
  }

  function showEditModal() {
    showPopup(
      <EditOrganization
        _id={_id}
        name={name}
        onEdit={onEdit}
      />
    );
  }
  
  return (
    <div className='Row Organization'>
      <div>
        <span>{role}</span>
        {name}
      </div>
      <div>
        <button className='Edit' onClick={showEditModal}>Edit</button>
        <button onClick={deleteOrg}>Delete</button>
      </div>
    </div>
  );
};

export default Organization;