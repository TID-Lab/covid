// @ts-nocheck
// Initializes the client-side React app.
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './pages/App';
import TrackerProvider from 'util/trackerProvider';
import MatomoTracker from 'util/matomoTracker';

import './css/index.css';

//  so i had a different solution in mind when i first wrote this but now its a overcomplicated, refactor later
ReactDOM.render(
  <Provider store={store}>
    <TrackerProvider 
      useTracker={process.env.REACT_APP_USE_TRACKER === 'true' && true} 
      vendor={children => <MatomoTracker>{children}</MatomoTracker>}
    >
      <App />
    </TrackerProvider>
  </Provider>,
  document.getElementById('root')
);
