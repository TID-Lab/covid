// @ts-nocheck
const { getCrowdTangleLists } = require('../workers');

/**
 * A Downstream hook that annotates a social media post
 * with labels that correspond to sets of authors, like "Georgia" authors.
 */
module.exports = async function addLabels(post, next) {
  try {
    const labels = [];
    const { platform, raw } = post;
    switch (platform) {
      case 'twitter': {
        const { matchingRules } = raw;
        for (let i = 0; i < matchingRules.length; i += 1) {
          const { tag } = matchingRules[i];
          labels.push(tag);
        }
        break;
      }
      case 'facebook':
      case 'instagram': {
        const crowdtangleLists = getCrowdTangleLists();
        if (
          typeof crowdtangleLists !== 'object' ||
          Object.keys(crowdtangleLists).length !== 2
        ) {
          break;
        }

        const {
          account: { id },
        } = raw;
        const platformLists = crowdtangleLists[platform];
        const listKeys = Object.keys(platformLists);
        for (let i = 0; i < listKeys.length; i += 1) {
          const listKey = listKeys[i];
          const list = platformLists[listKey];
          if (list.includes(id)) {
            labels.push(listKey);
          }
        }
        break;
      }
      default:
    }
    post.labels = labels;
  } catch (e) {
    console.log("LABELS HOOK ERROR");
    console.log(e)
  }
  await next();
};
