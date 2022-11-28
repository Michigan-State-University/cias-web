import { useEffect, useState } from 'react';

// Rerenders component every given X milliseconds
const useRefreshComponent = (periodMs: number, pause?: boolean) => {
  const [timeRefresher, setTimeRefresher] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(
      () => !pause && setTimeRefresher((value) => !value),
      periodMs,
    );
    return () => {
      clearTimeout(timeout);
    };
  }, [timeRefresher, periodMs, pause]);
};

export default useRefreshComponent;
