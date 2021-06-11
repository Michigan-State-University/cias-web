import React, { memo, useCallback, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import { colors, themeColors } from 'theme';

import {
  ChartStatus,
  ChartStatusToColorMap,
} from 'global/reducers/dashboardSections';

import BinIcon from 'assets/svg/bin-no-bg.svg';
import CopyIcon from 'assets/svg/copy.svg';

import { Col, Row } from 'components/ReactGridSystem';
import H3 from 'components/H3';
import TextButton from 'components/Button/TextButton';
import Icon from 'components/Icon';
import Text from 'components/Text';
import Button from 'components/Button';
import Tooltip from 'components/Tooltip';
import Circle from 'components/Circle';

import InfoBox from 'components/Box/InfoBox';
import { Markup } from 'interweave';
import Badge from 'components/Badge';
import messages from '../messages';
import { FullWidthContainer } from '../../../styled';
import { ChartSettingsContext } from '../constants';

const ChartSettingsTopSection = ({
  chartStatus,
  chartType,
  isChangingStatus,
  isDeleting,
  onChangeStatus,
  onDelete,
  hasFormula,
  onCopyChart,
}) => {
  const { formatMessage } = useIntl();

  const { statusPermissions } = useContext(ChartSettingsContext);

  const handleStatusChange = () => {
    switch (chartStatus) {
      case ChartStatus.DRAFT:
        onChangeStatus(ChartStatus.DATA_COLLECTION);
        break;

      case ChartStatus.DATA_COLLECTION:
        onChangeStatus(ChartStatus.PUBLISHED);
        break;

      default:
        break;
    }
  };

  const buttonStyles = useMemo(() => {
    switch (chartStatus) {
      case ChartStatus.DATA_COLLECTION:
        return { fontColor: colors.white, color: colors.pistachio };

      case ChartStatus.DRAFT:
      default:
        return {};
    }
  }, [chartStatus]);

  const buttonContent = useMemo(() => {
    switch (chartStatus) {
      case ChartStatus.DRAFT:
        return formatMessage(messages.chartSettingsStartCollectButton);

      case ChartStatus.DATA_COLLECTION:
        return formatMessage(messages.chartSettingsPublishButton);

      default:
        return '';
    }
  }, [chartStatus]);

  const changeStatusButtonDisabled = useMemo(() => {
    if (chartStatus === ChartStatus.DRAFT && !hasFormula) return true;
    return false;
  }, [chartStatus, hasFormula]);

  const renderButtonOrStatusBadge = useCallback(() => {
    switch (chartStatus) {
      case ChartStatus.DRAFT:
      case ChartStatus.DATA_COLLECTION:
        return (
          <Button
            onClick={handleStatusChange}
            disabled={changeStatusButtonDisabled}
            loading={isChangingStatus}
            hoverable
            width="100%"
            px={10}
            {...buttonStyles}
          >
            {buttonContent}
          </Button>
        );

      default:
        return (
          <Badge bg={ChartStatusToColorMap[chartStatus]} color={colors.white}>
            {formatMessage(messages.chartStatus, { chartStatus })}
          </Badge>
        );
    }
  }, [chartStatus, handleStatusChange, isChangingStatus]);

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

        <Col xs="content">{renderButtonOrStatusBadge()}</Col>

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

      <Row mr="0!important" mt={36} justify="end">
        <Col xs="content">
          <TextButton onClick={onCopyChart}>
            <Row justify="end">
              <Icon src={CopyIcon} fill={themeColors.secondary} mr={8} />
              <Text fontWeight="bold" color={themeColors.secondary}>
                {formatMessage(messages.chartSettingsCopy)}
              </Text>
            </Row>
          </TextButton>
        </Col>
      </Row>

      {!statusPermissions.canBeEdited && (
        <Row mt={36}>
          <Col>
            <InfoBox>
              <Markup
                content={formatMessage(messages.chartSettingsNotEditableInfo)}
                noWrap
              />

              {chartStatus === ChartStatus.DATA_COLLECTION && (
                <>
                  <br />
                  <br />
                  <Markup
                    content={formatMessage(messages.chartSettingsPublishInfo)}
                    noWrap
                  />
                </>
              )}
            </InfoBox>
          </Col>
        </Row>
      )}
    </FullWidthContainer>
  );
};

ChartSettingsTopSection.propTypes = {
  chartStatus: PropTypes.string,
  chartType: PropTypes.string,
  isChangingStatus: PropTypes.bool,
  isDeleting: PropTypes.bool,
  onChangeStatus: PropTypes.func,
  onDelete: PropTypes.func,
  onCopyChart: PropTypes.func,
  hasFormula: PropTypes.bool,
};

export default memo(ChartSettingsTopSection);
