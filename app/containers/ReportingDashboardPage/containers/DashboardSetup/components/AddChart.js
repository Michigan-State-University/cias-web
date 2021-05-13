import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import { colors } from 'theme';

import { Col, Row } from 'components/ReactGridSystem';
import Box from 'components/Box';

import { FullWidthContainer } from '../../../styled';
import messages from '../messages';

const AddChart = ({ onAddChart }) => {
  const { formatMessage } = useIntl();

  return (
    <FullWidthContainer>
      <Row>
        <Col>
          <Box
            bg={colors.linkWater}
            width={500}
            height={300}
            onClick={onAddChart}
          >
            <FullWidthContainer>
              <Row>
                <Col>{formatMessage(messages.addChart)}</Col>
              </Row>
            </FullWidthContainer>
          </Box>
        </Col>
      </Row>
    </FullWidthContainer>
  );
};

AddChart.propTypes = {
  onAddChart: PropTypes.func,
};

export default memo(AddChart);
