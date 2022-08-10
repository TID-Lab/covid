import { Menu } from '@headlessui/react';
import Icon from 'components/Icon';
import { Link } from 'react-router-dom';

const HeaderMenu = () => {
  function onLogout() {
    fetch('/api/auth/logout', { method: 'POST' }).then((response) => {
      if (response.redirected) {
        window.location.href = response.url;
      }
    });
  }
  return (
    <Menu as="div" className="relative text-left">
      <Menu.Button className="  pl-6 pr-3 py-2 bg-white  hover:bg-slate-200 border border-slate-200 flex  gap-x-1 items-center font-medium  rounded-xs">
        Menu <Icon type="chevron-down" />
      </Menu.Button>
      <Menu.Items className="absolute  text-md mt-1 divide-y w-fit divide-slate-300 right-0 p-3 z-50 font-medium drop-shadow-lg bg-slate-50 rounded-xs border border-slate-300">
        <div>
          <Menu.Item>
            {({ active }) => (
              <Link
                className="flex items-center gap-x-2 text-slate-700 hover:bg-blue-100 hover:text-blue-800  rounded-2xs py-2 pr-4 pl-2 truncate"
                to="/settings/orgs"
              >
                <Icon type="settings" size="sm" className="text-blue-700" />

                <p>Settings</p>
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                type="button"
                className={`${
                  active && 'bg-blue-300'
                } flex mb-1 items-center gap-x-2 font-medium hover:bg-blue-100 hover:text-blue-800  rounded-2xs py-2 pr-4 pl-2 w-full`}
                onClick={onLogout}
              >
                <Icon type="log-out" size="sm" className="text-red-700" />
                Logout
              </button>
            )}
          </Menu.Item>
        </div>

        <div className="pt-1 font-regular">
          <Menu.Item>
            {({ active }) => (
              <Link
                className="flex items-center gap-x-2 text-slate-700 hover:bg-blue-100 hover:text-blue-800  rounded-2xs py-2 px-4 truncate"
                to="/privacy-policy"
              >
                <p>
                  <span className="mr-[20px]" />
                  Privacy Policy
                </p>
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <Link
                className="flex items-center gap-x-2 text-slate-700 hover:bg-blue-100 hover:text-blue-800  rounded-2xs py-2 px-4 truncate"
                to="/terms"
              >
                <p>
                  {' '}
                  <span className="mr-[20px]" />
                  Terms of Service
                </p>
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <Link
                className="flex items-center text-slate-700 gap-x-2 hover:bg-blue-100 hover:text-blue-800 rounded-2xs py-2 px-4 truncate"
                to="/data-deletion"
              >
                <p>
                  <span className="mr-[20px]" />
                  Data Deletion
                </p>
              </Link>
            )}
          </Menu.Item>
        </div>
      </Menu.Items>
    </Menu>
  );
};

export default HeaderMenu;
