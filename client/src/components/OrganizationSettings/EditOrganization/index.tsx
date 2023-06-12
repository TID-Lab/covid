// @ts-nocheck
import { useState } from 'react';
import { editOrganization } from 'api/org';
import notify from 'util/notify';

import c from './index.module.css';

const EditOrganization = (props) => {
  const { _id, name: initName, onEdit } = props;

  const [name, setName] = useState(initName);
  const [password, setPassword] = useState('');

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
    } catch (err) {
      notify('An error occurred.');
    }
  }

  return (
    <div className={`Modal ${c.EditOrganization}`}>
      <h1>Edit Organization</h1>
      <input
        className={c.Name}
        type="text"
        value={name}
        onChange={onNameChange}
        placeholder="Name"
      ></input>
      <input
        type="password"
        value={password}
        onChange={onPasswordChange}
        placeholder="New Password"
      ></input>
      <p>Leave blank to keep the current password.</p>
      <div>
        <button onClick={onSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default EditOrganization;
