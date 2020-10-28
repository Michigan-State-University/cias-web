/**
 * Test LocalStorageService
 */

import LocalStorageService, { STATE, HEADERS } from 'utils/localStorageService';
import { headersConst } from 'utils/getHeaders';

describe('LocalStorageService test', () => {
  const initialState = { test: 'test', name: 'TestName', random: '123' };
  const initialHeaders = {
    'access-token': 'token-123',
    client: 'client-123',
    uid: 'uid-123',
  };

  beforeEach(() => {
    LocalStorageService.setState(initialState);
    LocalStorageService.setHeaders(initialHeaders);
    jest.clearAllMocks();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should set state', () => {
    LocalStorageService.setState(initialState);

    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      STATE,
      JSON.stringify(initialState),
    );
  });

  it('should get state', () => {
    const state = LocalStorageService.getState();

    expect(localStorage.getItem).toHaveBeenCalledTimes(1);
    expect(localStorage.getItem).toHaveBeenCalledWith(STATE);
    expect(state).toStrictEqual(initialState);
  });

  it('should clear state', () => {
    LocalStorageService.clearState();

    expect(localStorage.removeItem).toHaveBeenCalledTimes(1);
    expect(localStorage.removeItem).toHaveBeenCalledWith(STATE);

    const state = LocalStorageService.getState();
    expect(state).toBeNull();
  });

  it('should clear headers', () => {
    const headersBeforeClear = localStorage.getItem(HEADERS);

    LocalStorageService.clearHeaders();

    expect(localStorage.removeItem).toHaveBeenCalledTimes(1);
    expect(localStorage.removeItem).toHaveBeenCalledWith(HEADERS);

    const headersAfterClear = localStorage.getItem(HEADERS);

    expect(headersBeforeClear).not.toBeNull();
    expect(headersAfterClear).toBeNull();
  });

  it('should get headers', () => {
    const headers = LocalStorageService.getHeaders();

    expect(localStorage.getItem).toHaveBeenCalledTimes(1);
    expect(localStorage.getItem).toHaveBeenCalledWith(HEADERS);

    expect(headers).toStrictEqual(initialHeaders);
  });

  it('should get headers and return "Content-Type" when headers are empty', () => {
    LocalStorageService.clearHeaders();

    const headers = LocalStorageService.getHeaders();
    const headersInStorage = localStorage.getItem(HEADERS);

    expect(headersInStorage).toBeNull();
    expect(headers).toStrictEqual({
      'Content-Type': headersConst['Content-Type'],
    });
  });

  it('should set headers', () => {
    LocalStorageService.setHeaders(initialHeaders);

    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      HEADERS,
      JSON.stringify(initialHeaders),
    );
  });

  it('should set token', () => {
    const newToken = 'new-token';
    LocalStorageService.setToken(newToken);

    const { 'access-token': token } = LocalStorageService.getHeaders();

    expect(token).toEqual(newToken);
  });

  it('should set uid', () => {
    const newUid = 'new-uid';
    LocalStorageService.setUid(newUid);

    const { uid } = LocalStorageService.getHeaders();

    expect(uid).toEqual(newUid);
  });

  it('should set token', () => {
    const newToken = 'new-token';
    LocalStorageService.setToken(newToken);

    const { 'access-token': token } = LocalStorageService.getHeaders();

    expect(token).toEqual(newToken);
  });

  it('should update state', () => {
    const newState = { newProperty: 'test' };
    LocalStorageService.updateState(newState);

    const state = LocalStorageService.getState();

    expect(state).toStrictEqual({ ...initialState, ...newState });
  });

  it('should not update state when it does not exist', () => {
    LocalStorageService.clearState();
    const newState = { newProperty: 'test' };
    LocalStorageService.updateState(newState);

    const state = LocalStorageService.getState();

    expect(state).toBeNull();
    expect(localStorage.setItem).not.toHaveBeenCalled();
  });
});
