module.exports = async function addEngagement(post, next) {
  // TODO add a normalized engagement metric to each post
  const engagementRaw = 0;
  const engagementNormed = 0;

  const { platform, raw } = post;
  switch (platform) {
    case 'twitter': {
      break;
    }
    case 'facebook': {
      break;
    }
    case 'instagram': {
      break;
    }
    default:
  }
  
  post.engagementRaw = engagementRaw;
  post.engagementNormed = engagementNormed;
  await next();
};
