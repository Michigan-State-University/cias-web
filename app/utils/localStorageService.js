export const HEADERS = 'headers';
export const STATE = 'state';

const LocalStorageService = (() => {
  const setToken = token => {
    if (token && token !== '') {
      const headers = getHeaders();

      localStorage.setItem(
        HEADERS,
        JSON.stringify({ ...headers, 'access-token': token }),
      );
    }
  };

  const setUid = uid => {
    if (uid && uid !== '') {
      const headers = getHeaders();

      localStorage.setItem(HEADERS, JSON.stringify({ ...headers, uid }));
    }
  };

  const getHeaders = () => {
    const headers = localStorage.getItem(HEADERS);
    if (headers) return JSON.parse(headers);

    return {
      'Content-Type': 'application/json; charset=utf-8',
    };
  };

  const setHeaders = headers => {
    localStorage.setItem(HEADERS, JSON.stringify(headers));
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
  };
})();

export default LocalStorageService;
