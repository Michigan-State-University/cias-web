/**
 * A saga can be listed in `global/reducers/intervention/sagas/index.js` and still never run: that
 * module's default export has no importers, and this page injects its own hand-maintained bundle.
 * Only an integration test through the real middleware catches a watcher in the wrong bundle — a
 * saga unit test drives the worker directly, and a component test has no middleware at all.
 */
import { applyMiddleware, combineReducers, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import axios from 'axios';

import interventionDetailsPageSagas from 'containers/InterventionDetailsPage/saga';
import { interventionReducer } from 'global/reducers/intervention/reducer';
import { generateTestLinkRequest } from 'global/reducers/intervention/actions';

jest.mock('axios');

describe('interventionDetailsPageSagas', () => {
  const runStore = () => {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
      combineReducers({ intervention: interventionReducer }),
      applyMiddleware(sagaMiddleware),
    );
    sagaMiddleware.run(interventionDetailsPageSagas);
    return store;
  };

  it('mints a test link when the copy-test-link control dispatches', async () => {
    axios.post.mockResolvedValue({
      data: { data: { attributes: { token: 'TOK', expires_at: null } } },
    });
    const store = runStore();
    const onSuccess = jest.fn();

    store.dispatch(
      generateTestLinkRequest(
        'abc',
        'https://cias.app/i',
        onSuccess,
        jest.fn(),
      ),
    );
    await new Promise((resolve) => {
      setTimeout(resolve, 20);
    });

    expect(axios.post).toHaveBeenCalledWith('/v1/interventions/abc/test_link');
    expect(onSuccess).toHaveBeenCalledWith(
      'https://cias.app/i?test_link_token=TOK',
      null,
    );
    expect(store.getState().intervention.loaders.generateTestLink).toEqual({});
  });
});
