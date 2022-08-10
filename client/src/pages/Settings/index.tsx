// @ts-nocheck
import {
  Switch,
  Route,
  useRouteMatch,
  NavLink,
  useLocation,
} from 'react-router-dom';

import c from './index.module.css';

import OrganizationSettings from 'components/OrganizationSettings';
import TopicSettings from 'components/TopicSettings';
import ResourceSettings from 'components/ResourceSettings';
import Button from 'components/Button';
import useAuth from 'hooks/auth';
import Icon from 'components/Icon';

const Settings = () => {
  useAuth();

  let { path } = useRouteMatch();
  const { pathname } = useLocation(); // TODO show search only if in dashboard mode

  return (
    <>
      <div className="container mx-auto w-full">
        <NavLink to="/social-media-dashboard">
          <Button variant="transparent" size="md" className="text-sm ml-2">
            <Icon type="arrow-left" size="xs" />
            Return to Dashboard
          </Button>
        </NavLink>

        <div className="flex gap-x-3 items-center px-6 text-slate-700 mb-7 mt-1">
          <Icon type="settings" size="md" />
          <h1 className="text-xl font-medium ">Admin Settings</h1>
        </div>
      </div>
      <div
        className={`container flex justify-center mx-auto w-full h-full overflow-hidden flex-1 `}
      >
        <section className="px-6 mb-4 border-r border-slate-300 flex flex-col gap-y-2 text-md font-medium text-slate-700">
          <NavLink
            to={`${path}/orgs`}
            className="px-6 py-3 rounded-xs hover:bg-blue-100 hover:text-blue-700"
            activeClassName={
              'bg-blue-800 text-slate-100 hover:bg-blue-800 hover:text-slate-100'
            }
          >
            Organization
          </NavLink>
          <NavLink
            to={`${path}/topics`}
            className="px-6 py-3 rounded-xs hover:bg-blue-100 hover:text-blue-700"
            activeClassName="bg-blue-800 text-slate-100 hover:bg-blue-800 hover:text-slate-100"
          >
            Topics
          </NavLink>
          <NavLink
            to={`${path}/resources`}
            className="px-6 py-3 rounded-xs hover:bg-blue-100 hover:text-blue-700"
            activeClassName="bg-blue-800 text-slate-100 hover:bg-blue-800 hover:text-slate-100"
          >
            Resources
          </NavLink>
        </section>
        <section className="flex-1 px-6 flex flex-col overflow-hidden">
          <Switch>
            <Route exact path={path}>
              TODO
            </Route>
            <Route path={`${path}/orgs`}>
              <OrganizationSettings />
            </Route>
            <Route path={`${path}/topics`}>
              <TopicSettings />
            </Route>
            <Route path={`${path}/resources`}>
              <ResourceSettings />
            </Route>
          </Switch>
        </section>
      </div>
    </>
  );
};

export default Settings;
