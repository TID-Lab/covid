/**
 * Constant values used across severa parts of the dashboard.
 */

// A list of keywords passed to social media API's in order
// to query for just COVID-19 related posts.
const COVID_KEYWORDS = [
  'covid',
  'coronavirus',
  'vaccine',
  'vax',
  'vaccinated',
  'vxxed',
  'unvxxed',
  'pandemic',
  'masks',
  'quarantine',
];

// A dictionary of COVID-19 topics and substrings used
// to classify incoming posts by those topics using post content.
const COVID_TOPICS = {
  'covid-diabetes': [
    'diabet',
    't1d',
    't2d',
    'insulin',
    'blood sugar',
    'a1c',
    'metformin',
    'heart disease',
    'obes',
    'overweight',
  ],
  'testing': [
    'test',
    'pcr',
    'swab',
    'negative',
    'covid result',
  ],
  'vaccines': [
    'vacc',
    'vax',
    'vxx',
    'shot',
    'jab',
    'astrazeneca',
    'j&j',
    'johnson & johnson',
    'johnson and johnson',
    'moderna',
    'pfizer',
    'mrna',
    'one and done',
    'oneanddone',
  ],
  'long-hauler': [
    'long hauler',
    'long-hauler',
    'longhauler',
    'long covid',
    'longcovid',
  ],
  'variants': [
    'variant',
    'delta',
    'lambda',
  ],
  'georgia': [
    'georgia',
    'atl',
    'fulton',
    'dekalb',
    'cobb',
    'clayton',
    'gwinnett',
    'albany',
    'dougherty',
  ],
}

module.exports = { COVID_KEYWORDS, COVID_TOPICS };