/* eslint-disable no-param-reassign */
import axios from 'axios';
import { store } from 'configureStore';
import { logOut } from 'global/reducers/auth';
import { headersConst } from 'utils/getHeaders';
import LocalStorageService from './localStorageService';

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
    if (response.config.url.endsWith('auth/sign_in')) {
      LocalStorageService.setHeaders({
        ...headersConst,
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
    const { response } = error;

    if (
      response.status === 401 &&
      !response.config.url.endsWith('auth/sign_in')
    )
      dispatch(logOut());
    else setHeaders(error.response);

    return Promise.reject(error);
  },
);

const setHeaders = response => {
  LocalStorageService.setToken(response.headers['access-token']);
};
