/* eslint-disable no-param-reassign */
import axios from 'axios';
import { store } from 'configureStore';
import LocalStorageService from './localStorageService';
import { logOut } from '../global/reducers/auth/actions';

const { dispatch } = store;

axios.interceptors.request.use(
  config => {
    config.baseURL = process.env.API_URL;
    console.log(process.env.API_URL);

    const headers = LocalStorageService.getHeaders();
    config.headers = headers;

    return config;
  },
  error => Promise.reject(error),
);

axios.interceptors.response.use(
  response => {
    if (response.config.url.endsWith('auth/sign_in')) {
      LocalStorageService.setHeaders({
        'Content-Type': 'application/json;charset=utf-8',
        'token-type': 'Bearer',
        'access-token': response.headers['access-token'],
        client: response.headers.client,
        uid: response.headers.uid,
      });
    } else {
      LocalStorageService.setToken(response.headers['access-token']);
    }

    return response;
  },
  error => {
    if (error.response.status === 401) {
      LocalStorageService.clearHeaders();

      dispatch(logOut());
    }

    return Promise.reject(error);
  },
);
