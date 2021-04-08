import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import './index.css';

import Header from '../Header';
import Dashboard from '../Dashboard';
import Settings from '../Settings';

const App = () => {
  return (
    <div className='App'>
      <Router>

        <Header />

        <Switch>
          <Route exact path="/">
            <Dashboard />
          </Route>
          <Route path="/settings">
            <Settings />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;