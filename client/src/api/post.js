import notify from '../util/notify';

function filtersToBody(filters) {
  const { dates, topic, sources, platforms } = filters;
  const topics = (topic === 'all') ? [] : [ topic ];
  return {
    dates,
    topics,
    sourceFilters: sources,
    platforms: platforms
  }
}

export async function getPosts(filters) {
  const body = filtersToBody(filters);
  const options = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }
    try {
        const res = await fetch('/api/post', options);
        return await res.json();
    } catch (e) {
        console.log(e);
        notify('An error occurred.');
    }
}