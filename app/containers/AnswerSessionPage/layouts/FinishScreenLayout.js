import React from 'react';
import PropTypes from 'prop-types';

import Button from 'components/Button';
import Row from 'components/Row';
import LocalStorageService from 'utils/localStorageService';

import { StyledLink } from './styled';
import messages from './messages';

const FinishScreenLayout = ({ formatMessage }) => {
  if (LocalStorageService.getState())
    return (
      <Row mt={50} justify="center" width="100%">
        <StyledLink to="/">
          <Button px={20} width="100%">
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
