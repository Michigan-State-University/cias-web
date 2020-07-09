import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';

import history from 'utils/history';
import languageProviderReducer from 'containers/LanguageProvider/reducer';

import { alertsReducer } from 'global/reducers/alerts';
import { authReducer } from './global/reducers/auth';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    alerts: alertsReducer,
    auth: authReducer,
    language: languageProviderReducer,
    router: connectRouter(history),
    ...injectedReducers,
  });

  return rootReducer;
}
