const { Engine, builtin } = require('downstream');
const useDebug = require('debug');
const { fetch: { credentials } } = require('./util/config');
const keywords = require('../../keywords');
const SocialMediaPost = require('./post');

const debug = useDebug('fetch');

const {
  TwitterPageChannel,
  TwitterStreamChannel,
  CrowdTangleFacebookChannel,
  CrowdTangleInstagramChannel,
} = builtin;

const engine = new Engine();

const twitterStreamChannel = new TwitterStreamChannel({
  credentials: credentials.twitter,
});

const twitterPageChannel = new TwitterPageChannel({
  credentials: credentials.twitter,
  queryParams: {
    query: keywords.join(' OR '),
  },
});

const facebookListChannel = new CrowdTangleFacebookChannel({
  dashboardToken: credentials.facebook,
  queryParams: {
    searchTerm: keywords.join(', '),
  },
});

const facebookPlatformChannel = new CrowdTangleFacebookChannel({
  dashboardToken: credentials.facebook,
  isCrossPlatform: true,
  queryParams: {
    searchTerm: keywords.join(', '),
  },
});

const instaListChannel = new CrowdTangleInstagramChannel({
  dashboardToken: credentials.instagram,
  queryParams: {
    searchTerm: keywords.join(', '),
  },
});

const instaPlatformChannel = new CrowdTangleInstagramChannel({
  dashboardToken: credentials.instagram,
  isCrossPlatform: true,
  queryParams: {
    searchTerm: keywords.join(', '),
  },
});

const saveToDatabase = async (data, next) => {
  const post = new SocialMediaPost(data);
  await post.save();
  await next();
};

module.exports = async () => {
  debug('Starting downstream...');

  engine.register(twitterStreamChannel);
  // engine.register(twitterPageChannel);
  engine.register(facebookListChannel);
  // engine.register(facebookPlatformChannel);
  engine.register(instaListChannel);
  // engine.register(instaPlatformChannel);

  engine.use(saveToDatabase);
  engine.on('error', debug);

  await engine.start();

  debug('Downstream started.');
};
