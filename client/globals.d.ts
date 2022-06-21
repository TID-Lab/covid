// allows for css imports
declare module '*.css';

//matomo category typings

interface MatomoEvent {
  category: 'Filter' | 'Post' | 'Monitoring Page' | 'Resources Page'
  action: MatomoFilterAction | MatomoPostAction | string
  name: string
}
//lol. theres probably a better way to do this
type MatomoFilterAction = 'Search' | 'Set Topics' | 'Set Account Type' | ' Set Account Location' | 'Set Account Category' | 'Set Account Identity' | 'Add Platforms' |  'Remove Platforms' | 'Clear Filters' | 'Sort By'
type MatomoPostAction = 'Create Post' | 'Copy Text' | 'Copy Link' | 'Copy Image' |  'Posted To' 