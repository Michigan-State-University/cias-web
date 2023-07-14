import { put, takeLatest, call, select } from 'redux-saga/effects';
import axios from 'axios';
import { push } from 'connected-react-router';

import { RoutePath } from 'global/constants';

import { jsonApiToObject } from 'utils/jsonApiMapper';
import { calculateNextValue, CalculationStrategy } from 'utils/sequenceUtils';
import { parametrizeRoutePath } from 'utils/router';

import { CREATE_ORGANIZATION_REQUEST } from '../constants';
import {
  createOrganizationFailure,
  createOrganizationSuccess,
} from '../actions';
import { makeSelectOrganizations } from '../selectors';

export function* createOrganization() {
  const requestURL = `v1/organizations`;
  const organizations = yield select(makeSelectOrganizations());
  const organizationSuffixes = organizations.map(({ name }) =>
    name.split(' ').pop(),
  );
  const nextOrganizationSuffix = calculateNextValue(
    organizationSuffixes,
    CalculationStrategy.NEXT_VALUE,
  );
  try {
    const { data } = yield call(axios.post, requestURL, {
      organization: { name: `New organization ${nextOrganizationSuffix}` },
    });
    const organization = jsonApiToObject(data, 'organization');
    yield put(createOrganizationSuccess(organization));

    // Go to the newly created Organization
    yield put(
      push(
        parametrizeRoutePath(RoutePath.MANAGE_ORGANIZATIONS, {
          organizationId: organization.id,
        }),
      ),
    );
  } catch (error) {
    yield put(createOrganizationFailure(error));
  }
}

export default function* createOrganizationSaga() {
  yield takeLatest(CREATE_ORGANIZATION_REQUEST, createOrganization);
}
