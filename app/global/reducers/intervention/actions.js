import { actionBuilder } from 'utils/actionBuilder';

import {
  GET_INTERVENTION_REQUEST,
  GET_INTERVENTION_SUCCESS,
  GET_INTERVENTION_ERROR,
  EDIT_INTERVENTION_REQUEST,
  EDIT_INTERVENTION_SUCCESS,
  EDIT_INTERVENTION_ERROR,
} from './constants';

export const getInterventionRequest = payload =>
  actionBuilder(GET_INTERVENTION_REQUEST, payload);
export const getInterventionSuccess = intervention =>
  actionBuilder(GET_INTERVENTION_SUCCESS, { intervention });
export const getInterventionError = error =>
  actionBuilder(GET_INTERVENTION_ERROR, { error });

export const editInterventionRequest = payload =>
  actionBuilder(EDIT_INTERVENTION_REQUEST, payload);
export const editInterventionSuccess = intervention =>
  actionBuilder(EDIT_INTERVENTION_SUCCESS, { intervention });
export const editInterventionError = error =>
  actionBuilder(EDIT_INTERVENTION_ERROR, { error });
