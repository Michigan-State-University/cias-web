/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import '@babel/polyfill';
import * as Sentry from '@sentry/react';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import history from 'utils/history';
import { ToastContainer } from 'components/ReactToastify';
import { ScreenClassProvider } from 'react-grid-system';

import smoothscroll from 'smoothscroll-polyfill';

import 'sanitize.css/sanitize.css';

// Import root app
import App from 'containers/App';
import ErrorPage from 'containers/ErrorPage/Loadable';

// Import Language Provider
import LanguageProvider from 'containers/LanguageProvider';

import isNullOrUndefined from 'utils/isNullOrUndefined';

// Load the favicon and the .htaccess file
/* eslint-disable import/no-unresolved, import/extensions */
import '!file-loader?name=[name].[ext]!./assets/images/logo-icon.png';
import 'file-loader?name=.htaccess!./.htaccess';
/* eslint-enable import/no-unresolved, import/extensions */

import { store } from 'configureStore';
import { setAutoFreeze } from 'immer';

// Import i18n messages
import { translationMessages } from 'i18n';
import { polyfillI18n } from 'i18nPolyfill';

import 'utils/axios';

smoothscroll.polyfill();

if (!isNullOrUndefined(process.env.SENTRY_DSN))
  Sentry.init({
    environment: process.env.SENTRY_ENV,
    dsn: process.env.SENTRY_DSN,
    release: `${process.env.SENTRY_ENV}-v${process.env.VERSION}`,
  });

const MOUNT_NODE = document.getElementById('app');

const render = messages => {
  // preserve old Immer behavior (compatibility after update)
  setAutoFreeze(false);

  ReactDOM.render(
    <Provider store={store}>
      <LanguageProvider messages={messages}>
        <ConnectedRouter history={history}>
          <ScreenClassProvider>
            <Sentry.ErrorBoundary fallback={ErrorPage}>
              <ToastContainer />
              <App />
            </Sentry.ErrorBoundary>
          </ScreenClassProvider>
        </ConnectedRouter>
      </LanguageProvider>
    </Provider>,
    MOUNT_NODE,
  );
};

const runAppWithPolyfills = messages => {
  Promise.all([polyfillI18n()])
    .then(() => render(messages))
    .catch(err => {
      throw err;
    });
};

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['./i18nPolyfill.js', './i18n', 'containers/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    runAppWithPolyfills(translationMessages);
  });
}

runAppWithPolyfills(translationMessages);

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  const runtime = require('offline-plugin/runtime'); // eslint-disable-line global-require

  runtime.install({
    onUpdateReady: () => runtime.applyUpdate(), // force update Service Worker (even if existing tabs are open)
    onUpdated: () => window.location.reload(), // reload page into updated version
  });
}
