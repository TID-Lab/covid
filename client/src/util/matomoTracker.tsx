import { MatomoProvider, createInstance } from '@jonkoops/matomo-tracker-react';
import { MatomoInstance } from '@jonkoops/matomo-tracker-react/lib/types';
import React from 'react';

type MatomoTrackerProps = {
  value: MatomoInstance,
  children?: React.ReactNode
}
const instance = createInstance({
  urlBase: 'https://cartercenter.matomo.cloud/',
  siteId: 6,
  linkTracking: false 
  // userId: 'UID76903202', // optional, default value: `undefined`.
  // trackerUrl: 'https://LINK.TO.DOMAIN/tracking.php', // optional, default value: `${urlBase}matomo.php`
  // srcUrl: 'https://LINK.TO.DOMAIN/tracking.js', // optional, default value: `${urlBase}matomo.js`
  // disabled: false, // optional, false by default. Makes all tracking calls no-ops if set to true.
  // heartBeat: { // optional, enabled by default
  //   active: true, // optional, default value: true
  //   seconds: 10 // optional, default value: `15
  // },
  // linkTracking: false, // optional, default value: true
  // configurations: { // optional, default value: {}
  //   // any valid matomo configuration, all below are optional
  //   disableCookies: true,
  //   setSecureCookie: true,
  //   setRequestMethod: 'POST'
  // }
})

const MatomoTracker = ({ children }: MatomoTrackerProps) => {
 return ( 
  <MatomoProvider value={instance}>
    {children}
  </MatomoProvider>
 )
}
export default MatomoTracker;
