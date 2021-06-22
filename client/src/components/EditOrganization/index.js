import { useState } from 'react';
import { editOrganization } from '../../api/org';
import notify from '../../util/notify';

import { useHidePopup } from '../../hooks/popup';

import './index.css';

const EditOrganization = (props) => {
  const { _id, name:initName, onEdit } = props;

  const [ name, setName ] = useState(initName);
  const [ password, setPassword ] = useState('');
  
  const hidePopup = useHidePopup();

  function onNameChange(event) {
    setName(event.target.value);
  }

  function onPasswordChange(event) {
    setPassword(event.target.value);
  }

  async function onSubmit() {
    try {
      const org = await editOrganization({
        _id,
        name,
        pwd: password,
      });

      onEdit(org);

      hidePopup();

      setName('');
      setPassword('');

    } catch (err) {
      notify('An error occurred.');
    }
  }

  function onClose() {
    hidePopup();
  }

  return (
    <div className='Modal EditOrganization'>
      <h1>Edit Organization</h1>
      <input className='Name' type='text' value={name} onChange={onNameChange} placeholder='Name'></input>
      <input type='password' value={password} onChange={onPasswordChange} placeholder='New Password'></input>
      <p>Leave blank to keep the current password.</p>
      <div>
        <button onClick={onSubmit}>Submit</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  )
};

export default EditOrganization;