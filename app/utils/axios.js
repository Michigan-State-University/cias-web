/* eslint-disable no-param-reassign */
import axios from 'axios';
import { push } from 'connected-react-router';

import { store } from 'configureStore';
import { headersConst } from 'utils/getHeaders';
import objectToCamelKebabCase from 'utils/objectToCamelKebabCase';
import { logOut, REDIRECT_QUERY_KEY } from 'global/reducers/auth';
import { previewRegex, guestLogInRegex } from 'global/constants/regex';

import LocalStorageService from './localStorageService';
import { HttpMethods, HttpStatusCodes } from './constants';
import { responseMethodEquals, responseStatusEquals } from './axiosUtils';

const { dispatch } = store;

const isGuestRequest = (locationUrl, method, requestUrl) =>
  locationUrl.match(previewRegex) &&
  !(method === 'post' && requestUrl.match(guestLogInRegex));

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
    if (
      responseStatusEquals(response, HttpStatusCodes.UNAUTHORIZED) &&
      !response.config.url.endsWith('auth/sign_in')
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

      dispatch(push(`/no-access?${queryParams.toString()}`));
    } else if (
      responseStatusEquals(response.status, HttpStatusCodes.NOT_FOUND) &&
      responseMethodEquals(response, HttpMethods.GET)
    )
      dispatch(push('/not-found-page'));
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
