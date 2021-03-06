import axios from 'axios';

export const baseURL = 'http://localhost:1337';
const httpClient = axios.create({
  baseURL: `${baseURL}/`,
  headers: {
    'Content-Type': 'application/json',
    // 'X-Api-Key': '860c5a66910d4013afff61b4a274103b',
  },
});

const get = (url, config = {}) => httpClient.get(url, config);

const post = (url, data) => httpClient
  .post(url, data)
  .then(response => response)
  .catch(error => error);

const put = (url, data) => httpClient
  .put(url, data)
  .then(response => response)
  .catch(error => error);

const patch = (url, data) => httpClient
  .patch(url, data)
  .then(response => response)
  .catch(error => error);

const deleteItem = (url, id) => httpClient
  .delete(url, {
    params: { id },
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
