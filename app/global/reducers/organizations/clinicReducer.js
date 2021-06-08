import produce from 'immer';

import { EDIT_CLINIC_REQUEST, FETCH_CLINIC_SUCCESS } from './constants';

/* eslint-disable default-case, no-param-reassign */
const clinicReducer = (state = null, action) =>
  produce(state, () => {
    const { type, payload } = action;

    switch (type) {
      case FETCH_CLINIC_SUCCESS:
      case EDIT_CLINIC_REQUEST: {
        return { ...state, ...payload.clinic };
      }
    }
  });

export { clinicReducer };
