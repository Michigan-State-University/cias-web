import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { colors, themeColors } from 'theme';
import {
  makeSelectReportTemplatesErrors,
  makeSelectReportTemplatesLoaders,
  makeSelectThirdPartyReportTemplatesList,
} from 'global/reducers/reportTemplates';

import Text from 'components/Text';
import ErrorAlert from 'components/ErrorAlert';
import Spinner from 'components/Spinner';
import PillsSelect from 'components/Select/PillsSelect';

import messages from './messages';

const ReportChooser = ({
  formatMessage,
  reportTemplates,
  loaders: { fetchReportTemplatesLoading },
  errors: { fetchReportTemplatesError },
  value,
  onChange,
  disabled,
  isNarratorTab,
}) => {
  const selectData = useMemo(
    () => reportTemplates.map(({ name, id }) => ({ label: name, value: id })),
    [reportTemplates],
  );

  if (fetchReportTemplatesError) {
    return <ErrorAlert errorText={fetchReportTemplatesError} />;
  }

  if (fetchReportTemplatesLoading) {
    return <Spinner color={themeColors.secondary} />;
  }

  if (isNarratorTab) {
    return <></>;
  }

  return (
    <div>
      <Text textOpacity={0.7} mt={10} color={colors.bluewood}>
        {formatMessage(messages.reportsToSend)}
      </Text>
      {selectData.length === 0 && (
        <Text> {formatMessage(messages.noThirdPartyReports)}</Text>
      )}
      {selectData.length > 0 && (
        <PillsSelect
          data={selectData}
          addNewText={formatMessage(messages.addNewReport)}
          value={value}
          onSelected={onChange}
          emptyText={formatMessage(messages.zeroReportChosen)}
          disabled={disabled}
        />
      )}
    </div>
  );
};

ReportChooser.propTypes = {
  formatMessage: PropTypes.func,
  reportTemplates: PropTypes.array,
  loaders: PropTypes.object,
  errors: PropTypes.object,
  value: PropTypes.any,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  isNarratorTab: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loaders: makeSelectReportTemplatesLoaders(),
  errors: makeSelectReportTemplatesErrors(),
  reportTemplates: makeSelectThirdPartyReportTemplatesList(),
});

export default connect(mapStateToProps)(ReportChooser);
