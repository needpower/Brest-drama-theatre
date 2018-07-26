import axios from 'axios';

const httpClient = axios.create({
  baseURL: 'http://mock.io/',
  headers: {
    'Content-Type': 'application/json',
  },
});

const get = (url, config) => httpClient.get(url, config).then(response => response);

const post = (url, data) =>
  httpClient
    .post(url, data)
    .then(response => response)
    .catch(error => error);

const put = (url, data) =>
  httpClient
    .put(url, data)
    .then(response => response)
    .catch(error => error);

const patch = (url, data) =>
  httpClient
    .patch(url, data)
    .then(response => response)
    .catch(error => error);

const deleteItem = (url, id) =>
  httpClient
    .delete(url, {
      params: id,
    })
    .then(response => response)
    .catch(error => error);

export default {
  get,
  post,
  put,
  patch,
  deleteItem,
};
