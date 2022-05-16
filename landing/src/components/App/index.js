import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { useSelector } from 'react-redux';

import './index.css';

import LandingHeader from '../LandingHeader';
import LandingPage from '../LandingPage';
import AboutPage from '../AboutPage';
import TeamPage from '../TeamPage';

// TODO: Style hyperlinks in the Terms, etc. pages

const App = () => {
  const popupModal = useSelector(state => state.popup);

  return (
    <div className='Root'>
      <div className='App'>
        <Router>
          
          <LandingHeader />
          <Switch>
            <Route exact path="/">
              <LandingPage />
            </Route>
            
            <Route path="/about">
              <AboutPage />
            </Route>
            <Route path="/team">
              <TeamPage />
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