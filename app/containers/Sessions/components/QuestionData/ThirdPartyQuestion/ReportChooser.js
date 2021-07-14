import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Text from 'components/Text';
import { colors, themeColors } from 'theme';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import {
  makeSelectReportTemplatesErrors,
  makeSelectReportTemplatesLoaders,
  makeSelectThirdPartyReportTemplatesList,
} from 'global/reducers/reportTemplates';
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
};

const mapStateToProps = createStructuredSelector({
  loaders: makeSelectReportTemplatesLoaders(),
  errors: makeSelectReportTemplatesErrors(),
  reportTemplates: makeSelectThirdPartyReportTemplatesList(),
});

export default connect(mapStateToProps)(ReportChooser);
