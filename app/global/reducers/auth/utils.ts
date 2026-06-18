import { AnswerSessionPageLocationState } from 'global/types/locationState';
import { RoutePath } from 'global/constants';

import objectToCamelCase from 'utils/objectToCamelCase';
import { parametrizeRoutePath } from 'utils/router';

import {
  getInterventionNotAvailablePagePathFromReason,
  InterventionNotAvailableReason,
} from 'components/InterventionNotAvailableInfo';

import { InterventionType } from 'models/Intervention';

import { RedirectDataDTO } from './types';

export const getPredefinedParticipantRedirectPath = (
  redirectDataDTO: RedirectDataDTO,
): {
  path: string;
  locationState?: AnswerSessionPageLocationState;
} => {
  const {
    userInterventionId,
    interventionId,
    sessionId,
    healthClinicId,
    multipleFillSessionAvailable,
    lang,
    raSessionPending,
    interventionType,
  } = objectToCamelCase(redirectDataDTO);

  if (raSessionPending) {
    if (interventionType === InterventionType.FLEXIBLE) {
      // FlexibleOrder: redirect to session grid with raSessionPending flag
      const redirectPath = parametrizeRoutePath(RoutePath.USER_INTERVENTION, {
        userInterventionId,
      });
      return {
        path: `${redirectPath}?raSessionPending=true`,
      };
    }

    return {
      path: getInterventionNotAvailablePagePathFromReason(
        InterventionNotAvailableReason.RA_SESSION_PENDING,
      ),
    };
  }

  if (sessionId) {
    // redirect to answer session page
    const redirectPath = parametrizeRoutePath(RoutePath.ANSWER_SESSION, {
      interventionId,
      sessionId,
    });

    const queryParams = new URLSearchParams({
      lang,
    });
    if (healthClinicId) {
      queryParams.append('cid', healthClinicId);
    }

    const locationState: AnswerSessionPageLocationState = {
      multipleFillSessionAvailable,
      userInterventionId,
    };

    return {
      path: `${redirectPath}?${queryParams}`,
      locationState,
    };
  }

  // redirect to the intervention modules list
  const redirectPath = parametrizeRoutePath(RoutePath.USER_INTERVENTION, {
    userInterventionId,
  });

  return {
    path: redirectPath,
  };
};

export const getShortLinkRedirectPath = (
  redirectDataDTO: RedirectDataDTO,
): {
  path: string;
  locationState?: AnswerSessionPageLocationState;
} => {
  const {
    userInterventionId,
    interventionId,
    sessionId,
    healthClinicId,
    multipleFillSessionAvailable,
    lang,
    raSessionPending,
    interventionType,
  } = objectToCamelCase(redirectDataDTO);

  if (raSessionPending) {
    if (interventionType === InterventionType.FLEXIBLE) {
      const redirectPath = parametrizeRoutePath(RoutePath.USER_INTERVENTION, {
        userInterventionId,
      });
      return {
        path: `${redirectPath}?raSessionPending=true`,
      };
    }

    return {
      path: getInterventionNotAvailablePagePathFromReason(
        InterventionNotAvailableReason.RA_SESSION_PENDING,
      ),
    };
  }

  const queryParams = new URLSearchParams({ lang });
  if (healthClinicId) {
    queryParams.append('cid', healthClinicId);
  }

  if (sessionId) {
    // redirect to answer session page
    const redirectPath = parametrizeRoutePath(RoutePath.ANSWER_SESSION, {
      interventionId,
      sessionId,
    });

    const locationState: AnswerSessionPageLocationState = {
      multipleFillSessionAvailable,
      userInterventionId,
    };

    return {
      path: `${redirectPath}?${queryParams}`,
      locationState,
    };
  }

  // redirect to the intervention invitation accept page
  const redirectPath = parametrizeRoutePath(RoutePath.INTERVENTION_INVITE, {
    interventionId,
  });

  return {
    path: `${redirectPath}?${queryParams}`,
  };
};
