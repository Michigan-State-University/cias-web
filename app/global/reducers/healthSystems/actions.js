import { actionBuilder } from 'utils/actionBuilder';
import {
  FETCH_HEALTH_SYSTEMS_ERROR,
  FETCH_HEALTH_SYSTEMS_REQUEST,
  FETCH_HEALTH_SYSTEMS_SUCCESS,
} from './constants';

export const fetchHealthSystemsRequest = () =>
  actionBuilder(FETCH_HEALTH_SYSTEMS_REQUEST, {});
export const fetchHealthSystemsSuccess = healthSystems =>
  actionBuilder(FETCH_HEALTH_SYSTEMS_SUCCESS, { healthSystems });
export const fetchHealthSystemsError = error =>
  actionBuilder(FETCH_HEALTH_SYSTEMS_ERROR, { error });
