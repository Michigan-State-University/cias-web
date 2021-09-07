import { Location } from 'history';

const clearLocationState = (location: Location) => {
  if (location?.state) {
    window.history.replaceState({}, document.title);
  }
};

export default clearLocationState;
