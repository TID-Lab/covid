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

export type ACC_CATEGORIES_TYPE = keyof typeof ACC_CATEGORIES;

export const ACC_TYPE = {
  all: 'All',
  institutional: 'Institutional',
  nonInstitutional: 'Non-Institutional',
} as const;

export type ACC_TYPE_TYPE = keyof typeof ACC_TYPE;

export const LOCATION = {
  all: 'All',
  institutional: 'Institutional',
  nonInstitutional: 'Non-Institutional',
} as const;

export type LOCATION_TYPE = keyof typeof ACC_TYPE;

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
