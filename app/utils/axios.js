/* eslint-disable no-param-reassign */
import axios from 'axios';
import { store } from 'configureStore';
import { logOut } from 'global/reducers/auth';
import { headersConst } from 'utils/getHeaders';
import objectToCamelKebabCase from 'utils/objectToCamelKebabCase';
import LocalStorageService from './localStorageService';

const { dispatch } = store;

axios.interceptors.request.use(
  config => {
    config.baseURL = process.env.API_URL;

    const headers = LocalStorageService.getHeaders();
    config.headers = objectToCamelKebabCase({ ...headers, ...config.headers });

    return config;
  },
  error => Promise.reject(error),
);

axios.interceptors.response.use(
  response => {
    setHeaders(response);

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
  const kebabCamelCaseHeaders = objectToCamelKebabCase(response.headers);

  const accessToken = kebabCamelCaseHeaders['Access-Token'];
  const currentHeaders = LocalStorageService.getHeaders();

  LocalStorageService.setHeaders({
    ...headersConst,
    'Access-Token': accessToken || currentHeaders['Access-Token'],
    Client: kebabCamelCaseHeaders.Client || currentHeaders.Client,
    Uid: kebabCamelCaseHeaders.Uid || currentHeaders.Uid,
  });
};
