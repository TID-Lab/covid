module.exports = async function addEngagement(post, next) {
  const engagementRaw = 0;
  const engagementNormed = 0;

  const { platform, raw } = post;

  switch (platform) {
    case 'twitter': {
      const { quote_count, reply_count, retweet_count, favorite_count } = raw;
      const { user: { followers_count } } = raw;
      engagementRaw = quote_count + reply_count + retweet_count + favorite_count;
      engagementNormed = engagementRaw / followers_count;
      break;
    }
    case 'facebook': {
      const { statistics: { actual: { likeCount, loveCount, wowCount, hahaCount, sadCount, angryCount, thankfulCount, careCount, commentCount, shareCount } } } = raw;
      const { subscriberCount } = raw;
      engagementRaw = likeCount + loveCount + wowCount + hahaCount + sadCount + angryCount + thankfulCount + careCount + commentCount + shareCount;
      engagementNormed = engagementRaw / subscriberCount;
      break;
    }
    case 'instagram': {
      const { statistics: { actual: { favoriteCount, commentCount } } } = raw;
      const { subscriberCount } = raw;
      engagementRaw = favoriteCount + commentCount;
      engagementNormed = engagementRaw / subscriberCount;
      break;
    }
    default:
  }
  
  post.engagementRaw = engagementRaw;
  post.engagementNormed = engagementNormed;
  await next();
};
