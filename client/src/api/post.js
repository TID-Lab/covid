function filtersToBody(filters) {
  const { dates, topic, accounts, platforms } = filters;
  const { curatedOnly, categories, institutions, location } = accounts;
  const body = { platforms };

  const { from:fromString, to:toString } = dates;

  const from = new Date(fromString);
  from.setMinutes(from.getMinutes() + from.getTimezoneOffset());

  const to = new Date(toString);
  to.setMinutes(to.getMinutes() + to.getTimezoneOffset());
  to.setDate(to.getDate() + 1);

  body.dates = { from, to };

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
  return body;
}

export async function getPosts(filters) {
  const body = filtersToBody(filters);
  const options = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }
  const res = await fetch('/api/post', options);
  return await res.json();
}