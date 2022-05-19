import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { useSelector } from 'react-redux';

import './index.css';

import Header from '../Header';
import Footer from '../Footer';
import Dashboard from '../Dashboard';
import Settings from '../Settings';
import Login from '../Login';
import PrivacyPolicy from '../PrivacyPolicy';
import Terms from '../Terms';
import DataDeletion from '../DataDeletion';
import LandingPage from '../LandingPage';
import AboutPage from '../AboutPage';
import TeamPage from '../TeamPage';
import ResourceDashboard from '../ResourceDashboard/index';

// TODO: Style hyperlinks in the Terms, etc. pages

const App = () => {
  const popupModal = useSelector(state => state.popup);

  return (
    <div className='Root'>
      <div className='App'>
        <Router>
          <Header />
          <Switch>
            <Route path="/resources">
              <ResourceDashboard/>
            </Route>
            <Route exact path="/">
              <LandingPage />
            </Route>
            <Route exact path="/social-media-dashboard">
              <Dashboard />
            </Route>
            <Route path="/about">
              <AboutPage />
            </Route>
            <Route path="/team">
              <TeamPage />
            </Route>
            <Route path="/login">
              <Login />
              <Footer />
            </Route>
            <Route path="/settings">
              <Settings />
            </Route>
            <Route path="/social-media-dashboard/about">
              <PrivacyPolicy />
            </Route>
            <Route path="/social-media-dashboard/privacy-policy">
              <PrivacyPolicy />
            </Route>
            <Route path="/social-media-dashboard/terms">
              <Terms />
            </Route>
            <Route path="/dassocial-media-dashboardhboard/data-deletion">
              <DataDeletion />
            </Route>
          </Switch>

        </Router>
      </div>
      <div id='Popup'>
        {popupModal}
      </div>
    </div>
  );
}

export default App;