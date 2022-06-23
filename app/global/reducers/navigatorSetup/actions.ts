import { createAction } from 'typesafe-actions';

import { ApiError } from 'models/Api';
import { NavigatorSetup } from 'models/NavigatorSetup';

import {
  FETCH_NAVIGATOR_SETUP_ERROR,
  FETCH_NAVIGATOR_SETUP_REQUEST,
  FETCH_NAVIGATOR_SETUP_SUCCESS,
  UPDATE_NAVIGATOR_SETUP_ERROR,
  UPDATE_NAVIGATOR_SETUP_REQUEST,
  UPDATE_NAVIGATOR_SETUP_SUCCESS,
} from './constants';

export const fetchNavigatorSetupRequest = createAction(
  FETCH_NAVIGATOR_SETUP_REQUEST,
  (action) => (interventionId: string) => action({ interventionId }),
);
export const fetchNavigatorSetupSuccess = createAction(
  FETCH_NAVIGATOR_SETUP_SUCCESS,
  (action) => (navigatorSetup: NavigatorSetup) => action({ navigatorSetup }),
);
export const fetchNavigatorSetupError = createAction(
  FETCH_NAVIGATOR_SETUP_ERROR,
  (action) => (error: ApiError) => action({ error }),
);

export const updateNavigatorSetupRequest = createAction(
  UPDATE_NAVIGATOR_SETUP_REQUEST,
  (action) =>
    (
      interventionId: string,
      navigatorSetupData: Partial<Omit<NavigatorSetup, 'id'>>,
    ) =>
      action({ interventionId, navigatorSetupData }),
);

export const updateNavigatorSetupSuccess = createAction(
  UPDATE_NAVIGATOR_SETUP_SUCCESS,
  (action) => () => action(),
);

export const updateNavigatorSetupError = createAction(
  UPDATE_NAVIGATOR_SETUP_ERROR,
  (action) => (error: ApiError) => action({ error }),
);
