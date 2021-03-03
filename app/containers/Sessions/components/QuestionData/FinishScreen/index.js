import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import Column from 'components/Column';
import Row from 'components/Row';

import Button from 'components/Button';
import Tooltip from 'components/Tooltip';

import messages from './messages';

const FinishScreen = ({ intl: { formatMessage } }) => (
  <Column mt={10}>
    <Row mt={50} justify="center" width="100%">
      <Tooltip
        id="tooltip-finish-screen"
        content={formatMessage(messages.tooltip)}
      >
        <Button disabled px={20} width="100%">
          {formatMessage(messages.dashboard)}
        </Button>
      </Tooltip>
    </Row>
  </Column>
);

FinishScreen.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(FinishScreen);
