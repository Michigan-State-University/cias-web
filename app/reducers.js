/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { connectRouter } from 'connected-react-router';
import { persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import history from 'utils/history';
import languageProviderReducer from 'containers/LanguageProvider/reducer';

const persistConfig = {
  key: 'root',
  storage,
};
/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = persistCombineReducers(persistConfig, {
    language: languageProviderReducer,
    router: connectRouter(history),
    ...injectedReducers,
  });

  return rootReducer;
}
