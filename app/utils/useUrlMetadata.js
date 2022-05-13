import { useEffect, useState } from 'react';
import axios from 'axios';

import objectToCamelCase from 'utils/objectToCamelCase';

export const useUrlMetadata = (url) => {
  const [state, setState] = useState({
    metadata: null,
    error: null,
    isFetching: false,
  });

  const fetchUrlMetadata = async () =>
    axios.get('/v1/show_website_metadata', { params: { url } });

  useEffect(() => {
    if (url) {
      setState({ ...state, isFetching: true });

      fetchUrlMetadata()
        .then(({ data }) => {
          const metadata = objectToCamelCase(data);

          setState({ metadata, error: null, isFetching: false });
        })
        .catch((error) => {
          setState({ metadata: null, error, isFetching: false });
        });
    }
  }, [url]);

  return state;
};
