const AhoCorasick = require('aho-corasick-node');

const { COVID_TOPICS } = require('../../../constants');

function assembleAutomatons() {
  const automatons = {};
  const topics = Object.keys(COVID_TOPICS);
  for (let i = 0; i < topics.length; i += 1) {
    const topic = topics[i];
    const keywords = COVID_TOPICS[topic];
    const builder = AhoCorasick.builder();
    keywords.forEach((k) => builder.add(k.toLowerCase()));
    const automaton = builder.build();
    automatons[topic] = automaton;
  }
  return automatons;
}

const automatons = assembleAutomatons();
const topics = Object.keys(automatons);

module.exports = async function addTopics(post, next) {
  const matchedTopics = [];

  // The string fields to search through
  const searchables = [
    post.content,
  ];

  for (let i = 0; i < topics.length; i += 1) {
    const topic = topics[i];
    const automaton = automatons[topic];
    for (let j = 0; j < searchables.length; j += 1) {
      const string = searchables[j].toLowerCase();
      const hits = automaton.match(string);
      if (hits.length > 0 && hits[0] !== '') matchedTopics.push(topic);
    }
  }

  post.topics = matchedTopics;
  await next();
};
