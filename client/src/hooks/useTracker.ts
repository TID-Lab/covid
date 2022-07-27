import { useMatomo } from '@jonkoops/matomo-tracker-react';

import {
  TrackEventParams,
  TrackLinkParams,
  TrackPageViewParams,
  TrackSiteSearchParams,
} from '@jonkoops/matomo-tracker-react/src/types';

const isTrackerActive = process.env.REACT_APP_TRACKER_ACTIVE === 'true' && true;

//matomo category typings
export type MatomoCategories =
  | 'Filter'
  | 'Post'
  | 'Monitoring Page'
  | 'Resources Page';
export interface MatomoEvent extends TrackEventParams {
  category: MatomoCategories;
  action: string;
  name?: string;
}

function useTracker() {
  const {
    trackPageView: matomoTrackPageView,
    trackEvent: matomoTrackEvent,
    trackEvents: matomoTrackEvents,
    trackSiteSearch: matomoSiteSearch,
    trackLink: matomoLink,
    enableLinkTracking: matomoLinkTracking,
    pushInstruction: matomoPush,
  } = useMatomo();

  const trackPageView = (params?: TrackPageViewParams) =>
    isTrackerActive && matomoTrackPageView(params);

  const trackEvent = (params: MatomoEvent) =>
    isTrackerActive && matomoTrackEvent(params);

  const trackEvents = () => isTrackerActive && matomoTrackEvents();

  const trackSiteSearch = (params: TrackSiteSearchParams) =>
    isTrackerActive && matomoSiteSearch(params);

  const trackLink = (params: TrackLinkParams) =>
    isTrackerActive && matomoLink(params);

  const enableLinkTracking = () => isTrackerActive && matomoLinkTracking();

  const pushInstruction = (name: string, ...args: any[]) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    isTrackerActive && matomoPush(name, ...args);
  };

  return {
    trackEvent,
    trackEvents,
    trackPageView,
    trackSiteSearch,
    trackLink,
    enableLinkTracking,
    pushInstruction,
  };
}
export default useTracker;
