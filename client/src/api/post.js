function filtersToBody(filters) {
  const { dates, topic, accounts, platforms } = filters;
  const { curatedOnly, categories, institutions, location } = accounts;
  const body = { dates, platforms };
  if (topic !== 'all') {
    body.topic = topic;
  }
  if (curatedOnly) {
    if (categories !== 'all') {
      body.category = categories;
    }
    if (institutions !== 'all') {
      body.institutions = (institutions === 'institutional');
    }
    if (location !== 'all') {
      body.georgia = (location === 'georgia');
    }
  }
  console.log(body)
  return body;
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
  const res = await fetch('/api/post', options);
  return await res.json();
}