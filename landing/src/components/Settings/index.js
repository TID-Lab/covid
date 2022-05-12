import {
    Switch,
    Route,
    useRouteMatch,
  } from "react-router-dom";

import './index.css';

import OrganizationSettings from '../OrganizationSettings';
import TopicSettings from "../TopicSettings";
import useAuth from '../../hooks/auth';

const Settings = () => {
    useAuth();

    let { path } = useRouteMatch();

    return (
    <div className='Root Settings'>
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
        </Switch>
    </div>
    );
};

export default Settings;