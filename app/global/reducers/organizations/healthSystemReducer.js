import produce from 'immer';

import { deleteItemById, updateItemById } from 'utils/reduxUtils';
import { clinicReducer } from './clinicReducer';

import {
  ADD_CLINIC_SUCCESS,
  DELETE_CLINIC_SUCCESS,
  EDIT_CLINIC_REQUEST,
  EDIT_CLINIC_SUCCESS,
  EDIT_HEALTH_SYSTEM_REQUEST,
  FETCH_CLINIC_SUCCESS,
  FETCH_HEALTH_SYSTEM_SUCCESS,
} from './constants';

/* eslint-disable default-case, no-param-reassign */
const healthSystemReducer = (state = null, action) =>
  produce(state, draft => {
    const { type, payload } = action;

    switch (type) {
      case FETCH_HEALTH_SYSTEM_SUCCESS:
      case EDIT_HEALTH_SYSTEM_REQUEST: {
        return { ...state, ...payload.healthSystem };
      }

      case ADD_CLINIC_SUCCESS: {
        draft.healthClinics.unshift(payload.clinic);

        break;
      }

      case FETCH_CLINIC_SUCCESS:
      case EDIT_CLINIC_REQUEST: {
        updateItemById(draft.healthClinics, payload.clinic.id, item =>
          clinicReducer(item, action),
        );

        break;
      }

      case EDIT_CLINIC_SUCCESS: {
        updateItemById(draft.healthClinics, payload.clinic.id, payload.clinic);
        break;
      }

      case DELETE_CLINIC_SUCCESS: {
        deleteItemById(draft.healthClinics, payload.id);
        break;
      }
    }
  });

export { healthSystemReducer };
