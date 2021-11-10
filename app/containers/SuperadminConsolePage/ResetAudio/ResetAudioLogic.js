import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';

import {
  adminConsoleReducer,
  adminConsoleSaga,
  makeSelectAdminConsoleState,
  resetAudioRequest,
} from 'global/reducers/adminConsole';

import { ResetAudioUI } from './ResetAudioUI';

export const ResetAudioLogic = () => {
  useInjectSaga({ key: 'adminConsoleSaga', saga: adminConsoleSaga });
  useInjectReducer({
    key: 'adminConsole',
    reducer: adminConsoleReducer,
  });
  const dispatch = useDispatch();

  // actions
  const resetAudio = () => dispatch(resetAudioRequest());

  // selectors
  const {
    loaders: { resetAudio: isLoading },
  } = useSelector(makeSelectAdminConsoleState());

  return <ResetAudioUI resetAudio={resetAudio} isLoading={isLoading} />;
};
