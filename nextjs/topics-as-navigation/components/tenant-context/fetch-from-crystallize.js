async function simplyFetchFromAPI({ uri, query, variables }) {
  const body = JSON.stringify({ query, variables });
  const response = await fetch(uri, {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body,
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }
  return response.json();
}

function createFetch(uri) {
  return (args) => simplyFetchFromAPI({ uri, ...args });
}

export function createFetchers(identifier) {
  return {
    catalogue: createFetch(
      `https://api-dev.crystallize.digital/${identifier}/catalogue`
    ),
    search: createFetch(
      `https://api-dev.crystallize.digital/${identifier}/search`
    ),
  };
}
