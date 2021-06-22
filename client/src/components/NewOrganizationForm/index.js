import { useState } from 'react';
import { createOrganization } from '../../api/org';
import notify from '../../util/notify';
import './index.css';

const ROLES = [ 'org', 'admin' ];

const NewOrganizationForm = (props) => {
  const { onSubmit } = props;

  const [ role, setRole ] = useState(ROLES[0]);
  const [ name, setName ] = useState('');
  const [ password, setPassword ] = useState('');

  function onRoleChange(event) {
    setRole(event.target.value);
  }

  function onNameChange(event) {
    setName(event.target.value);
  }

  function onPasswordChange(event) {
    setPassword(event.target.value);
  }

  async function onFormSubmit(event) {
    event.preventDefault();

    try {
      const org = await createOrganization({
        role,
        name,
        pwd: password,
      });

      onSubmit(org);

      setRole('default');
      setName('');
      setPassword('');

    } catch (err) {
      notify('An error occurred.');
    }
  }

  return (
    <form className='NewOrganizationForm' onSubmit={onFormSubmit}>
      <select name='role' onChange={onRoleChange} value={role}>
        {ROLES.map(role => (
          <option key={role} value={role}>{role.charAt(0).toUpperCase() + role.slice(1)}</option>
        ))}
      </select>
      <input name='name' type='text' placeholder='Name' onChange={onNameChange} value={name}></input>
      <input name='pwd' type='password' placeholder='Password' onChange={onPasswordChange} value={password}></input>
      <button type='submit'>Submit</button>
    </form>
  );
};

export default NewOrganizationForm;