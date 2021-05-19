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
  changeStatusLoader,
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

  const { chartType, formula, id, status } = chart;

  const {
    loaders: { deleteChartLoader },
  } = useContext(DashboardSectionsContext);

  return (
    <FullWidthContainer>
      <ChartSettingsTopSection
        chartStatus={status}
        chartType={chartType}
        isChangingStatus={changeStatusLoader}
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
          {formula.patterns.map((pattern, index) => (
            <PieChartFormulaPattern
              key={`Pattern-${index}-Chart-${id}`}
              pattern={pattern}
              onEdit={onEditFormulaPattern(index)}
              onDelete={onDeleteFormulaPattern(index)}
            />
          ))}
          <PieChartFormulaOtherPattern
            key={`OtherPattern-Chart-${id}`}
            pattern={formula.defaultPattern}
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
  changeStatusLoader: PropTypes.bool,
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
