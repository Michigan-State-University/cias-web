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
import LogRocket from 'logrocket';
import setupLogRocketReact from 'logrocket-react';
import LogrocketFuzzySanitizer from 'logrocket-fuzzy-search-sanitizer';

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
import '!./assets/images/logo-icon.png?file-loader';
import './.htaccess?file-loader';
/* eslint-enable import/no-unresolved, import/extensions */

import { store } from 'configureStore';
import { setAutoFreeze } from 'immer';

// Import i18n messages
import { translationMessages } from 'i18n';
import { polyfillI18n } from 'i18nPolyfill';

import { SocketProvider } from 'components/ActionCable';
import { NotificationsActionsProvider } from 'containers/NotificationsActionsProvider';

import 'utils/axios';
import { configureDayjs } from './utils/dayjs';

smoothscroll.polyfill();

if (!isNullOrUndefined(process.env.SENTRY_DSN))
  Sentry.init({
    environment: process.env.SENTRY_ENV,
    dsn: process.env.SENTRY_DSN,
    release: `${process.env.SENTRY_ENV}-v${process.env.VERSION}`,
  });

const sanitizeUrl = (url: string) => {
  const newUrl = new URL(url);
  const { searchParams } = newUrl;
  Array.from(searchParams.keys()).forEach((searchParamsKey) =>
    searchParams.set(searchParamsKey, '*'),
  );
  newUrl.search = searchParams.toString();
  return newUrl.toString();
};

if (process.env.LOGROCKET_ENV) {
  const privateFieldNames = [
    'password',
    'Access-Token',
    'access-token',
    'first_name',
    'last_name',
    'phone',
    'full_name',
    'current_password',
    'password_confirmation',
    'token',
    'verification_code',
    'email',
    'iso',
    'prefix',
    'avatar_url',
    'id',
    'uid',
  ];

  const { requestSanitizer, responseSanitizer } =
    LogrocketFuzzySanitizer.setup(privateFieldNames);

  setupLogRocketReact(LogRocket);
  LogRocket.init(process.env.LOGROCKET_ENV, {
    shouldCaptureIP: false,
    network: {
      requestSanitizer: (request) => {
        const modRequest = requestSanitizer(request as any);

        if (modRequest.headers['Access-Token']) {
          modRequest.headers['Access-Token'] = '*';
        }

        if (modRequest.headers['Verification-Code']) {
          modRequest.headers['Verification-Code'] = '*';
        }

        if (modRequest.headers.Uid) {
          modRequest.headers.Uid = '*';
        }

        if (modRequest.url) {
          modRequest.url = sanitizeUrl(modRequest.url);
        }

        return modRequest;
      },
      responseSanitizer: (response) => {
        const modResponse = responseSanitizer(response as any);

        if (modResponse.headers['access-token']) {
          modResponse.headers['access-token'] = '*';
        }

        if (modResponse.headers.uid) {
          modResponse.headers.uid = '*';
        }

        if (modResponse.url) {
          modResponse.url = sanitizeUrl(modResponse.url);
        }

        return modResponse;
      },
    },
    browser: {
      urlSanitizer: sanitizeUrl,
    },
    dom: {
      // dont record any inputs
      inputSanitizer: true,
    },
  });

  // Add custom param to Sentry to easily identify corresponding session in Logrocket
  LogRocket.getSessionURL((sessionURL) => {
    Sentry.configureScope((scope) => {
      scope.setExtra('sessionURL', sessionURL);
    });
  });
}

const MOUNT_NODE = document.getElementById('app') || document.body;

configureDayjs();

const render = (messages: any) => {
  // preserve old Immer behavior (compatibility after update)
  setAutoFreeze(false);

  ReactDOM.render(
    <Provider store={store}>
      <LanguageProvider messages={messages}>
        <ConnectedRouter history={history}>
          <ScreenClassProvider>
            <Sentry.ErrorBoundary fallback={ErrorPage}>
              <SocketProvider>
                <NotificationsActionsProvider>
                  <ToastContainer />
                  <App />
                </NotificationsActionsProvider>
              </SocketProvider>
            </Sentry.ErrorBoundary>
          </ScreenClassProvider>
        </ConnectedRouter>
      </LanguageProvider>
    </Provider>,
    MOUNT_NODE,
  );
};

const runAppWithPolyfills = (messages: any) => {
  Promise.all([polyfillI18n()])
    .then(() => render(messages))
    .catch((err) => {
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
