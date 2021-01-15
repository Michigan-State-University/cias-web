/**
 * Test axios interceptors
 */

import axios from 'axios';
import 'utils/axios';

import { store } from 'configureStore';
import LocalStorageService from 'utils/localStorageService';
import { headersConst } from 'utils/getHeaders';
import { logOut } from 'global/reducers/auth';

jest.mock('utils/localStorageService');
jest.mock('global/reducers/auth/actions');
jest.mock('configureStore');

describe('axios request test', () => {
  it('should invoke getHeaders and return headers', async () => {
    LocalStorageService.getHeaders.mockImplementationOnce(() => ({
      test: 'test',
    }));
    const getHeadersSpy = jest.spyOn(LocalStorageService, 'getHeaders');

    const expected = { headers: { test: 'test' } };

    const result = await axios.interceptors.request.handlers[0].fulfilled({});

    expect(getHeadersSpy).toHaveBeenCalledTimes(1);
    expect(result).toMatchObject(expected);
  });

  it('should return error on rejected', async () => {
    const expected = {
      response: {
        statusText: 'NotFound',
        status: 404,
        data: { message: 'Page not found' },
      },
    };

    const rejectSpy = jest.spyOn(
      axios.interceptors.request.handlers[0],
      'rejected',
    );

    await axios.interceptors.request.handlers[0]
      .rejected(expected)
      .catch(error => {
        expect(error).toStrictEqual(expected);
      });

    expect(rejectSpy).toHaveBeenCalledTimes(1);
  });
});

describe('axios response test', () => {
  beforeAll(() => {
    LocalStorageService.setToken.mockImplementation(jest.fn);
    LocalStorageService.setHeaders.mockImplementation(jest.fn);
    logOut.mockImplementation(jest.fn);
    store.dispatch.mockImplementation(jest.fn);
  });

  const headers = {
    ...headersConst,
    'access-token': '123',
    client: '123',
    uid: '123',
  };

  it('should invoke setToken with "access-token" and return response when url is different than "sign_in"', async () => {
    const response200 = {
      response: {
        statusText: 'OK',
        status: 200,
      },
      headers,
      config: {
        url: 'test',
      },
    };

    const result = await axios.interceptors.response.handlers[0].fulfilled(
      response200,
    );

    expect(LocalStorageService.setToken).toHaveBeenCalledTimes(1);
    expect(LocalStorageService.setToken).toHaveBeenCalledWith(
      response200.headers['access-token'],
    );
    expect(result).toStrictEqual(response200);
  });

  it('should invoke setHeaders with all headers and return response when url is "sign_in"', async () => {
    const responseSignIn = {
      response: {
        statusText: 'OK',
        status: 200,
      },
      headers,
      config: {
        url: 'auth/sign_in',
      },
    };

    const result = await axios.interceptors.response.handlers[0].fulfilled(
      responseSignIn,
    );

    expect(LocalStorageService.setHeaders).toHaveBeenCalledTimes(1);
    expect(LocalStorageService.setHeaders).toHaveBeenCalledWith(
      responseSignIn.headers,
    );
    expect(result).toStrictEqual(responseSignIn);
  });

  it('should invoke setToken and not logout on error when status is different than 401', async () => {
    const response422 = {
      status: 422,
      response: {
        statusText: 'UnprocessableEntity',
      },
      headers,
    };

    await axios.interceptors.response.handlers[0]
      .rejected({ response: response422 })
      .catch(error => error);

    expect(LocalStorageService.setToken).toHaveBeenCalledTimes(1);
    expect(LocalStorageService.setToken).toHaveBeenCalledWith(
      response422.headers['access-token'],
    );
    expect(logOut).not.toHaveBeenCalled();
  });

  it('should invoke logout and not setToken on error when status is 401', async () => {
    const response401 = {
      status: 401,
      response: {
        statusText: 'Unauthorized',
      },
      config: {
        url: 'test',
      },
      headers,
    };

    await axios.interceptors.response.handlers[0]
      .rejected({ response: response401 })
      .catch(error => error);

    expect(LocalStorageService.setToken).not.toHaveBeenCalled();
    expect(logOut).toHaveBeenCalledTimes(1);
  });
});
