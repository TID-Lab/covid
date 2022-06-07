// allows for css imports
declare module '*.css';

//matomo category typings

interface MatomoEvent {
  category: 'Filter' | 'Post'
  action: MatomoFilterAction | MatomoPostAction
  name: string
}
//lol. theres probably a better way to do this
type MatomoFilterAction = 'Search' | 'COVID-19 Topics' | 'Type of Account' | 'Account Location' | 'Account Category' | 'Account Identity' | 'Platforms' | 'Clear Filters' | 'Sort By'
type MatomoPostAction = 'Create Post' | 'Close Create Post' | 'Copy Text' | 'Copy Link' | 'Copy Image' |  'Posted To' 