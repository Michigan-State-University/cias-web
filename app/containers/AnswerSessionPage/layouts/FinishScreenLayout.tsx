import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IntlShape } from 'react-intl';

import LocalStorageService from 'utils/localStorageService';
import { getIsPreview } from 'utils/previewMode';
import { parametrizeRoutePath } from 'utils/router';

import { InterventionSharedTo, InterventionType } from 'models/Intervention';
import { FinishQuestionDTO } from 'models/Question';

import { resetReducer as resetAuthReducer } from 'global/reducers/auth/actions';
import { makeSelectInterventionFixedElementsDirection } from 'global/reducers/globalState';
import { RoutePath } from 'global/constants';

import Button, { TextButton } from 'components/Button';
import Row from 'components/Row';
import GhostLink from 'components/GhostLink';

import { StyledLink } from './styled';
import messages from './messages';
import { makeSelectUserSession } from '../selectors';
import { getNextSessionUrl, getSessionMapUserPreviewUrl } from '../utils';
import {
  fetchOrCreateUserSessionRequest,
  resetReducer as resetAnswerSessionPageReducer,
} from '../actions';

type Props = {
  formatMessage: IntlShape['formatMessage'];
  question: FinishQuestionDTO;
};

const FinishScreenLayout = ({ formatMessage, question }: Props) => {
  const isGuestUser = !LocalStorageService.getState();

  const dispatch = useDispatch();
  const userSession = useSelector(makeSelectUserSession());

  const fixedElementsDirection = useSelector(
    makeSelectInterventionFixedElementsDirection(),
  );

  const {
    id: userSessionId,
    interventionType,
    sharedTo,
    userInterventionId,
  } = userSession;
  // @ts-ignore
  const { next_session_id: nextSessionId, settings } = question;
  const showDashboardButton = settings?.show_dashboard_button ?? false;

  const isModuleIntervention =
    interventionType === InterventionType.FIXED ||
    interventionType === InterventionType.FLEXIBLE;

  const sessionMapUrl = useMemo(
    () => getSessionMapUserPreviewUrl(userSessionId),
    [userSessionId],
  );

  const nextSessionUrl = useMemo(
    () => getNextSessionUrl(nextSessionId),
    [nextSessionId],
  );

  const isPreview = getIsPreview();

  const closeCurrentTab = () => {
    window.opener = null;
    window.open('', '_self');
    window.close();
  };

  const closeOpenerTab = () => {
    window.opener?.close();
  };

  const reloadPage = () => {
    LocalStorageService.clearHeaders();
    dispatch(resetAuthReducer());
  };

  const clearUserSession = () => {
    dispatch(resetAnswerSessionPageReducer());
  };

  const goToNextSession = () => {
    dispatch(fetchOrCreateUserSessionRequest(nextSessionId));
  };

  useEffect(() => {
    if (!isGuestUser && !isModuleIntervention && !isPreview) {
      return clearUserSession;
      // clear answer session page reducer on unmount for logged in or
      // predefined users after filling a session in sequential intervention
    }
  }, []);

  const showModulesButtons = isModuleIntervention && !isPreview;

  if (showModulesButtons)
    return (
      <Row
        mt={50}
        align="center"
        justify="end"
        width="100%"
        gap={15}
        dir={fixedElementsDirection}
      >
        <StyledLink
          to={parametrizeRoutePath(RoutePath.USER_INTERVENTION, {
            userInterventionId,
          })}
        >
          <TextButton onClick={clearUserSession}>
            {formatMessage(messages.goBackToModules)}
          </TextButton>
        </StyledLink>
        {nextSessionId && (
          <GhostLink to={nextSessionUrl}>
            <Button px={20} width="100%" onClick={goToNextSession}>
              {formatMessage(messages.goToNextModule)}
            </Button>
          </GhostLink>
        )}
      </Row>
    );

  if (isGuestUser) {
    return (
      <Row mt={50} justify="center" width="100%" dir={fixedElementsDirection}>
        <Button onClick={reloadPage} px={20} width="auto">
          {formatMessage(messages.completeSession)}
        </Button>
      </Row>
    );
  }

  const getGoToDashboardButtonLink = () => {
    if (isPreview) return '#';
    return parametrizeRoutePath(RoutePath.USER_INTERVENTION, {
      userInterventionId,
    });
  };

  return (
    <Row
      mt={50}
      justify="center"
      width="100%"
      gap={15}
      dir={fixedElementsDirection}
    >
      {isPreview && (
        <StyledLink to={sessionMapUrl}>
          <Button onClick={closeOpenerTab} px={20} inverted>
            {formatMessage(messages.goToSessionMap)}
          </Button>
        </StyledLink>
      )}
      {showDashboardButton && (
        <StyledLink to={getGoToDashboardButtonLink()}>
          <Button
            onClick={isPreview ? closeCurrentTab : undefined}
            px={20}
            width="100%"
          >
            {formatMessage(
              messages[
                isPreview && sharedTo === InterventionSharedTo.ANYONE
                  ? 'completeSession'
                  : 'goToDashboard'
              ],
            )}
          </Button>
        </StyledLink>
      )}
    </Row>
  );
};

export default FinishScreenLayout;
