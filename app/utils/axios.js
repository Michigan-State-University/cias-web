/* eslint-disable no-param-reassign */
import axios from 'axios';
import { push } from 'connected-react-router';
import axiosRetry from 'axios-retry';

import { store } from 'configureStore';
import { headersConst } from 'utils/getHeaders';
import objectToCamelKebabCase from 'utils/objectToCamelKebabCase';
import { logOut, REDIRECT_QUERY_KEY } from 'global/reducers/auth';
import { previewRegex, guestLogInRegex } from 'global/constants/regex';

import LocalStorageService from './localStorageService';
import { HttpMethods, HttpStatusCodes } from './constants';
import { responseMethodEquals, responseStatusEquals } from './axiosUtils';
import { RoutePath } from '../global/constants';

/**
 * by default it retries when error does not have a response (ex. status 5xx)
 * redux ERROR action is dispatched only after all retries fail (dispatched only once)
 */
axiosRetry(axios, {
  // number of retries
  retries: 3,
  // time interval between retries; incremental by 250ms
  retryDelay: (retryCount) => retryCount * 250,
});

const { dispatch } = store;

const isGuestRequest = (locationUrl, method, requestUrl) =>
  !!locationUrl.match(previewRegex) &&
  !(method === 'post' && !!requestUrl.match(guestLogInRegex));

axios.interceptors.request.use(
  (config) => {
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
  (error) => Promise.reject(error),
);

axios.interceptors.response.use(
  (response) => {
    const { method, url } = response.config;
    setHeaders(response, isGuestRequest(window.location.pathname, method, url));

    return response;
  },
  (error) => {
    const { response } = error;

    if (!response) return Promise.reject(error);

    const requestUrl = response.config.url;

    if (
      responseStatusEquals(response, HttpStatusCodes.UNAUTHORIZED) &&
      !requestUrl.endsWith('auth/sign_in') &&
      !requestUrl.endsWith('verify_user_key')
    ) {
      dispatch(logOut(window.location.pathname));
    } else if (
      responseStatusEquals(response, HttpStatusCodes.FORBIDDEN) &&
      responseMethodEquals(response, HttpMethods.GET)
    ) {
      const queryParams = new URLSearchParams(window.location.search);

      queryParams.append(
        REDIRECT_QUERY_KEY,
        encodeURIComponent(window.location.pathname),
      );

      dispatch(push(`${RoutePath.FORBIDDEN}?${queryParams.toString()}`));
    } else if (
      responseStatusEquals(response.status, HttpStatusCodes.NOT_FOUND) &&
      responseMethodEquals(response, HttpMethods.GET)
    )
      dispatch(push(RoutePath.NOT_FOUND));
    else
      setHeaders(
        error.response,
        isGuestRequest(
          window.location.pathname,
          response?.config?.method,
          requestUrl,
        ),
      );

    return Promise.reject(error);
  },
);

const setHeaders = (response, isPreview) => {
  const responseHeaders = objectToCamelKebabCase(response.headers);
  const currentHeaders = isPreview
    ? LocalStorageService.getGuestHeaders()
    : LocalStorageService.getHeaders();

  const updatedHeaders = {
    ...headersConst,
    'Access-Token':
      responseHeaders['Access-Token']?.trim() || currentHeaders['Access-Token'],
    Client: responseHeaders.Client?.trim() || currentHeaders.Client,
    Uid: responseHeaders.Uid?.trim() || currentHeaders.Uid,
  };

  if (isPreview) {
    LocalStorageService.setGuestHeaders(updatedHeaders);
  } else {
    LocalStorageService.setHeaders(updatedHeaders);
  }
};
