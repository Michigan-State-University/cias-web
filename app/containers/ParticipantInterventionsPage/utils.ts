import { InterventionStatus } from 'models/Intervention';
import { UserInterventionStatus } from 'models/UserIntervention/StatusTypes';

import { DISABLED_USER_INTERVENTION_TILE_STATUSES } from './constants';

export const getExtendedUserInterventionStatus = (
  blocked: boolean,
  interventionStatus: InterventionStatus,
  userInterventionStatus: UserInterventionStatus,
) => {
  if (blocked) {
    return UserInterventionStatus.NO_ACCESS;
  }
  if (interventionStatus === InterventionStatus.PAUSED) {
    return UserInterventionStatus.PAUSED;
  }
  return userInterventionStatus;
};

export const isUserInterventionTileDisabled = (
  extendedStatus: UserInterventionStatus,
  containMultipleFillSession: boolean,
) =>
  DISABLED_USER_INTERVENTION_TILE_STATUSES.includes(extendedStatus) ||
  (!containMultipleFillSession &&
    extendedStatus === UserInterventionStatus.COMPLETED);
