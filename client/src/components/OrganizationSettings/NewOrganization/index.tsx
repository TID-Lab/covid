// @ts-nocheck
import { useState } from 'react';
import { createOrganization } from 'api/org';
import notify from 'util/notify';

import c from './index.module.css';

const ROLES = ['org', 'admin'];

const NewOrganization = (props) => {
  const { onCreate } = props;

  const [role, setRole] = useState(ROLES[0]);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  function onRoleChange(event) {
    setRole(event.target.value);
  }

  function onNameChange(event) {
    setName(event.target.value);
  }

  function onPasswordChange(event) {
    setPassword(event.target.value);
  }

  async function onSubmit() {
    try {
      const org = await createOrganization({
        role,
        name,
        pwd: password,
      });

      onCreate(org);
    } catch (err) {
      notify('An error occurred.');
    }
  }

  return (
    <div className={`Modal ${c.NewOrganization}`}>
      <h1>New Organization</h1>
      <select onChange={onRoleChange} value={role}>
        {ROLES.map((role) => (
          <option key={role} value={role}>
            {role.charAt(0).toUpperCase() + role.slice(1)}
          </option>
        ))}
      </select>
      <input
        className="Name"
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
      <div>
        <button onClick={onSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default NewOrganization;
