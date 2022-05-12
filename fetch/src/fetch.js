const { Downstream, builtin } = require('downstream');
const useDebug = require('debug');
const { fetch: { credentials } } = require('./util/config');
const { get, set } = require('./util/settings');
const { COVID_KEYWORDS } = require('constants');

// hooks
const addTopics = require('./hooks/topics');
const addTags = require('./hooks/tags');
const addEngagement = require('./hooks/engagement');
const saveToDatabase = require('./hooks/database');

const debug = useDebug('fetch');

const {
  TwitterPageChannel,
  TwitterStreamChannel,
  CrowdTangleFacebookChannel,
  CrowdTangleInstagramChannel,
} = builtin;

const downstream = new Downstream();

// Initializes the Downstream app
module.exports = async () => {
  debug('Starting Downstream...');

  const settings = await get();

  // Streams posts from Twitter accounts in the Twitter Lists
  const twitterStreamChannel = new TwitterStreamChannel({
    credentials: credentials.twitter,
  });

  // Fetches posts from all Twitter accounts posting about COVID-19
  const twitterPageChannel = new TwitterPageChannel({
    credentials: credentials.twitter,
    queryParams: {
      query: COVID_KEYWORDS.join(' OR '),
    },
    lastTimestamp: settings.twitter_page_lastTimestamp,
    onFetch: async (lastTimestamp) => {
      await set('twitter_page_lastTimestamp', lastTimestamp);
    },
  });

  // Fetches posts from Facebook accounts in the CrowdTangle Lists
  const facebookListChannel = new CrowdTangleFacebookChannel({
    dashboardToken: credentials.facebook,
    queryParams: {
      searchTerm: COVID_KEYWORDS.join(', '),
      language: '',
    },
    lastTimestamp: settings.facebook_list_lastTimestamp,
    onFetch: async (lastTimestamp) => {
      await set('facebook_list_lastTimestamp', lastTimestamp);
    },
  });

  // Fetches posts from all Facebook accounts posting about COVID-19
  const facebookPlatformChannel = new CrowdTangleFacebookChannel({
    dashboardToken: credentials.facebook,
    isCrossPlatform: true,
    queryParams: {
      searchTerm: COVID_KEYWORDS.join(', '),
    },
    lastTimestamp: settings.facebook_platform_lastTimestamp,
    onFetch: async (lastTimestamp) => {
      await set('facebook_platform_lastTimestamp', lastTimestamp);
    },
  });

  // Fetches posts from Instagram accounts in the CrowdTangle Lists
  const instaListChannel = new CrowdTangleInstagramChannel({
    dashboardToken: credentials.instagram,
    queryParams: {
      searchTerm: COVID_KEYWORDS.join(', '),
      language: '',
    },
    lastTimestamp: settings.insta_list_lastTimestamp,
    onFetch: async (lastTimestamp) => {
      await set('insta_list_lastTimestamp', lastTimestamp);
    },
  });

  // Fetches posts from all Instagram accounts posting about COVID-19
  const instaPlatformChannel = new CrowdTangleInstagramChannel({
    dashboardToken: credentials.instagram,
    isCrossPlatform: true,
    queryParams: {
      searchTerm: COVID_KEYWORDS.join(', '),
    },
    lastTimestamp: settings.insta_platform_lastTimestamp,
    onFetch: async (lastTimestamp) => {
      await set('insta_platform_lastTimestamp', lastTimestamp);
    },
  });

  // Registers all of the above Channels with Downstream

  downstream.register(twitterStreamChannel);
  // downstream.register(twitterPageChannel);
  downstream.register(facebookListChannel);
  // downstream.register(facebookPlatformChannel);
  downstream.register(instaListChannel);
  // downstream.register(instaPlatformChannel);

  // Uses all of our hooks
  downstream.use(addTopics);
  downstream.use(addTags);
  downstream.use(addEngagement);
  downstream.use(saveToDatabase);

  // Listens for any and all errors
  downstream.on('error', debug);

  await downstream.start();

  debug('Downstream started.');
};
