import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import Column from 'components/Column';
import Row from 'components/Row';
import Box from 'components/Box';
import Img from 'components/Img';
import cross from 'assets/svg/cross.svg';
import H1 from 'components/H1';
import Intervention from 'models/Intervention/Intervention';
import messages from './messages';
import ScreenListItem from '../ScreenListItem';

const BaseEditableIntervention = ({
  intl: { formatMessage },
  intervention,
}) => (
  <Row>
    <Column sm={5}>
      <Box padded>
        <Row mb={77}>
          <Img src={cross} mr={37} />
          <H1>{formatMessage(messages.pageTitle)}</H1>
        </Row>

        <Row>
          <Box width="100%" padded>
            {intervention.screens.map(screen => (
              <ScreenListItem type={screen.type} question={screen.question} />
            ))}
          </Box>
        </Row>
      </Box>
    </Column>
    <Column sm={7}>col2</Column>
  </Row>
);

BaseEditableIntervention.propTypes = {
  intl: PropTypes.object,
  intervention: PropTypes.shape(Intervention),
};

export default injectIntl(BaseEditableIntervention);
