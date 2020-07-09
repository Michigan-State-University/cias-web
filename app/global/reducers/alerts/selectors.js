import { createSelector } from 'reselect';
import { get } from 'lodash';

const selectAlerts = state => state.alerts;

export const makeSelectAlerts = () =>
  createSelector(
    selectAlerts,
    alertsState => alertsState,
  );

export const makeSelectAlert = alertId =>
  createSelector(
    selectAlerts,
    alertsState => get(alertsState, alertId, false),
  );
