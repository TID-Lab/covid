// @ts-nocheck
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useAppSelector } from 'hooks/useTypedRedux';

import c from './index.module.css';

import Footer from 'components/Footer';
import Login from 'pages/Login';
import Header from 'components/Header';

import Dashboard from 'pages/Dashboard';
import Settings from 'pages/Settings';
import PrivacyPolicy from 'pages/PrivacyPolicy';
import Terms from 'pages/Terms';
import DataDeletion from 'pages/DataDeletion';
import ResourceDashboard from 'pages/ResourceDashboard';
import useTracker from 'hooks/useTracker';

// TODO: Style hyperlinks in the Terms, etc. pages

const App = () => {
  const popupModal = useAppSelector((state) => state.popup);
  const { enableLinkTracking } = useTracker();

  enableLinkTracking();
  return (
    <div className={c.Root}>
      <div className="App">
        <Router>
          <Header />
          <Switch>
            <Route path="/resources">
              <ResourceDashboard />
            </Route>
            <Route exact path="/">
              <Login />
              <Footer />
            </Route>
            <Route path="/login">
              <Login />
              <Footer />
            </Route>
            <Route path="/social-media-dashboard">
              <Dashboard />
            </Route>
            <Route path="/settings">
              <Settings />
            </Route>
            <Route path="/privacy-policy">
              <PrivacyPolicy />
            </Route>
            <Route path="/terms">
              <Terms />
            </Route>
            <Route path="/data-deletion">
              <DataDeletion />
            </Route>
          </Switch>
        </Router>
      </div>
      <div id="Popup" className={c.Popup}>
        {popupModal}
      </div>
    </div>
  );
};

export default App;
