import { select, takeEvery, put } from '@redux-saga/core/effects';
import { push } from 'connected-react-router';

import {
  makeSelectIsAdmin,
  makeSelectUserOrganizableId,
} from 'global/reducers/auth';

import { matchResearchersInterventionPaths } from 'utils/router';

import { ON_COLLABORATOR_REMOVED_RECEIVE } from '../constants';
import {
  fetchInterventionRequest,
  onCollaboratorRemovedReceive,
  resetReducer,
} from '../actions';
import {
  makeSelectInterventionId,
  makeSelectInterventionOrganizationId,
} from '../selectors';

function* onCollaboratorRemovedReceiveWorker({
  payload: { interventionId },
}: ReturnType<typeof onCollaboratorRemovedReceive>) {
  const currentInterventionId: Nullable<string> = yield select(
    makeSelectInterventionId(),
  );
  if (interventionId !== currentInterventionId) return;

  const interventionOrganizationId: Nullable<string> = yield select(
    makeSelectInterventionOrganizationId(),
  );
  const isAdmin: boolean = yield select(makeSelectIsAdmin());
  const isEInterventionAdmin: boolean = yield select(
    makeSelectUserOrganizableId(),
  );
  const userOrganizableId: Nullable<string> = yield select(
    makeSelectUserOrganizableId(),
  );

  const canUserStillViewTheIntervention =
    isAdmin ||
    (interventionOrganizationId &&
      isEInterventionAdmin &&
      interventionOrganizationId === userOrganizableId);

  const isViewingIntervention = matchResearchersInterventionPaths();

  if (canUserStillViewTheIntervention) {
    if (isViewingIntervention) {
      yield put(fetchInterventionRequest(interventionId, true));
    }
    return;
  }

  if (isViewingIntervention) {
    yield put(push('/'));
  }
  yield put(resetReducer());
}

export default function* onCollaboratorRemovedReceiveSaga() {
  yield takeEvery(
    ON_COLLABORATOR_REMOVED_RECEIVE,
    onCollaboratorRemovedReceiveWorker,
  );
}

export const withOnCollaboratorRemovedReceiveSaga = {
  key: 'onCollaboratorRemovedReceive',
  saga: onCollaboratorRemovedReceiveSaga,
};
