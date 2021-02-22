/* eslint-disable no-param-reassign */
import axios from 'axios';
import { store } from 'configureStore';
import { logOut } from 'global/reducers/auth';
import { headersConst } from 'utils/getHeaders';
import objectToCamelKebabCase from 'utils/objectToCamelKebabCase';
import { previewRegex, guestLogInRegex } from 'global/constants/regex';
import LocalStorageService from './localStorageService';

const { dispatch } = store;

const isGuestRequest = (locationUrl, method, requestUrl) =>
  locationUrl.match(previewRegex) &&
  !(method === 'post' && requestUrl.match(guestLogInRegex));

axios.interceptors.request.use(
  config => {
    config.baseURL = process.env.API_URL;
    const { method, url } = config;
    let headers;
    if (isGuestRequest(window.location.pathname, method, url)) {
      headers = LocalStorageService.getGuestHeaders();
    } else {
      headers = LocalStorageService.getHeaders();
    }
    config.headers = objectToCamelKebabCase({
      ...headers,
      ...config.headers,
    });

    return config;
  },
  error => Promise.reject(error),
);

axios.interceptors.response.use(
  response => {
    const { method, url } = response.config;
    setHeaders(response, isGuestRequest(window.location.pathname, method, url));

    return response;
  },
  error => {
    const { response } = error;
    if (
      response.status === 401 &&
      !response.config.url.endsWith('auth/sign_in')
    )
      dispatch(logOut());
    else
      setHeaders(
        error.response,
        isGuestRequest(
          window.location.pathname,
          response?.config?.method,
          response?.config?.url,
        ),
      );

    return Promise.reject(error);
  },
);

const setHeaders = (response, isPreview) => {
  const kebabCamelCaseHeaders = objectToCamelKebabCase(response.headers);

  const currentHeaders = isPreview
    ? LocalStorageService.getGuestHeaders()
    : LocalStorageService.getHeaders();
  const updatedHeaders = {
    ...headersConst,
    'Access-Token':
      kebabCamelCaseHeaders['Access-Token'] || currentHeaders['Access-Token'],
    Client: kebabCamelCaseHeaders.Client || currentHeaders.Client,
    Uid: kebabCamelCaseHeaders.Uid || currentHeaders.Uid,
  };
  if (isPreview) {
    LocalStorageService.setGuestHeaders(updatedHeaders);
  } else {
    LocalStorageService.setHeaders(updatedHeaders);
  }
};
