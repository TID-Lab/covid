// @ts-nocheck
import { useEffect, useState } from 'react';
import { fetchOrganizations } from 'api/org';

import c from './index.module.css';

const LoginModal = () => {
  const [orgs, setOrgs] = useState([]);

  useEffect(() => {
    (async () => {
      const organizations = await fetchOrganizations();
      setOrgs(organizations);
    })();
  }, []);

  return (
    <div className={`Modal ${c.LoginModal}`}>
      <img src="/images/projectpeach.png" alt="Project Peach Logo"></img>
      <h1 className="text-center text-3xl mb-9 mt-6">Organization Login</h1>
      <form
        className="grid grid-col items-center justify-start gap-y-4"
        method="post"
        action="/api/auth/login"
      >
        <select name="name" className="pl-4">
          <option value="default">Select your organization</option>
          {orgs
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((org) => (
              <option value={org.name}>{org.name}</option>
            ))}
        </select>
        <input
          name="pwd"
          type="password"
          className="pl-4"
          placeholder="Organization password"
        ></input>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginModal;
