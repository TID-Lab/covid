const SocialMediaPost = require('../post');

module.exports = async function saveToDatabase(data, next) {
  const post = new SocialMediaPost(data);
  await post.save();
  await next();
};
