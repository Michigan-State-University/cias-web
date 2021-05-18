/* eslint-disable no-unused-vars */
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import { colors, themeColors } from 'theme';

import BinIcon from 'assets/svg/bin-no-bg.svg';

import { Col, Row } from 'components/ReactGridSystem';
import H3 from 'components/H3';
import TextButton from 'components/Button/TextButton';
import Icon from 'components/Icon';
import Text from 'components/Text';
import Button from 'components/Button';
import Tooltip from 'components/Tooltip';
import Circle from 'components/Circle';

import messages from '../messages';
import { FullWidthContainer } from '../../../styled';

const ChartSettingsTopPanel = ({
  chartStatus,
  chartType,
  isDeleting,
  onChangeStatus,
  onDelete,
}) => {
  const { formatMessage } = useIntl();

  return (
    <FullWidthContainer>
      <Row justify="between" align="center">
        <Col xs="content">
          <H3>{formatMessage(messages.chartSettingsHeader, { chartType })}</H3>
        </Col>

        <Col xs="content">
          <TextButton loading={isDeleting} onClick={onDelete}>
            <Row align="center">
              <Icon src={BinIcon} fill={colors.flamingo} mr={8} />
              <Text fontWeight="bold" color={colors.flamingo}>
                {formatMessage(messages.chartSettingsDelete)}
              </Text>
            </Row>
          </TextButton>
        </Col>

        <Col xs="content">
          <Button
            type="submit"
            disabled={false}
            loading={false}
            hoverable
            width="100%"
            px={10}
          >
            {formatMessage(messages.chartSettingsStartCollectButton)}
          </Button>
        </Col>

        <Col xs="content">
          <Tooltip
            id="ChartSettings-Tooltip"
            text={formatMessage(messages.chartSettingsStartCollectHelper)}
          >
            <Circle
              bg={themeColors.secondary}
              color={colors.white}
              size="16px"
              fontWeight="bold"
              fontSize={11}
              child="?"
            />
          </Tooltip>
        </Col>
      </Row>
    </FullWidthContainer>
  );
};

ChartSettingsTopPanel.propTypes = {
  chartStatus: PropTypes.string,
  chartType: PropTypes.string,
  isDeleting: PropTypes.bool,
  onChangeStatus: PropTypes.func,
  onDelete: PropTypes.func,
};

export default memo(ChartSettingsTopPanel);
