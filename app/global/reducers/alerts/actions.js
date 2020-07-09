import { actionBuilder } from 'utils/actionBuilder';
import { SHOW_ALERT, CLEAR_ALERT } from './constants';

export const showAlert = alertId => actionBuilder(SHOW_ALERT, { alertId });

export const clearAlert = alertId => actionBuilder(CLEAR_ALERT, { alertId });

export const alertsController = { showAlert, clearAlert };
