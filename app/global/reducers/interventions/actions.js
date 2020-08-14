import { actionBuilder } from 'utils/actionBuilder';

import {
  FETCH_INTERVENTIONS_REQUEST,
  FETCH_INTERVENTIONS_ERROR,
  FETCH_INTERVENTIONS_SUCCESS,
} from './constants';

export const fetchInterventionsRequest = () =>
  actionBuilder(FETCH_INTERVENTIONS_REQUEST, {});
export const fetchInterventionsSuccess = interventions =>
  actionBuilder(FETCH_INTERVENTIONS_SUCCESS, { interventions });
export const fetchInterventionsError = error =>
  actionBuilder(FETCH_INTERVENTIONS_ERROR, { error });
