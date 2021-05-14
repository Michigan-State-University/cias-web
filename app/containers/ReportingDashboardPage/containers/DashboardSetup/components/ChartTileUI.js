import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { colors } from 'theme';

import { Col, Row } from 'components/ReactGridSystem';

import { FullWidthContainer } from '../../../styled';
import { HoverableBox } from '../styled';

const ChartTileUI = ({ chart, onClick, isSelected }) => {
  const handleOnClick = () => onClick(chart.id);

  return (
    <HoverableBox
      bg={colors.white}
      width={400}
      height={300}
      onClick={handleOnClick}
      $isSelected={isSelected}
      clickable
    >
      <FullWidthContainer height="100%">
        <Row align="center" justify="center" height="100%">
          <Col xs="content">{JSON.stringify(chart)}</Col>
        </Row>
      </FullWidthContainer>
    </HoverableBox>
  );
};

ChartTileUI.propTypes = {
  chart: PropTypes.object,
  onClick: PropTypes.func,
  isSelected: PropTypes.bool,
};

export default memo(ChartTileUI);
