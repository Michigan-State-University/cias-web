import produce from 'immer';

import {
  DELETE_CLINIC_SUCCESS,
  EDIT_CLINIC_REQUEST,
  FETCH_CLINIC_SUCCESS,
} from './constants';

/* eslint-disable default-case, no-param-reassign */
const clinicReducer = (state = null, action) =>
  produce(state, () => {
    const { type, payload } = action;

    switch (type) {
      case FETCH_CLINIC_SUCCESS:
      case EDIT_CLINIC_REQUEST: {
        return { ...state, ...payload.clinic };
      }

      case DELETE_CLINIC_SUCCESS: {
        return { ...state, deleted: true };
      }
    }
  });

export { clinicReducer };
