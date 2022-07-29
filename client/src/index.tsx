// @ts-nocheck
// Initializes the client-side React app.
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './pages/App';
import TrackerProvider from 'util/trackerProvider';
import MatomoTracker from 'util/matomoTracker';

import './css/index.css';
/*<TrackerProvider
      useTracker={process.env.REACT_APP_TRACKER_ACTIVE === 'true' && true}
      vendor={(children) => <MatomoTracker>{children}</MatomoTracker>}
    >
        </TrackerProvider>

    */
//  so i had a different solution in mind when i first wrote this matomo tracker thing but now its overcomplicated, refactor later
ReactDOM.render(
  <Provider store={store}>
    
      <App />
  </Provider>,
  document.getElementById('root')
);
