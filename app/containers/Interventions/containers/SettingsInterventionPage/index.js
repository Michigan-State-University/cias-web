import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl, intlShape } from 'react-intl';

import Box from 'components/Box';
import { colors } from 'theme';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import {
  getInterventionRequest,
  interventionReducer,
  makeSelectIntervention,
  getInterventionSaga,
} from 'global/reducers/intervention';

import InterventionSettings from './components/InterventionSettings';
import messages from './messages';
import { StyledColumn } from './styled';

const SettingsInterventionPage = ({
  intervention: { name, settings: { narrator: narratorSettings } = {} },
  match: { params },
  getIntervention,
  intl: { formatMessage },
}) => {
  useInjectReducer({ key: 'intervention', reducer: interventionReducer });
  useInjectSaga({ key: 'getIntervention', saga: getInterventionSaga });

  useEffect(() => {
    getIntervention({
      problemId: params.problemId,
      interventionId: params.interventionId,
    });
  }, []);

  return (
    <Fragment>
      <Helmet>
        <title>{formatMessage(messages.pageTitle, { name })}</title>
      </Helmet>
      <Box
        width="100%"
        height="100%"
        display="flex"
        justify="center"
        align="center"
        pt={40}
        pb={100}
        bg={colors.zirkon}
      >
        <StyledColumn height="100%">
          <InterventionSettings
            name={name}
            narratorSettings={narratorSettings}
            formatMessage={formatMessage}
          />
        </StyledColumn>
      </Box>
    </Fragment>
  );
};

SettingsInterventionPage.propTypes = {
  intervention: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    settings: PropTypes.shape({
      narrator: PropTypes.shape({
        voice: PropTypes.bool,
        narrator: PropTypes.bool,
      }),
      account_required: PropTypes.bool,
    }),
  }),
  match: PropTypes.object,
  getIntervention: PropTypes.func,
  intl: intlShape,
};

const mapStateToProps = createStructuredSelector({
  intervention: makeSelectIntervention(),
});

const mapDispatchToProps = {
  getIntervention: getInterventionRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  injectIntl,
  withConnect,
)(SettingsInterventionPage);
