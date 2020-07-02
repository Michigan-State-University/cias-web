import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';
import { Helmet } from 'react-helmet';

import reducer from '../EditInterventionPage/reducer';
import saga from '../EditInterventionPage/saga';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { colors } from 'theme';

import Box from 'components/Box';
import H3 from 'components/H3';

import { makeSelectIntervention } from 'containers/Interventions/containers/EditInterventionPage/selectors';
import {
  editInterventionRequest,
  getInterventionRequest,
} from 'containers/Interventions/containers/EditInterventionPage/actions';

import { StyledColumn, Input, NameContainer } from './styled';
import messages from './messages';

import Option from './components/Option';

const mockSettings = {
  voice: true,
  animatedCharacter: true,
};

const SettingsInterventionPage = ({
  intervention: { name, settings },
  match: { params },
  getIntervention,
  intl: { formatMessage },
  editIntervention,
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
          {map(mockSettings, (option, index) => (
            <Option
              key={`el-option-${index}`}
              // fontWeight={index === 'narratorActive' ? 'bold' : 'regular'}
              withBorder={index !== 'animatedCharacter'}
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

SettingsInterventionPage.propTypes = {};

SettingsInterventionPage.defualtProps = {};

const mapStateToProps = createStructuredSelector({
  intervention: makeSelectIntervention(),
});

const mapDispatchToProps = {
  editIntervention: editInterventionRequest,
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
