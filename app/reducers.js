/**
 * Combine all reducers in this file and export the combined reducers.
 */
import { persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { connectRouter } from 'connected-react-router';
import history from 'utils/history';
import languageProviderReducer from 'containers/LanguageProvider/reducer';

import { authReducer } from './global/reducers/auth';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['language', 'auth'],
};

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = persistCombineReducers(persistConfig, {
    auth: authReducer,
    language: languageProviderReducer,
    router: connectRouter(history),
    ...injectedReducers,
  });

  return rootReducer;
}
