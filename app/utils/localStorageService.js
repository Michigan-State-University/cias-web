const LocalStorageService = (() => {
  const setToken = token => {
    if (token && token !== '') {
      const headers = localStorage.getItem('headers');

      localStorage.setItem('headers', JSON.stringify({ ...headers, token }));
    }
  };

  const getHeaders = () => {
    const headers = localStorage.getItem('headers');
    if (headers) return JSON.parse(headers);

    return {
      'Content-Type': 'application/json; charset=utf-8',
    };
  };

  const setHeaders = headers => {
    localStorage.setItem('headers', JSON.stringify(headers));
  };

  const clearHeaders = () => {
    localStorage.removeItem('headers');
  };
  return {
    setToken,
    setHeaders,
    getHeaders,
    clearHeaders,
  };
})();

export default LocalStorageService;
