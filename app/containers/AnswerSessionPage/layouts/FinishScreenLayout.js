import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import LocalStorageService from 'utils/localStorageService';
import { previewRegex } from 'global/constants/regex';
import { InterventionType } from 'models/Intervention';

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

const FinishScreenLayout = ({ formatMessage, question }) => {
  const { id: userSessionId, interventionType } = useSelector(
    makeSelectUserSession(),
  );
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

  if (LocalStorageService.getState()) {
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
            {formatMessage(messages.goToDashboard)}
          </Button>
        </StyledLink>
      </Row>
    );
  }
  return <></>;
};

FinishScreenLayout.propTypes = {
  question: PropTypes.object,
  formatMessage: PropTypes.func,
};

export default FinishScreenLayout;
