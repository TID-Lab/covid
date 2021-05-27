const { Engine, builtin } = require('downstream');
const useDebug = require('debug');
const { fetch: { credentials } } = require('./util/config');
const { get, set } = require('./util/settings');
const { COVID_KEYWORDS } = require('../../constants');

// middleware
const addTags = require('./middleware/tags');
const saveToDatabase = require('./middleware/database');

const debug = useDebug('fetch');

const {
  TwitterPageChannel,
  TwitterStreamChannel,
  CrowdTangleFacebookChannel,
  CrowdTangleInstagramChannel,
} = builtin;

const engine = new Engine();

module.exports = async () => {
  debug('Starting downstream...');

  const settings = await get();

  const twitterStreamChannel = new TwitterStreamChannel({
    credentials: credentials.twitter,
  });

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

  const facebookListChannel = new CrowdTangleFacebookChannel({
    dashboardToken: credentials.facebook,
    queryParams: {
      searchTerm: COVID_KEYWORDS.join(', '),
    },
    lastTimestamp: settings.facebook_list_lastTimestamp,
    onFetch: async (lastTimestamp) => {
      await set('facebook_list_lastTimestamp', lastTimestamp);
    },
  });

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

  const instaListChannel = new CrowdTangleInstagramChannel({
    dashboardToken: credentials.instagram,
    queryParams: {
      searchTerm: COVID_KEYWORDS.join(', '),
    },
    lastTimestamp: settings.insta_list_lastTimestamp,
    onFetch: async (lastTimestamp) => {
      await set('insta_list_lastTimestamp', lastTimestamp);
    },
  });

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

  engine.register(twitterStreamChannel);
  // engine.register(twitterPageChannel);
  engine.register(facebookListChannel);
  // engine.register(facebookPlatformChannel);
  engine.register(instaListChannel);
  // engine.register(instaPlatformChannel);

  // TODO engine.use(addTopics)
  engine.use(addTags);
  // TODO engine.use(addMetrics)
  engine.use(saveToDatabase);

  engine.on('error', debug);

  await engine.start();

  debug('Downstream started.');
};
