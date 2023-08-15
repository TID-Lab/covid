// @ts-nocheck

const SocialMediaPost = require('../post');

/**
 * A Downstream hook that saves the given social media post to our MongoDB database.
 */
module.exports = async function saveToDatabase(data, next) {
  try {
    const post = new SocialMediaPost(data);
    await post.save();
  } catch (e) {
    console.log("DATABASE SAVE ERROR");
    console.log(e);
  }
  await next();
};
