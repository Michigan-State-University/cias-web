import produce from 'immer';

import { findIndexById } from 'utils/arrayUtils';
import { clinicReducer } from './clinicReducer';

import {
  ADD_CLINIC_SUCCESS,
  DELETE_CLINIC_SUCCESS,
  EDIT_CLINIC_REQUEST,
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
        const index = findIndexById(state.healthClinics, payload.clinic.id);

        if (index !== -1)
          draft.healthClinics[index] = clinicReducer(
            state.healthClinics[index],
            action,
          );

        break;
      }

      case DELETE_CLINIC_SUCCESS: {
        const index = findIndexById(state.healthClinics, payload.id);

        if (index !== -1) draft.healthClinics.splice(index, 1);

        break;
      }
    }
  });

export { healthSystemReducer };
