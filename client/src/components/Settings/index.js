import {
    Switch,
    Route,
    useRouteMatch,
  } from "react-router-dom";

import './index.css';

import '../TopicSettings';
import TopicSettings from "../TopicSettings";

const Settings = () => {
    let { path } = useRouteMatch();

    return (
    <div className='Settings'>
    <Switch>
        <Route exact path={path}>
            TODO
        </Route>
        <Route path={`${path}/topics`}>
            <TopicSettings />
        </Route>
        </Switch>
    </div>
    );
};

export default Settings;