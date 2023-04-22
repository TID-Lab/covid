import { useEffect, useState, Fragment } from 'react';
import { fetchOrganizations } from 'api/org';
import { Combobox } from '@headlessui/react';
import Icon from 'components/Icon';

interface orgSchema {
  name: string;
  role: string;
}

const LoginModal = () => {
  const [orgs, setOrgs] = useState<orgSchema[]>([]);
  const [selectedOrg, setSelectedOrg] = useState<string>();
  const [query, setQuery] = useState('');
  const [pwd, setPwd] = useState('');

  useEffect(() => {
    (async () => {
      const organizations = await fetchOrganizations();
      setOrgs(organizations);
    })();
  }, []);

  function onLogin() {
    if (selectedOrg) {
      fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: selectedOrg, pwd: pwd }),
      }).then((response) => {
        if (response.redirected) {
          window.location.href = response.url;
        }
      });
    }
  }

  const filteredOrgs =
    query === ''
      ? orgs
      : orgs.filter((org) => {
          return org.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <section
      className={`p-6 bg-white drop-shadow-lg rounded-sm flex items-center justify-between flex-col border border-slate-300 w-[400px] `}
    >
      <div className="flex flex-col items-center">
        <img
          className="w-[50px] my-6"
          src="/images/projectpeach.png"
          alt="Project Peach Logo"
        />
        <h1 className="text-2xl text-center mb-9">Organization Login</h1>
      </div>
      <div className="flex flex-col w-full">
        <Combobox
          value={selectedOrg}
          onChange={setSelectedOrg}
          disabled={orgs.length === 0}
        >
          <Combobox.Label className="pl-3 text-sm font-medium">
            Organization
          </Combobox.Label>
          <div className="relative flex items-center w-full border bg-slate-50 border-slate-300 rounded-xs ">
            <Combobox.Input
              onChange={(event) => setQuery(event.target.value)}
              placeholder="select your organization"
              className="border-0  pl-3 py-1 rounded-xs bg-transparent flex-grow focus:bg-slate-50 focus:ring-inset focus:ring-[1px] ring-offset-0 "
            />
            <Combobox.Button
              type="button"
              aria-label="dropdown"
              className="py-3 pr-3 border border-transparent pl-9 hover:bg-blue-100 rounded-xs"
            >
              <Icon type="chevron-down" size="sm" />
            </Combobox.Button>
            <Combobox.Options className="absolute z-50 w-full p-3 mt-1 font-medium border rounded-xs top-full bg-slate-50 border-slate-300">
              {filteredOrgs
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((org, index) => (
                  <Combobox.Option key={index} value={org.name} as={Fragment}>
                    {({ active, selected }) => (
                      <li
                        className={`flex cursor-pointer items-center border justify-between rounded-2xs px-3 py-1 gap-x-1 ${
                          active
                            ? 'bg-blue-100 border-blue-200'
                            : 'border-transparent'
                        } ${selected ? 'text-blue-900  font-bold' : ''}`}
                      >
                        {org.name}
                        {selected && <Icon type="check" size="sm" />}
                      </li>
                    )}
                  </Combobox.Option>
                ))}
            </Combobox.Options>
          </div>
        </Combobox>

        {/* <select name="name" className="px-4 py-2">
        <option value="default">Select your organization</option>
        {orgs
          .sort((a:any, b:any) => a.name.localeCompare(b.name))
          .map((org, index) => (
            <option key={index} value={org.name}>
              {org.name}
            </option>
          ))}
      </select> */}
        <label htmlFor="pass" className="pl-3 mt-4 text-sm font-medium">
          Password
        </label>
        <input
          id="pass"
          name="pwd"
          type="password"
          value={pwd}
          onChange={(event) => setPwd(event.target.value)}
          className="input w-full px-4 py-2"
          placeholder="Organization password"
        />
        <button
          type="button"
          onClick={onLogin}
          className="w-full px-2 py-3 text-center bg-blue-100 border border-blue-300 mt-9 hover:bg-blue-200 rounded-xs"
        >
          Login
        </button>
      </div>
    </section>
  );
};

export default LoginModal;
