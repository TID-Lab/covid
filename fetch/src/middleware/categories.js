const { crowdtangleLists } = require('../workers');

module.exports = async function addCategory(post, next) {
  const categories = [];
  const { platform, raw } = post;
  switch (platform) {
    case 'twitter': {
      const { matchingRules } = raw;
      for (let i = 0; i < matchingRules.length; i += 1) {
        const { tag } = matchingRules[i];
        categories.push(tag);
      }
    }
      break;
    case 'facebook':
    case 'instagram': {
      if (
        typeof crowdtangleLists !== 'object'
        || Object.keys(crowdtangleLists).length !== 2) {
        break;
      }

      const { account: { id } } = raw;
      const platformLists = crowdtangleLists[platform];
      const listKeys = Object.keys(platformLists);
      for (let i = 0; i < listKeys.length; i += 1) {
        const listKey = listKeys[i];
        const list = platformLists[listKey];
        if (list.includes(id)) {
          categories.push(listKey);
        }
      }
      break;
    }
    default:
  }
  post.categories = categories;
  await next();
};
