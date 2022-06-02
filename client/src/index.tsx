// @ts-nocheck
// Initializes the client-side React app.

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './css/index.css';

import store from './store';
import App from './pages/App';
import TrackerProvider from 'util/trackerProvider';
import MatomoTracker from 'util/matomoTracker';
import { MatomoProvider } from '@jonkoops/matomo-tracker-react';

ReactDOM.render(
  <Provider store={store}>
    <TrackerProvider 
      useTracker={true} 
      vendor={children => <MatomoProvider >{children}</MatomoProvider>}
    >
      <App />
    </TrackerProvider>
  </Provider>,
  document.getElementById('root')
);
