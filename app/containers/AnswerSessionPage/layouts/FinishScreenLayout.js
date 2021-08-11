import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import Button from 'components/Button';
import Row from 'components/Row';
import LocalStorageService from 'utils/localStorageService';
import { previewRegex } from 'global/constants/regex';

import { StyledLink } from './styled';
import messages from './messages';
import { makeSelectUserSession } from '../selectors';
import { getSessionMapUserPreviewUrl } from '../utils.ts';

const FinishScreenLayout = ({ formatMessage }) => {
  const { id: userSessionId } = useSelector(makeSelectUserSession());

  const sessionMapUrl = useMemo(
    () => getSessionMapUserPreviewUrl(userSessionId),
    [userSessionId],
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

  if (LocalStorageService.getState())
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
  return <></>;
};

FinishScreenLayout.propTypes = {
  formatMessage: PropTypes.func,
};

export default FinishScreenLayout;
