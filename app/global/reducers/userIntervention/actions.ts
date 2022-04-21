import { createAction } from 'typesafe-actions';

import { ACCEPT_INTERVENTION_INVITE } from './constants';

export const acceptInterventionInvite = createAction(
  ACCEPT_INTERVENTION_INVITE,
  (action) => (interventionId: string, clinicId: Nullable<string>) =>
    action({ interventionId, clinicId }),
);
