import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

const useQuery = (name: string): Nullable<string> => {
  const [query, setQuery] = useState<Nullable<string>>(null);

  const { search } = useLocation();

  useEffect(() => {
    const queries = new URLSearchParams(search);
    setQuery(queries.get(name));
  }, [search, name]);

  return query;
};

export default useQuery;
