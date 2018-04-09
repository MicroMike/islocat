import fetch from 'isomorphic-fetch';

export const API_URL = (typeof window === 'undefined' || process.env.NODE_ENV === 'test') ?
  process.env.BASE_URL || (`http://localhost:${process.env.PORT || 3000}/api`) :
  '/api';

export default function callApi(endpoint, method = 'get', body) {
  const promise = fetch(`${API_URL}/${endpoint}`, {
    headers: { 'content-type': 'application/json' },
    method,
    body: JSON.stringify(body),
  })
    .then(response => response.json().then(json => ({ json, response })))
    .then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json);
      }

      return json;
    })
    .then(
      response => response,
      error => error
    );

  if (!global.navigator) {
    global.pendingFetch = global.pendingFetch || []
    global.pendingFetch.push(promise)
  }

  return promise
}
