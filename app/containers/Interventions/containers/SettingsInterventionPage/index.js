import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import some from 'lodash/some';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl, intlShape } from 'react-intl';

import Box from 'components/Box';
import H3 from 'components/H3';
import lastKey from 'utils/getLastKey';
import { colors } from 'theme';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { getQuestionsRequest } from 'containers/Interventions/containers/EditInterventionPage/actions';

import {
  editInterventionRequest,
  getInterventionRequest,
  interventionReducer,
  editInterventionSaga,
  makeSelectIntervention,
  getInterventionSaga,
} from 'global/reducers/intervention';

import Option from './components/Option';
import messages from './messages';
import { StyledColumn, Input, NameContainer } from './styled';

const SettingsInterventionPage = ({
  intervention: { id, name, settings: { narrator: narratorSettings } = {} },
  match: { params },
  getIntervention,
  intl: { formatMessage },
  editIntervention,
  getQuestions,
}) => {
  useInjectReducer({ key: 'intervention', reducer: interventionReducer });
  useInjectSaga({ key: 'editIntervention', saga: editInterventionSaga });
  useInjectSaga({ key: 'getIntervention', saga: getInterventionSaga });

  useEffect(() => {
    getIntervention(params.id);
  }, []);

  const refetchQuestions = () => getQuestions(id);

  const isNarratorActive = some(narratorSettings, setting => setting);

  const onToggle = index => val => {
    editIntervention({ path: `settings.narrator.${index}`, value: val });
    refetchQuestions();
  };

  const onGlobalToggle = val => {
    editIntervention({
      path: `settings.narrator`,
      value: {
        voice: val,
        animation: val,
      },
    });
    refetchQuestions();
  };

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
          {narratorSettings && (
            <Option
              label={formatMessage(messages.narratorActive)}
              withBorder={isNarratorActive}
              value={isNarratorActive}
              action={onGlobalToggle}
              fontWeight="bold"
            />
          )}
          {isNarratorActive &&
            map(narratorSettings, (option, index) => (
              <Option
                key={`el-option-${index}`}
                withBorder={index !== lastKey(narratorSettings)}
                label={formatMessage(messages[index])}
                value={option}
                action={onToggle(index)}
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
