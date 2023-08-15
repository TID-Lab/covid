// @ts-nocheck

/**
 * A Downstream hook that saves the given social media post to our MongoDB database.
 */
module.exports = async function log(data, next) {
  console.log(data)
  await next();
};
