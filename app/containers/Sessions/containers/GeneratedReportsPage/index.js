import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { injectIntl, intlShape } from 'react-intl';
import { Helmet } from 'react-helmet';

import AppContainer from 'components/Container';
import ReportsList from 'containers/Reports/containers/ReportsList';

import messages from './messages';

const GeneratedReportsPage = ({ intl: { formatMessage }, disableFilter }) => (
  <AppContainer>
    <Helmet>
      <title>{formatMessage(messages.pageTitle)}</title>
    </Helmet>
    <ReportsList disableFilter={disableFilter} />
  </AppContainer>
);

GeneratedReportsPage.propTypes = {
  intl: intlShape,
  disableFilter: PropTypes.bool,
};

export default compose(injectIntl)(GeneratedReportsPage);
