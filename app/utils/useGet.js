import { useState, useEffect } from 'react';
import axios from 'axios';

const defaultState = {
  data: null,
  error: null,
  isFetching: true,
};

const useGet = (url, dataParser) => {
  const [state, setState] = useState(defaultState);

  const fetchData = async () => {
    try {
      setState(defaultState);

      const { data } = await axios.get(url);

      const formattedData = dataParser ? dataParser(data) : data;
      setState({ data: formattedData, error: null, isFetching: false });
    } catch (error) {
      setState({ data: null, error, isFetching: false });
    }
  };

  useEffect(() => {
    if (url) {
      fetchData();
    }
  }, [url]);

  return state;
};

export default useGet;
