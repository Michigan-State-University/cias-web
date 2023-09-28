import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IntlShape } from 'react-intl';

import LocalStorageService from 'utils/localStorageService';
import { getIsPreview } from 'utils/previewMode';
import { parametrizeRoutePath } from 'utils/router';

import { InterventionSharedTo, InterventionType } from 'models/Intervention';
import { FinishQuestionDTO } from 'models/Question';
import { useRoleManager } from 'models/User/RolesManager';

import { resetReducer as resetAuthReducer } from 'global/reducers/auth/actions';
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
  const { isPredefinedParticipant } = useRoleManager();

  const dispatch = useDispatch();
  const userSession = useSelector(makeSelectUserSession());

  const {
    id: userSessionId,
    interventionType,
    sharedTo,
    userInterventionId,
  } = userSession;
  // @ts-ignore
  const { next_session_id: nextSessionId } = question;

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

  if (isGuestUser) {
    return (
      <Row mt={50} justify="center" width="100%">
        <Button onClick={reloadPage} px={20} width="auto">
          {formatMessage(messages.completeSession)}
        </Button>
      </Row>
    );
  }
  const showModulesButtons = isModuleIntervention && !isPreview;

  if (showModulesButtons)
    return (
      <Row mt={50} align="center" justify="end" width="100%" gap={15}>
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

  const getGoToDashboardButtonLink = () => {
    if (isPreview) return '#';
    if (isPredefinedParticipant) {
      return parametrizeRoutePath(RoutePath.USER_INTERVENTION, {
        userInterventionId,
      });
    }
    return RoutePath.DASHBOARD;
  };
  return (
    <Row mt={50} justify="center" width="100%" gap={15}>
      {isPreview && (
        <StyledLink to={sessionMapUrl}>
          <Button onClick={closeOpenerTab} px={20} inverted>
            {formatMessage(messages.goToSessionMap)}
          </Button>
        </StyledLink>
      )}
      {/* TODO https://htdevelopers.atlassian.net/browse/CIAS30-3705 redirect predefined user to USER_INTERVENTION page */}
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
    </Row>
  );
};

export default FinishScreenLayout;
