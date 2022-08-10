import {
    Switch,
    Route,
    useRouteMatch,
  } from 'react-router-dom';

import c from './index.module.css';

import OrganizationSettings from 'components/OrganizationSettings';
import TopicSettings from 'components/TopicSettings';
import useAuth from 'hooks/auth';
import ResourceSettings from 'components/ResourceSettings';

const Settings = () => {
    useAuth();

    let { path } = useRouteMatch();

    return (
    <div className={`Root ${c.Settings}`}>
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
                <ResourceSettings/>
            </Route>
        </Switch>
    </div>
    );
};

export default Settings;