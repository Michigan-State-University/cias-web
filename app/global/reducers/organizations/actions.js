import { actionBuilder } from 'utils/actionBuilder';

import {
  FETCH_ORGANIZATIONS_REQUEST,
  FETCH_ORGANIZATIONS_SUCCESS,
  FETCH_ORGANIZATIONS_ERROR,
  CREATE_ORGANIZATION_REQUEST,
  CREATE_ORGANIZATION_SUCCESS,
  CREATE_ORGANIZATION_ERROR,
  FETCH_ORGANIZATION_REQUEST,
  FETCH_ORGANIZATION_SUCCESS,
  FETCH_ORGANIZATION_ERROR,
  EDIT_ORGANIZATION_REQUEST,
  EDIT_ORGANIZATION_SUCCESS,
  EDIT_ORGANIZATION_ERROR,
  DELETE_ORGANIZATION_REQUEST,
  DELETE_ORGANIZATION_SUCCESS,
  DELETE_ORGANIZATION_ERROR,
  INVITE_ADMIN_REQUEST,
  INVITE_ADMIN_SUCCESS,
  INVITE_ADMIN_ERROR,
} from './constants';

export const fetchOrganizationsRequest = () =>
  actionBuilder(FETCH_ORGANIZATIONS_REQUEST, {});
export const fetchOrganizationsSuccess = organizations =>
  actionBuilder(FETCH_ORGANIZATIONS_SUCCESS, { organizations });
export const fetchOrganizationsFailure = error =>
  actionBuilder(FETCH_ORGANIZATIONS_ERROR, { error });

export const createOrganizationRequest = () =>
  actionBuilder(CREATE_ORGANIZATION_REQUEST, {});
export const createOrganizationSuccess = organization =>
  actionBuilder(CREATE_ORGANIZATION_SUCCESS, { organization });
export const createOrganizationFailure = error =>
  actionBuilder(CREATE_ORGANIZATION_ERROR, { error });

export const fetchOrganizationRequest = id =>
  actionBuilder(FETCH_ORGANIZATION_REQUEST, { id });
export const fetchOrganizationSuccess = organization =>
  actionBuilder(FETCH_ORGANIZATION_SUCCESS, { organization });
export const fetchOrganizationFailure = error =>
  actionBuilder(FETCH_ORGANIZATION_ERROR, { error });

export const editOrganizationRequest = organization =>
  actionBuilder(EDIT_ORGANIZATION_REQUEST, { organization });
export const editOrganizationSuccess = organization =>
  actionBuilder(EDIT_ORGANIZATION_SUCCESS, { organization });
export const editOrganizationFailure = error =>
  actionBuilder(EDIT_ORGANIZATION_ERROR, { error });

export const deleteOrganizationRequest = id =>
  actionBuilder(DELETE_ORGANIZATION_REQUEST, { id });
export const deleteOrganizationSuccess = id =>
  actionBuilder(DELETE_ORGANIZATION_SUCCESS, { id });
export const deleteOrganizationFailure = error =>
  actionBuilder(DELETE_ORGANIZATION_ERROR, { error });

export const inviteAdminRequest = (organizationId, email, role) =>
  actionBuilder(INVITE_ADMIN_REQUEST, { email, role, organizationId });
export const inviteAdminSuccess = user =>
  actionBuilder(INVITE_ADMIN_SUCCESS, { user });
export const inviteAdminFailure = error =>
  actionBuilder(INVITE_ADMIN_ERROR, { error });
