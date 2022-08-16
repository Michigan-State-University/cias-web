import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IntlShape } from 'react-intl';

import LocalStorageService from 'utils/localStorageService';
import { previewRegex } from 'global/constants/regex';
import { resetReducer } from 'global/reducers/auth/actions';
import { InterventionSharedTo, InterventionType } from 'models/Intervention';
import { FinishQuestionDTO } from 'models/Question';

import Button, { TextButton } from 'components/Button';
import Row from 'components/Row';
import GhostLink from 'components/GhostLink';

import { StyledLink } from './styled';
import messages from './messages';
import { makeSelectUserSession } from '../selectors';
import {
  getBackToModulesUrl,
  getSessionMapUserPreviewUrl,
  getNextSessionUrl,
} from '../utils';
import { createUserSessionRequest } from '../actions';

type Props = {
  formatMessage: IntlShape['formatMessage'];
  question: FinishQuestionDTO;
};

const FinishScreenLayout = ({ formatMessage, question }: Props) => {
  // If there is no state in LocalStorageService it means that that is anonymous user with anyone in the link
  const isNotLoggedInUser = !LocalStorageService.getState();

  useEffect(() => {
    if (isNotLoggedInUser) {
      LocalStorageService.clearHeaders();
    }
  }, []);

  const dispatch = useDispatch();
  const userSession = useSelector(makeSelectUserSession());

  const {
    id: userSessionId,
    interventionType,
    sharedTo,
    sessionId,
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

  const isPreview = previewRegex.test(window.location.pathname);

  const closeCurrentTab = () => {
    window.opener = null;
    window.open('', '_self');
    window.close();
  };

  const closeOpenerTab = () => {
    window.opener?.close();
  };

  const reloadPage = () => {
    dispatch(resetReducer());
    dispatch(createUserSessionRequest(sessionId));
  };

  if (isNotLoggedInUser) {
    return (
      <Row mt={50} justify="center" width="100%">
        <Button onClick={reloadPage} px={20} width="auto">
          {formatMessage(messages.closeMySession)}
        </Button>
      </Row>
    );
  }
  const showModulesButtons = isModuleIntervention && !isPreview;

  if (showModulesButtons)
    return (
      <Row mt={50} align="center" justify="end" width="100%" gap={15}>
        <StyledLink to={getBackToModulesUrl()}>
          <TextButton>{formatMessage(messages.goBackToModules)}</TextButton>
        </StyledLink>
        {nextSessionId && (
          <GhostLink to={nextSessionUrl}>
            <Button px={20} width="100%">
              {formatMessage(messages.goToNextModule)}
            </Button>
          </GhostLink>
        )}
      </Row>
    );

  return (
    <Row mt={50} justify="center" width="100%" gap={15}>
      {isPreview && (
        <StyledLink to={sessionMapUrl}>
          <Button onClick={closeOpenerTab} px={20} inverted>
            {formatMessage(messages.goToSessionMap)}
          </Button>
        </StyledLink>
      )}
      <StyledLink to={isPreview ? '#' : '/'}>
        <Button
          onClick={isPreview ? closeCurrentTab : undefined}
          px={20}
          width="100%"
        >
          {formatMessage(
            messages[
              isPreview && sharedTo === InterventionSharedTo.ANYONE
                ? 'closeMySession'
                : 'goToDashboard'
            ],
          )}
        </Button>
      </StyledLink>
    </Row>
  );
};

export default FinishScreenLayout;
