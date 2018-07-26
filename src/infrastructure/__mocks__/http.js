import axios from 'axios';
import cuid from 'cuid';

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

const post = (url, data) => Promise.resolve(data);

http.setMockDB = setMockDB;
http.get = get;
http.post = post;

export default http;
