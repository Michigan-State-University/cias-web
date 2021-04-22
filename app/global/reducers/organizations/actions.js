import { actionBuilder } from 'utils/actionBuilder';

import {
  FETCH_ORGANIZATIONS_REQUEST,
  FETCH_ORGANIZATIONS_SUCCESS,
  FETCH_ORGANIZATIONS_ERROR,
  CREATE_ORGANIZATION_REQUEST,
  CREATE_ORGANIZATION_SUCCESS,
  CREATE_ORGANIZATION_ERROR,
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
