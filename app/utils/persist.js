import LocalStorageService from 'utils/localStorageService';

export const loadState = () => {
  try {
    const serializedState = LocalStorageService.getState();

    if (serializedState === null) {
      return undefined;
    }

    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};
