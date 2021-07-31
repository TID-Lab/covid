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

// TODO: Style hyperlinks in the Terms, etc. pages

const App = () => {
  const popupModal = useSelector(state => state.popup);

  return (
    <div className='Root'>
      <div className='App'>
        <Router>

          <Header />

          <Switch>
            <Route exact path="/">
              <Dashboard />
            </Route>
            <Route path="/login">
              <Login />
              <Footer />
            </Route>
            <Route path="/settings">
              <Settings />
            </Route>
            <Route path="/about">
              <PrivacyPolicy />
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