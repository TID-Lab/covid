// @ts-nocheck
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useAppSelector } from 'hooks/useTypedRedux';

import './index.css';

import LandingHeader from '../LandingHeader';
import LandingPage from '../LandingPage';
import AboutPage from '../AboutPage';
import TeamPage from '../TeamPage';

// TODO: Style hyperlinks in the Terms, etc. pages

const App = () => {
  const popupModal = useAppSelector((state) => state.popup);

  return (
    <div className="Root">
      <div className="App">
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
      <div id="Popup">{popupModal}</div>
    </div>
  );
};

export default App;
