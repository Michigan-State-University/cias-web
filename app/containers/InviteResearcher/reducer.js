import produce from 'immer';

import safeSpread from 'utils/safeSpread';

import {
  INVITE_RESEARCHER_REQUEST,
  INVITE_RESEARCHER_SUCCESS,
  INVITE_RESEARCHER_ERROR,
  GET_INVITATIONS_REQUEST,
  GET_INVITATIONS_SUCCESS,
  GET_INVITATIONS_ERROR,
  CANCEL_INVITATION_REQUEST,
  CANCEL_INVITATION_SUCCESS,
  CANCEL_INVITATION_ERROR,
  CHANGE_EMAIL_INPUT,
  CHANGE_ERROR_VALUE,
} from './constants';

export const initialState = {
  invite: {
    email: '',
    loading: false,
    error: null,
  },
  invitations: {
    list: null,
    loading: false,
    error: null,
  },
  cancel: {
    invitationCanceling: null,
  },
};

/* eslint-disable default-case, no-param-reassign */
const inviteResearcherReducer = (state = initialState, { type, payload }) =>
  produce(state, (draft) => {
    switch (type) {
      case INVITE_RESEARCHER_REQUEST:
        draft.invite.loading = true;
        draft.invite.error = null;
        break;
      case INVITE_RESEARCHER_SUCCESS:
        draft.invite.loading = false;
        draft.invite.error = null;
        draft.invite.email = '';
        const { user: { id, email } = {} } = payload || {};
        draft.invitations.list = [
          { id, email },
          ...safeSpread(state.invitations.list, 'array'),
        ];
        break;
      case INVITE_RESEARCHER_ERROR:
        draft.invite.loading = false;
        draft.invite.error = payload.error;
        break;

      case GET_INVITATIONS_REQUEST:
        if (!state.invitations.list) draft.invitations.loading = true;
        draft.invitations.error = null;
        break;
      case GET_INVITATIONS_SUCCESS:
        draft.invitations.loading = false;
        draft.invitations.error = null;
        draft.invitations.list = payload.invitations;
        break;
      case GET_INVITATIONS_ERROR:
        draft.invitations.loading = false;
        draft.invitations.error = payload.error;
        break;

      case CANCEL_INVITATION_REQUEST:
        draft.cancel.invitationCanceling = payload.id;
        break;
      case CANCEL_INVITATION_SUCCESS:
        draft.cancel.invitationCanceling = null;
        draft.invitations.list = state.invitations.list.filter(
          ({ id: userId }) => userId !== payload.id,
        );
        break;
      case CANCEL_INVITATION_ERROR:
        draft.cancel.invitationCanceling = null;
        break;

      case CHANGE_EMAIL_INPUT:
        draft.invite.email = payload.value;
        break;

      case CHANGE_ERROR_VALUE:
        draft[payload.error].error = payload.value;
        break;
    }
  });

export default inviteResearcherReducer;
