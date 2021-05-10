import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useIdleTimer } from 'react-idle-timer';
import axios from 'axios';
import { useIntl } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { toast } from 'react-toastify';

import {
  logOut as logOutAction,
  LOG_OUT,
  makeSelectUser,
} from 'global/reducers/auth';

import messages from './messages';
import { TIME_TO_LOGOUT } from './constants';

const IdleTimer = ({ logOut, user }) => {
  const { formatMessage } = useIntl();

  const isUserLogged = useMemo(() => Boolean(user), [user]);

  const handleOnIdle = () => {
    logOut();
    toast.warn(formatMessage(messages.logoutMessage), {
      autoClose: false,
      toastId: LOG_OUT,
    });
  };

  const handleOnActive = () => {
    toast.dismiss(LOG_OUT);
  };

  const requestInterceptor = config => {
    reset();

    return config;
  };

  const responseInterceptor = response => {
    reset();

    return response;
  };

  const interceptorError = error => {
    // Handle case when user is logged out earlier than error interceptor kicks in
    if (isUserLogged) reset();

    Promise.reject(error);
  };

  const { reset, pause } = useIdleTimer({
    crossTab: { emitOnAllTabs: true },
    timeout: TIME_TO_LOGOUT,
    onIdle: handleOnIdle,
    onActive: handleOnActive,
    startManually: true,
    events: [],
  });

  /**
   * Logic:
   * - user is not logged -> do nothing
   * - user is logged/logs -> add interceptor and reset timer
   * - user logs out -> remove interceptor and pause timer
   */
  useEffect(() => {
    if (isUserLogged) {
      const requestInterceptorInstance = axios.interceptors.request.use(
        requestInterceptor,
        null,
      );

      const responseInterceptorInstance = axios.interceptors.response.use(
        responseInterceptor,
        interceptorError,
      );

      reset();

      return () => {
        axios.interceptors.request.eject(requestInterceptorInstance);
        axios.interceptors.response.eject(responseInterceptorInstance);
        pause();
      };
    }
  }, [isUserLogged]);

  return <></>;
};

IdleTimer.propTypes = {
  logOut: PropTypes.func,
  user: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
});

const mapDispatchToProps = {
  logOut: logOutAction,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(IdleTimer);
