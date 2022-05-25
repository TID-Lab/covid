import { useEffect, useState } from 'react';
import { fetchOrganizations } from '../../api/org';

import './index.css';

const LoginModal = () => {
  const [ orgs, setOrgs ] = useState([]);

  useEffect(() => {
    (async () => {
      const organizations = await fetchOrganizations();
      setOrgs(organizations);
    })();
  }, []);

  return (
  <div className='Modal LoginModal'>
    <img src='/images/projectpeach.png' alt='Project Peach'></img>
    <h1>Organization Login</h1>
    <form method='post' action='/api/auth/login'>
      <select name='name'>
        <option value='default'>Select your organization</option>
        {orgs.sort((a, b) => a.name.localeCompare(b.name)).map(org => (
          <option value={org.name}>{org.name}</option>
        ))}
      </select>
      <input name='pwd' type='password' placeholder='Organization password'></input>
      <button type='submit'>Login</button>
    </form>
  </div>
  );
};

export default LoginModal;