import LocalStorageService from 'utils/localStorageService';

export const loadState = () => {
  try {
    const state = LocalStorageService.getState();

    if (state === null) {
      return undefined;
    }

    return state;
  } catch (err) {
    return undefined;
  }
};
