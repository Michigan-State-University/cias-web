/* eslint-disable no-param-reassign */
import axios from 'axios';
import get from 'lodash/get';
import { store } from 'configureStore';
import LocalStorageService from './localStorageService';
import { logOut } from '../global/reducers/auth/actions';

const { dispatch } = store;

axios.interceptors.request.use(
  config => {
    config.baseURL = process.env.API_URL;

    const headers = LocalStorageService.getHeaders();
    config.headers = { ...headers, ...config.headers };

    return config;
  },
  error => Promise.reject(error),
);

axios.interceptors.response.use(
  response => {
    if (response.config.url.endsWith('v1/auth/sign_in')) {
      LocalStorageService.setHeaders({
        'Content-Type': 'application/json;charset=utf-8',
        'token-type': 'Bearer',
        'access-token': response.headers['access-token'],
        client: response.headers.client,
        uid: response.headers.uid,
      });
    } else {
      setHeaders(response);
    }

    return response;
  },
  error => {
    if (get(error, 'response.status') === 401) {
      dispatch(logOut());
    } else setHeaders(error.response);

    return Promise.reject(error);
  },
);

const setHeaders = response => {
  LocalStorageService.setToken(response.headers['access-token']);
};
