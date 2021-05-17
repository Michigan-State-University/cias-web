import React, { memo, useContext, useEffect, useState } from 'react';
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
import { DEFAULT_COLORS } from 'components/ReactColor';

import FormulaCase from './FormulaPattern';
import FormulaOtherCase from './FormulaOtherPattern';

import { FullWidthContainer } from '../../../styled';
import messages from '../messages';
import { Input } from '../styled';
import { DashboardSectionsContext } from '../constants';

// TODO: use useCallback
const PieChartSettings = ({ chart, onEdit, onDelete }) => {
  const { formatMessage } = useIntl();

  const [isAddingPattern, setIsAddingPattern] = useState(false);

  const {
    loaders: { deleteChartLoader, editChartLoader },
  } = useContext(DashboardSectionsContext);

  useEffect(() => {
    if (isAddingPattern && !editChartLoader) setIsAddingPattern(false);
  }, [editChartLoader]);

  const onEditFormula = field => value =>
    onEdit('formula')({ ...chart.formula, [field]: value });

  const onEditFormulaPayload = onEditFormula('payload');

  const onEditFormulaPattern = index => newPattern =>
    onEditFormula('patterns')(
      chart.formula.patterns.map((pattern, i) => {
        if (index === i) return newPattern;

        return pattern;
      }),
    );

  const onDeleteFormulaPattern = index => () =>
    onEditFormula('patterns')(
      chart.formula.patterns.filter((_, i) => index !== i),
    );

  const onAddFormulaPattern = () => {
    setIsAddingPattern(true);

    onEditFormula('patterns')([
      ...chart.formula.patterns,
      {
        label: '',
        color:
          DEFAULT_COLORS[chart.formula.patterns.length] ??
          themeColors.secondary,
        match: '=',
      },
    ]);
  };

  const onEditDefaultFormulaPattern = pattern =>
    onEditFormula('defaultPattern')(pattern);

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
            onBlur={onEdit('name')}
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
            onBlur={onEdit('description')}
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
            <FormulaCase
              key={`Pattern-${index}-Chart-${chart.id}`}
              pattern={pattern}
              onEdit={onEditFormulaPattern(index)}
              onDelete={onDeleteFormulaPattern(index)}
            />
          ))}
          <FormulaOtherCase
            key={`OtherPattern-Chart-${chart.id}`}
            pattern={chart.formula.defaultPattern}
            onEdit={onEditDefaultFormulaPattern}
          />
        </Col>
      </Row>

      <Row mt={36}>
        <Col>
          <DashedButton onClick={onAddFormulaPattern} loading={isAddingPattern}>
            {formatMessage(messages.addNewCase)}
          </DashedButton>
        </Col>
      </Row>
    </FullWidthContainer>
  );
};

PieChartSettings.propTypes = {
  chart: PropTypes.object,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default memo(PieChartSettings);
