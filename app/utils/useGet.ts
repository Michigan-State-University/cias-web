import { useState, useEffect } from 'react';
import axios from 'axios';

import { ApiData } from 'global/types/api';

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

const useGet = <DTO, U>(
  url: string,
  dataParser: (data: ApiData<DTO>) => U,
): State<U> => {
  const [state, setState] = useState<State<U>>(defaultState);

  const fetchData = async () => {
    try {
      setState(defaultState);
      const { data } = await axios.get<ApiData<DTO>>(url);
      setState({ data: dataParser(data), error: null, isFetching: false });
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
