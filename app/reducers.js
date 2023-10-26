import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';

import history from 'utils/history';
import appLanguageProviderReducer from 'containers/AppLanguageProvider/reducer';

import { authReducer } from 'global/reducers/auth/reducer';
import { RESET_REDUCER } from 'global/reducers/auth/constants';
import { globalStateReducer } from 'global/reducers/globalState/reducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = (state, action) => {
    switch (action.type) {
      case RESET_REDUCER:
        return appReducer(true)(undefined, action);
      default:
        return appReducer()(state, action);
    }
  };

  const appReducer = (reset = false) =>
    combineReducers({
      auth: authReducer,
      language: appLanguageProviderReducer,
      router: connectRouter(history),
      global: globalStateReducer,
      ...(reset ? {} : injectedReducers),
    });

  return rootReducer;
}
