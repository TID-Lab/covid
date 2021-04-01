import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';

import './index.css';

import Header from '../Header';
import Dashboard from '../Dashboard';

const App = () => {
  return (
    <div class='App'>
      <Router>

        <Header />

        <Switch>
          <Route path="/">
            <Dashboard />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;