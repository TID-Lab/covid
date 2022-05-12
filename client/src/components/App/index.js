import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { useSelector } from 'react-redux';

import './index.css';

import Footer from '../Footer';
import Dashboard from '../Dashboard';
import Settings from '../Settings';
import Login from '../Login';
import PrivacyPolicy from '../PrivacyPolicy';
import Terms from '../Terms';
import DataDeletion from '../DataDeletion';


// TODO: Style hyperlinks in the Terms, etc. pages

const App = () => {
  const popupModal = useSelector(state => state.popup);

  return (
    <div className='Root'>
      <div className='App'>
        <Router>

          <Switch>
            <Route exact path="/">
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
      <div id='Popup'>
        {popupModal}
      </div>
    </div>
  );
}

export default App;