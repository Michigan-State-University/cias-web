import { writeStorage, deleteFromStorage } from '@rehooks/local-storage';

export const HEADERS = 'headers';
export const GUEST_HEADERS = 'guest-headers';
export const STATE = 'state';

const LocalStorageService = (() => {
  const setToken = (token) => {
    if (token && token !== '') {
      const headers = getHeaders();

      writeStorage(HEADERS, { ...headers, 'Access-Token': token });
    }
  };

  const setUid = (uid) => {
    if (uid && uid !== '') {
      const headers = getHeaders();

      writeStorage(HEADERS, { ...headers, Uid: uid });
    }
  };

  const getHeaders = () => {
    const headers = localStorage.getItem(HEADERS);
    if (headers) return JSON.parse(headers);

    return {
      'Content-Type': 'application/json; charset=utf-8',
    };
  };

  const getGuestHeaders = () => {
    const headers = localStorage.getItem(GUEST_HEADERS);
    if (headers) return JSON.parse(headers);

    return {
      'Content-Type': 'application/json; charset=utf-8',
    };
  };

  const setHeaders = (headers) => {
    writeStorage(HEADERS, headers);
  };

  const setGuestHeaders = (headers) => {
    writeStorage(GUEST_HEADERS, headers);
  };

  const clearGuestHeaders = () => {
    deleteFromStorage(GUEST_HEADERS);
  };

  const clearHeaders = () => {
    deleteFromStorage(HEADERS);
  };

  const setState = (state) => {
    writeStorage(STATE, state);
  };

  const clearState = () => {
    deleteFromStorage(STATE);
  };

  const getState = () => {
    const serializedState = localStorage.getItem(STATE);

    if (serializedState) return JSON.parse(serializedState);

    return null;
  };

  const updateState = (newState) => {
    const state = getState();

    if (state) return setState({ ...state, ...newState });

    return null;
  };

  const setItem = (key, value) => {
    writeStorage(key, value);
  };

  const removeItem = (key) => {
    deleteFromStorage(key);
  };

  const getItem = (key) => {
    const item = localStorage.getItem(key);

    if (item) return JSON.parse(item);
    return null;
  };

  const updateItem = (key, value) => {
    const item = getItem(key);

    if (item) setItem(key, { ...item, ...value });
    else setItem(key, value);
  };

  const clearUserData = () => {
    clearHeaders();
    clearState();
    clearGuestHeaders();
  };

  return {
    setToken,
    setUid,
    setHeaders,
    getHeaders,
    clearHeaders,
    setState,
    clearState,
    getState,
    updateState,
    clearGuestHeaders,
    setGuestHeaders,
    getGuestHeaders,
    setItem,
    removeItem,
    getItem,
    updateItem,
    clearUserData,
  };
})();

export default LocalStorageService;
