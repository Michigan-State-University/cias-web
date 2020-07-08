import { actionBuilder } from 'utils/actionBuilder';

import {
  CREATE_INTERVENTION_REQUEST,
  CREATE_INTERVENTION_SUCCESS,
  CREATE_INTERVENTION_ERROR,
} from './constants';

export const createInterventionRequest = () =>
  actionBuilder(CREATE_INTERVENTION_REQUEST, {});
export const createInterventionSuccess = () =>
  actionBuilder(CREATE_INTERVENTION_SUCCESS, {});
export const createInterventionError = error =>
  actionBuilder(CREATE_INTERVENTION_ERROR, { error });
