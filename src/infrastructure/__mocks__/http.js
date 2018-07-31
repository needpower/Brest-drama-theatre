import axios from 'axios';
import _ from 'lodash';

// automatic mock
jest.mock('axios');

const http = jest.genMockFromModule('../http');

let mockDB = [];
// This is a custom function that our tests can use during setup to specify
// what data in DB is exists when any of http methods are used (get, post, pu, etc.)
const setMockDB = (mockData = []) => {
  mockDB = [...mockData];
};

const get = (url, config) => {
  const payloadIDs = config.params.ids;

  if (!(payloadIDs && payloadIDs.length)) {
    return Promise.resolve(mockDB);
  }

  return Promise.resolve(mockDB.filter(mockItem => payloadIDs.includes(mockItem.id)));
};

const post = (url, data) => {
  mockDB.push(data);
  return Promise.resolve(data);
};

const patch = (url, data) => {
  const source = _.find(mockDB, { id: data.id });
  if (!source) {
    return Promise.reject(new Error('Source item not found'));
  }

  const patchedSource = {
    ...source,
    ...data,
  };

  return Promise.resolve(patchedSource);
};

const deleteItem = (url, id) => {
  const deletedItem = _.remove(mockDB, item => item.id === id);
  return Promise.resolve(deletedItem.pop());
};

http.setMockDB = setMockDB;
http.get = get;
http.post = post;
http.patch = patch;
http.deleteItem = deleteItem;

export default http;
