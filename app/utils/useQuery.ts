import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

const useQuery = (name: string): Nullable<string> => {
  const { search } = useLocation();
  const initialQuery = new URLSearchParams(search).get(name);
  const [query, setQuery] = useState<Nullable<string>>(initialQuery);

  useEffect(() => {
    const queries = new URLSearchParams(search);
    setQuery(queries.get(name));
  }, [search, name]);

  return query;
};

export default useQuery;
