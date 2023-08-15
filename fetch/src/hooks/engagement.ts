/**
 * A Downstream hook that annotates a given social media post
 * with engagement scores calculated using available metadata.
 */
module.exports = async function addEngagement(post, next) {
  try {
    let engagementRaw = 0;
    let engagementNormed = 0;
  
    const { platform, raw } = post;
  
    switch (platform) {
      case 'twitter': {
        const {
          post: {
            public_metrics: {
              retweet_count,
              reply_count,
              like_count,
              quote_count,
            },
          },
        } = raw;
        const {
          user: {
            public_metrics: { followers_count },
          },
        } = raw;
        engagementRaw = quote_count + reply_count + retweet_count + like_count;
        engagementNormed = engagementRaw / followers_count;
        break;
      }
      case 'facebook': {
        const {
          statistics: {
            actual: {
              likeCount,
              loveCount,
              wowCount,
              hahaCount,
              sadCount,
              angryCount,
              thankfulCount,
              careCount,
              commentCount,
              shareCount,
            },
          },
        } = raw;
        const { subscriberCount } = raw;
        engagementRaw =
          likeCount +
          loveCount +
          wowCount +
          hahaCount +
          sadCount +
          angryCount +
          thankfulCount +
          careCount +
          commentCount +
          shareCount;
        engagementNormed = engagementRaw / subscriberCount;
        break;
      }
      case 'instagram': {
        const {
          statistics: {
            actual: { favoriteCount, commentCount },
          },
        } = raw;
        const { subscriberCount } = raw;
        engagementRaw = favoriteCount + commentCount;
        engagementNormed = engagementRaw / subscriberCount;
        break;
      }
      default:
    }
  
    post.engagementRaw = engagementRaw;
    post.engagementNormed = engagementNormed;
  } catch (e) {
    console.log("ENGAGEMENT HOOK ERROR");
    console.log(e)
  }
  await next();
};
