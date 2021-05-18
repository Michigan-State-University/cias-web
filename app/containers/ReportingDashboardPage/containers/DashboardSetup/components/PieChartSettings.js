import React, { memo, useContext } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Markup } from 'interweave';

import { colors, themeColors } from 'theme';

import BinIcon from 'assets/svg/bin-no-bg.svg';

import { Col, Row } from 'components/ReactGridSystem';
import Icon from 'components/Icon';
import Text from 'components/Text';
import TextButton from 'components/Button/TextButton';
import H3 from 'components/H3';
import Button from 'components/Button';
import Circle from 'components/Circle';
import Tooltip from 'components/Tooltip';
import DashedButton from 'components/Button/DashedButton';

import PieChartFormulaOtherPattern from './PieChartFormulaOtherPattern';
import PieChartFormulaPattern from './PieChartFormulaPattern';

import { FullWidthContainer } from '../../../styled';
import messages from '../messages';
import { Input } from '../styled';
import { DashboardSectionsContext } from '../constants';

const PieChartSettings = ({
  chart,
  addPatternLoader,
  onAddFormulaPattern,
  onDelete,
  onDeleteFormulaPattern,
  onEditFormulaDefaultPattern,
  onEditDescription,
  onEditFormulaPattern,
  onEditFormulaPayload,
  onEditName,
}) => {
  const { formatMessage } = useIntl();

  const {
    loaders: { deleteChartLoader },
  } = useContext(DashboardSectionsContext);

  return (
    <FullWidthContainer>
      <Row justify="between" align="center">
        <Col xs="content">
          <H3>{formatMessage(messages.pieChartHeader)}</H3>
        </Col>

        <Col xs="content">
          <TextButton loading={deleteChartLoader} onClick={onDelete}>
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
            id={`ChartSettings-Tooltip-${chart.id}`}
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

      <Row mt={36}>
        <Col>
          <Text mb={5}>
            <Markup
              content={formatMessage(messages.chartSettingsNameLabel)}
              noWrap
            />
          </Text>
          <Input
            disabled={false}
            width="100%"
            height="50px"
            placeholder={formatMessage(messages.chartSettingsNamePlaceholder)}
            value={chart.name}
            onBlur={onEditName}
          />
        </Col>
      </Row>

      <Row mt={36}>
        <Col>
          <Text mb={5}>
            <Markup
              content={formatMessage(messages.chartSettingsDescriptionLabel)}
              noWrap
            />
          </Text>
          <Input
            disabled={false}
            width="100%"
            height="50px"
            placeholder={formatMessage(
              messages.chartSettingsDescriptionPlaceholder,
            )}
            value={chart.description ?? ''}
            onBlur={onEditDescription}
          />
        </Col>
      </Row>

      <Row mt={36}>
        <Col>
          <Text mb={5}>
            <Markup
              content={formatMessage(messages.chartSettingsFormulaLabel)}
              noWrap
            />
          </Text>
          <Input
            rows="5"
            type="multiline"
            disabled={false}
            width="100%"
            placeholder={formatMessage(
              messages.chartSettingsFormulaPlaceholder,
            )}
            value={chart.formula.payload}
            onBlur={onEditFormulaPayload}
          />
        </Col>
      </Row>

      <Row mt={36}>
        <Col>
          {chart.formula.patterns.map((pattern, index) => (
            <PieChartFormulaPattern
              key={`Pattern-${index}-Chart-${chart.id}`}
              pattern={pattern}
              onEdit={onEditFormulaPattern(index)}
              onDelete={onDeleteFormulaPattern(index)}
            />
          ))}
          <PieChartFormulaOtherPattern
            key={`OtherPattern-Chart-${chart.id}`}
            pattern={chart.formula.defaultPattern}
            onEdit={onEditFormulaDefaultPattern}
          />
        </Col>
      </Row>

      <Row mt={36}>
        <Col>
          <DashedButton
            onClick={onAddFormulaPattern}
            loading={addPatternLoader}
          >
            {formatMessage(messages.addNewCase)}
          </DashedButton>
        </Col>
      </Row>
    </FullWidthContainer>
  );
};

PieChartSettings.propTypes = {
  chart: PropTypes.object,
  addPatternLoader: PropTypes.bool,
  onAddFormulaPattern: PropTypes.func,
  onDelete: PropTypes.func,
  onDeleteFormulaPattern: PropTypes.func,
  onEditFormulaDefaultPattern: PropTypes.func,
  onEditDescription: PropTypes.func,
  onEditFormulaPattern: PropTypes.func,
  onEditFormulaPayload: PropTypes.func,
  onEditName: PropTypes.func,
};

export default memo(PieChartSettings);
