export const HEADERS = 'headers';
export const GUEST_HEADERS = 'guest-headers';
export const STATE = 'state';

const LocalStorageService = (() => {
  const setToken = token => {
    if (token && token !== '') {
      const headers = getHeaders();

      localStorage.setItem(
        HEADERS,
        JSON.stringify({ ...headers, 'Access-Token': token }),
      );
    }
  };

  const setUid = uid => {
    if (uid && uid !== '') {
      const headers = getHeaders();

      localStorage.setItem(HEADERS, JSON.stringify({ ...headers, Uid: uid }));
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

  const setHeaders = headers => {
    localStorage.setItem(HEADERS, JSON.stringify(headers));
  };

  const setGuestHeaders = headers => {
    localStorage.setItem(GUEST_HEADERS, JSON.stringify(headers));
  };

  const clearGuestHeaders = () => {
    localStorage.removeItem(GUEST_HEADERS);
  };

  const clearHeaders = () => {
    localStorage.removeItem(HEADERS);
  };

  const setState = state => {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(STATE, serializedState);
  };

  const clearState = () => {
    localStorage.removeItem(STATE);
  };

  const getState = () => {
    const serializedState = localStorage.getItem(STATE);

    if (serializedState) return JSON.parse(serializedState);

    return null;
  };

  const updateState = newState => {
    const state = getState();

    if (state) return setState({ ...state, ...newState });

    return null;
  };

  const setItem = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const removeItem = key => {
    localStorage.removeItem(key);
  };

  const getItem = key => {
    const item = localStorage.getItem(key);

    if (item) return JSON.parse(item);
    return null;
  };

  const updateItem = (key, value) => {
    const item = getItem(key);

    if (item) setItem(key, { ...item, ...value });
    else setItem(key, value);
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
  };
})();

export default LocalStorageService;
