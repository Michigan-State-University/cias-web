import { actionBuilder } from 'utils/actionBuilder';

import {
  CREATE_INTERVENTION_REQUEST,
  CREATE_INTERVENTION_SUCCESS,
  CREATE_INTERVENTION_ERROR,
  GET_INTERVENTION_REQUEST,
  GET_INTERVENTION_SUCCESS,
  GET_INTERVENTION_ERROR,
  EDIT_INTERVENTION_REQUEST,
  EDIT_INTERVENTION_SUCCESS,
  EDIT_INTERVENTION_ERROR,
} from './constants';

export const createInterventionRequest = () =>
  actionBuilder(CREATE_INTERVENTION_REQUEST, {});
export const createInterventionSuccess = () =>
  actionBuilder(CREATE_INTERVENTION_SUCCESS, {});
export const createInterventionError = () =>
  actionBuilder(CREATE_INTERVENTION_ERROR, {});

export const getInterventionRequest = id =>
  actionBuilder(GET_INTERVENTION_REQUEST, { id });
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
