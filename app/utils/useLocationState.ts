import { useHistory, useLocation } from 'react-router-dom';

export type LocationState<T> = {
  locationState?: T;
  clearLocationState: () => void;
};

const useLocationState = <T>(): LocationState<T> => {
  const { state } = useLocation<T>();
  const { replace } = useHistory<T>();

  const clearLocationState = () => {
    if (state) {
      replace({ state: undefined });
    }
  };

  return { locationState: state, clearLocationState };
};

export default useLocationState;
