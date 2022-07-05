import { createAction } from 'typesafe-actions';

import { ApiError } from 'models/Api';
import { NavigatorSetup, ParticipantLink } from 'models/NavigatorSetup';

import {
  ADD_PARTICIPANT_LINK_ERROR,
  ADD_PARTICIPANT_LINK_REQUEST,
  ADD_PARTICIPANT_LINK_SUCCESS,
  FETCH_NAVIGATOR_SETUP_ERROR,
  FETCH_NAVIGATOR_SETUP_REQUEST,
  FETCH_NAVIGATOR_SETUP_SUCCESS,
  REMOVE_PARTICIPANT_LINK_ERROR,
  REMOVE_PARTICIPANT_LINK_REQUEST,
  REMOVE_PARTICIPANT_LINK_SUCCESS,
  UPDATE_NAVIGATOR_SETUP_ERROR,
  UPDATE_NAVIGATOR_SETUP_REQUEST,
  UPDATE_NAVIGATOR_SETUP_SUCCESS,
  UPDATE_PARTICIPANT_LINK_REQUEST,
  UPDATE_PARTICIPANT_LINK_SUCCESS,
  UPDATE_PARTICIPANT_LINK_ERROR,
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

export const addParticipantLinkRequest = createAction(
  ADD_PARTICIPANT_LINK_REQUEST,
  (action) =>
    (
      interventionId: string,
      participantLink: Partial<Omit<ParticipantLink, 'id'>>,
    ) =>
      action({ interventionId, participantLink }),
);

export const addParticipantLinkSuccess = createAction(
  ADD_PARTICIPANT_LINK_SUCCESS,
  (action) => (navigatorSetup: NavigatorSetup) => action({ navigatorSetup }),
);

export const addParticipantLinkError = createAction(
  ADD_PARTICIPANT_LINK_ERROR,
  (action) => (error: ApiError) => action({ error }),
);

export const removeParticipantLinkRequest = createAction(
  REMOVE_PARTICIPANT_LINK_REQUEST,
  (action) => (interventionId: string, linkId: string) =>
    action({ interventionId, linkId }),
);

export const removeParticipantLinkSuccess = createAction(
  REMOVE_PARTICIPANT_LINK_SUCCESS,
  (action) => (linkId: string) => action({ linkId }),
);

export const removeParticipantLinkError = createAction(
  REMOVE_PARTICIPANT_LINK_ERROR,
  (action) => (error: ApiError) => action({ error }),
);

export const updateParticipantLinkRequest = createAction(
  UPDATE_PARTICIPANT_LINK_REQUEST,
  (action) =>
    (
      interventionId: string,
      linkId: string,
      participantLink: Partial<Omit<ParticipantLink, 'id'>>,
    ) =>
      action({ interventionId, linkId, participantLink }),
);

export const updateParticipantLinkSuccess = createAction(
  UPDATE_PARTICIPANT_LINK_SUCCESS,
  (action) => () => action(),
);

export const updateParticipantLinkError = createAction(
  UPDATE_PARTICIPANT_LINK_ERROR,
  (action) => (error: ApiError) => action({ error }),
);
