import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl, intlShape } from 'react-intl';

import Box from 'components/Box';
import H3 from 'components/H3';
import { colors } from 'theme';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { makeSelectIntervention } from 'containers/Interventions/containers/EditInterventionPage/selectors';
import {
  editInterventionRequest,
  getInterventionRequest,
  getQuestionsRequest,
} from 'containers/Interventions/containers/EditInterventionPage/actions';

import Option from './components/Option';
import messages from './messages';
import reducer from '../EditInterventionPage/reducer';
import saga from '../EditInterventionPage/saga';
import { StyledColumn, Input, NameContainer } from './styled';

const lastKey = obj => Object.keys(obj)[Object.keys(obj).length - 1];

const SettingsInterventionPage = ({
  intervention: { id, name, settings: { narrator: narratorSettings } = {} },
  match: { params },
  getIntervention,
  intl: { formatMessage },
  editIntervention,
  getQuestions,
}) => {
  useInjectReducer({ key: 'editInterventionPage', reducer });
  useInjectSaga({ key: 'editInterventionPage', saga });

  useEffect(() => {
    getIntervention(params.id);
  }, []);

  return (
    <Fragment>
      <Helmet>
        <title>{formatMessage(messages.pageTitle)}</title>
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
          <NameContainer>
            <H3 mb={5} fontWeight="regular">
              {formatMessage(messages.nameLabel)}
            </H3>
            <Input
              width="100%"
              placeholder={formatMessage(messages.placeholder)}
              value={name}
              onBlur={val => editIntervention({ path: 'name', value: val })}
            />
          </NameContainer>
          <H3 mt={30} mb={20}>
            {formatMessage(messages.narratorSettings)}
          </H3>
          {map(narratorSettings, (option, index) => (
            <Option
              refetchQuestions={() => getQuestions(id)}
              key={`el-option-${index}`}
              withBorder={index !== lastKey(narratorSettings)}
              label={formatMessage(messages[index])}
              value={option}
              action={editIntervention}
              index={index}
            />
          ))}
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
    }),
  }),
  match: PropTypes.object,
  getIntervention: PropTypes.func,
  intl: intlShape,
  editIntervention: PropTypes.func,
  getQuestions: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  intervention: makeSelectIntervention(),
});

const mapDispatchToProps = {
  editIntervention: editInterventionRequest,
  getIntervention: getInterventionRequest,
  getQuestions: getQuestionsRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  injectIntl,
  withConnect,
)(SettingsInterventionPage);
