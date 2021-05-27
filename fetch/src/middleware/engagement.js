module.exports = async function addEngagement(post, next) {
  // TODO add a normalized engagement metric to each post
  await next();
};
