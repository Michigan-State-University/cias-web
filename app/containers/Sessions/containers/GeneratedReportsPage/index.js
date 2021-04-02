import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { injectIntl, IntlShape } from 'react-intl';
import { Helmet } from 'react-helmet';

import AppContainer from 'components/Container';
import ReportsList from 'containers/Reports/containers/ReportsList';

import messages from './messages';

const GeneratedReportsPage = ({
  intl: { formatMessage },
  disableFilter,
  match,
}) => (
  <AppContainer>
    <Helmet>
      <title>{formatMessage(messages.pageTitle)}</title>
    </Helmet>
    <ReportsList match={match} disableFilter={disableFilter} />
  </AppContainer>
);

GeneratedReportsPage.propTypes = {
  intl: PropTypes.shape(IntlShape),
  disableFilter: PropTypes.bool,
  match: PropTypes.object,
};

export default compose(injectIntl)(GeneratedReportsPage);
