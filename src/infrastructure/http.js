import 'cross-fetch/polyfill';

const baseSettings = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  mode: 'cors',
  cache: 'default',
  credentials: 'omit',
};

const GetInit = {
  method: 'GET',
};

export const get = url =>
  fetch(url, GetInit).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(`${response.status}: ${response.statusText}`);
  });

const PostInit = payload => ({
  ...baseSettings,
  method: 'POST',
  body: JSON.stringify(payload),
});

export const post = (url, payload = {}) => {
  fetch(url, PostInit(payload)).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(`${response.status}: ${response.statusText}`);
  });
};

const PutInit = payload => ({
  ...baseSettings,
  method: 'PUT',
  body: JSON.stringify(payload),
});

export const put = (url, payload = {}) => {
  fetch(url, PutInit(payload)).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(`${response.status}: ${response.statusText}`);
  });
};

const DeleteInit = {
  ...baseSettings,
  method: 'DELETE',
};

export const remove = (url) => {
  fetch(url, DeleteInit).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(`${response.status}: ${response.statusText}`);
  });
};
