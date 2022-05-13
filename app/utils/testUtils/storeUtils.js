import { createStore } from 'redux';
import createReducer from 'reducers';
import { initialState as authReducerInitialState } from 'global/reducers/auth/reducer';

export const createTestStore = (initialState) => {
  const reducer = (state) => state;

  const store = createStore(reducer, {
    auth: authReducerInitialState,
    ...initialState,
  });

  store.runSaga = () => {};
  store.injectedReducers = {};
  store.injectedSagas = {};
  store.createReducer = createReducer;

  return store;
};
