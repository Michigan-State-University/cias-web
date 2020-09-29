/*
 *
 * RegisterPage actions
 *
 */

import {
  REGISTER_PARTICIPANT_REQUEST,
  REGISTER_PARTICIPANT_SUCCESS,
  REGISTER_PARTICIPANT_ERROR,
  REGISTER_RESEARCHER_REQUEST,
  REGISTER_RESEARCHER_SUCCESS,
  REGISTER_RESEARCHER_ERROR,
} from './constants';
import { actionBuilder } from '../../utils/actionBuilder';

export const registerParticipantRequest = payload =>
  actionBuilder(REGISTER_PARTICIPANT_REQUEST, payload);

export const registerParticipantSuccess = () =>
  actionBuilder(REGISTER_PARTICIPANT_SUCCESS, {});

export const registerParticipantError = error =>
  actionBuilder(REGISTER_PARTICIPANT_ERROR, { error });

export const registerResearcherRequest = payload =>
  actionBuilder(REGISTER_RESEARCHER_REQUEST, payload);

export const registerResearcherSuccess = () =>
  actionBuilder(REGISTER_RESEARCHER_SUCCESS, {});

export const registerResearcherError = error =>
  actionBuilder(REGISTER_RESEARCHER_ERROR, { error });
