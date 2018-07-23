import axios from 'axios';

const httpClient = axios.create({
  baseURL: 'http://mock.io/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const get = url => httpClient.get(url).then(response => response);

export const post = (url, data) =>
  httpClient
    .post(url, data)
    .then(response => response)
    .catch(error => error);

export const put = (url, data) =>
  httpClient
    .put(url, data)
    .then(response => response)
    .catch(error => error);

export const patch = (url, data) =>
  httpClient
    .patch(url, data)
    .then(response => response)
    .catch(error => error);

export const deleteItem = (url, id) =>
  httpClient
    .delete(url, {
      params: id,
    })
    .then(response => response)
    .catch(error => error);
