export const ACC_CATEGORIES = {
  all: 'All',
  government: 'Government',
  media: 'Media',
  faith: 'Faith',
  health: 'Health',
  diabetes: 'Diabetes',
  misinfo: 'Known Misinfo Spreaders',
  partners: 'Project Partners',
  trusted: 'Trusted Resources',
} as const;

export const LABELS = {
  ...ACC_CATEGORIES,
  latinx: 'Hispanic/Latinx',
  blackafam: 'Black/African American',
  georgia: 'Georgia',
  institutional: 'Institution'
} as const;

export type ACC_CATEGORIES_TYPE = keyof typeof ACC_CATEGORIES;

export const INSTITUTION = {
  all: 'All',
  institutional: 'Institution',
  nonInstitutional: 'Non-Institution',
} as const;

export type INSTITUTION_TYPE = keyof typeof INSTITUTION;

export const LOCATION = {
  all: 'All',
  georgia: 'Georgia',
  nonGeorgia: 'non-Georgia',
} as const;

export type LOCATION_TYPE = keyof typeof LOCATION;

export const COVID_TOPICS = {
  all: 'All',
  vaccines: 'Vaccines',
  booster: 'Boosters',
  treatments: ' Treatments',
  'long-hauler': 'Long COVID',
  variants: 'Variants',
  'covid-diabetes': 'COVID x Diabetes',
  testing: 'Testing',
  georgia: 'Georgia',
} as const;

export type COVID_TOPICS_TYPE = keyof typeof COVID_TOPICS;

export const IDENTITIES = {
  all: 'All',
  blackafam: 'Black/African American',
  latinx: 'Hispanic/Latinx',
} as const;

export type IDENTITIES_TYPE = keyof typeof IDENTITIES;

export const DATE_PRESETS = {
  today: 'Today',
  '7days': '7 days',
  '30days': '30 days',
  '60days': '60 days',
  month: 'This Month',

  year: 'This Year',
  all: 'All Time',
  custom: 'Custom',
} as const;

export type DATE_PRESET_TYPE = keyof typeof DATE_PRESETS;
