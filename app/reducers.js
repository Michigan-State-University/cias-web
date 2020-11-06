import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';

import history from 'utils/history';
import languageProviderReducer from 'containers/LanguageProvider/reducer';

import { authReducer } from 'global/reducers/auth';
import { globalStateReducer } from 'global/reducers/globalState';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    auth: authReducer,
    language: languageProviderReducer,
    router: connectRouter(history),
    global: globalStateReducer,
    ...injectedReducers,
  });

  return rootReducer;
}
