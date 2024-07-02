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
  isFetching: false,
};

const fetchingState = {
  data: null,
  error: null,
  isFetching: true,
};

const useGet = <DTO, U>(
  url: string,
  dataParser: (data: DTO) => U,
  suspend?: boolean,
  dependencyArray?: unknown[],
): State<U> => {
  const [state, setState] = useState<State<U>>(defaultState);

  const fetchData = async () => {
    try {
      setState(fetchingState);
      const { data } = await axios.get<DTO>(url);
      setState({ data: dataParser(data), error: null, isFetching: false });
    } catch (error) {
      setState({ data: null, error, isFetching: false });
    }
  };

  useEffect(() => {
    if (url && !suspend) {
      fetchData();
    }
  }, [url, suspend, ...(dependencyArray || [])]);

  return state;
};

export default useGet;
