import React, { memo, useContext } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import { Col, Row } from 'components/ReactGridSystem';
import DashedButton from 'components/Button/DashedButton';

import ChartSettingsGeneralSection from './ChartSettingsGeneralSection';
import ChartSettingsTopSection from './ChartSettingsTopSection';
import PieChartFormulaOtherPattern from './PieChartFormulaOtherPattern';
import PieChartFormulaPattern from './PieChartFormulaPattern';

import { FullWidthContainer } from '../../../styled';
import messages from '../messages';
import { ChartSettingsContext, DashboardSectionsContext } from '../constants';

const PieChartSettings = ({
  chart,
  addPatternLoader,
  onAddFormulaPattern,
  onDelete,
  onDeleteFormulaPattern,
  onEditDescription,
  onEditFormulaDefaultPattern,
  onEditFormulaPattern,
  onEditFormulaPayload,
  onEditName,
  onEditStatus,
}) => {
  const { formatMessage } = useIntl();

  const {
    statusPermissions: { canBeEdited },
  } = useContext(ChartSettingsContext);

  const {
    loaders: { deleteChartLoader },
  } = useContext(DashboardSectionsContext);

  return (
    <FullWidthContainer>
      <ChartSettingsTopSection
        chartStatus={chart.status}
        chartType={chart.chartType}
        isDeleting={deleteChartLoader}
        onChangeStatus={onEditStatus}
        onDelete={onDelete}
      />

      <ChartSettingsGeneralSection
        chart={chart}
        onEditDescription={onEditDescription}
        onEditFormulaPayload={onEditFormulaPayload}
        onEditName={onEditName}
      />

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
            disabled={!canBeEdited}
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
  onEditDescription: PropTypes.func,
  onEditFormulaDefaultPattern: PropTypes.func,
  onEditFormulaPattern: PropTypes.func,
  onEditFormulaPayload: PropTypes.func,
  onEditName: PropTypes.func,
  onEditStatus: PropTypes.func,
};

export default memo(PieChartSettings);
