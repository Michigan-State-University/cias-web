import { useEffect, useState } from 'react';

// Rerenders component every given X milliseconds
const useRefreshComponent = (periodMs: number) => {
  const [timeRefresher, setTimeRefresher] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(
      () => setTimeRefresher((value) => !value),
      periodMs,
    );
    return () => {
      clearTimeout(timeout);
    };
  }, [timeRefresher]);
};

export default useRefreshComponent;
