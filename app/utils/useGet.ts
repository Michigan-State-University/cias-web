import { useState, useEffect } from 'react';
import axios from 'axios';

interface State<T> {
  data: Nullable<T>;
  error: any;
  isFetching: boolean;
}

const defaultState = {
  data: null,
  error: null,
  isFetching: true,
};

const useGet = <T, U>(url: string, dataParser: (data: T) => U): State<U> => {
  const [state, setState] = useState<State<U>>(defaultState);

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
