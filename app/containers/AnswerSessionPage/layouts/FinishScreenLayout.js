import React from 'react';
import PropTypes from 'prop-types';

import Button from 'components/Button';
import Row from 'components/Row';
import LocalStorageService from 'utils/localStorageService';
import { previewRegex } from 'global/constants/regex';

import { StyledLink } from './styled';
import messages from './messages';

const FinishScreenLayout = ({ formatMessage }) => {
  const isPreview = previewRegex.test(window.location.pathname);

  const handleClose = () => {
    window.opener = null;
    window.open('', '_self');
    window.close();
  };

  if (LocalStorageService.getState())
    return (
      <Row mt={50} justify="center" width="100%">
        <StyledLink to={isPreview ? '#' : '/'}>
          <Button
            onClick={isPreview ? handleClose : undefined}
            px={20}
            width="100%"
          >
            {formatMessage(messages.dashboard)}
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
