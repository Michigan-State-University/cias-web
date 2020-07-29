import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useInjectSaga } from 'utils/injectSaga';
import { compose } from 'redux';

import CloseIcon from 'components/CloseIcon';
import Img from 'components/Img';
import Row from 'components/Row';
import Tabs from 'components/Tabs';
import eye from 'assets/svg/eye.svg';
import { Button } from 'components/Button';
import { StyledInput } from 'components/Input/StyledInput';
import { makeSelectQuestionsLength } from 'containers/Interventions/containers/EditInterventionPage/selectors';

import {
  editInterventionRequest,
  makeSelectIntervention,
  editInterventionSaga,
} from 'global/reducers/intervention';

import messages from './messages';
import { StyledLink } from './styled';

const getActiveTab = (path, formatMessage) => {
  if (path.includes('/edit')) return formatMessage(messages.content);
  if (path.includes('/settings')) return formatMessage(messages.settings);
  return formatMessage(messages.sharing);
};

const InterventionNavbar = ({
  intervention: { name, id },
  updateInterventionName,
  intl: { formatMessage },
  location: { pathname },
  questionsLength,
}) => {
  useInjectSaga({ key: 'editIntervention', saga: editInterventionSaga });

  const [tabActive, setTabActive] = useState(
    getActiveTab(pathname, formatMessage),
  );
  useEffect(() => {
    setTabActive(getActiveTab(pathname, formatMessage));
  }, [pathname]);

  const previewDisabled = !questionsLength;

  return (
    <Row align="center" justify="between" width="100%" mr={35}>
      <Row align="center">
        <CloseIcon to="/" />
        <StyledInput
          px={12}
          py={6}
          width="400px"
          value={name}
          fontSize={23}
          placeholder={formatMessage(messages.placeholder)}
          onBlur={val => updateInterventionName({ path: 'name', value: val })}
          maxWidth="none"
        />
      </Row>

      <Tabs
        display="flex"
        align="center"
        controlledTabActive={tabActive}
        controlledSetTabActive={setTabActive}
        controlled
      >
        <div
          renderAsLink={
            <StyledLink to={`/interventions/${id}/edit`}>
              {formatMessage(messages.content)}
            </StyledLink>
          }
        />
        <div
          renderAsLink={
            <StyledLink to={`/interventions/${id}/settings`}>
              {formatMessage(messages.settings)}
            </StyledLink>
          }
        />
        <div
          renderAsLink={
            <StyledLink to="/">{formatMessage(messages.sharing)}</StyledLink>
          }
        />
      </Tabs>
      <StyledLink
        to={`/interventions/${id}/preview`}
        target="_blank"
        disabled={previewDisabled}
      >
        <Button
          disabled={previewDisabled}
          inverted
          width="auto"
          height={35}
          color="secondary"
          borderRadius={5}
          px={11}
        >
          <Img src={eye} alt="eye" mr={6} />
          <FormattedMessage {...messages.preview} />
        </Button>
      </StyledLink>
    </Row>
  );
};

InterventionNavbar.propTypes = {
  intervention: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
  }),
  updateInterventionName: PropTypes.func,
  intl: intlShape,
  path: PropTypes.string,
  location: PropTypes.object,
  questionsLength: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  intervention: makeSelectIntervention(),
  questionsLength: makeSelectQuestionsLength(),
});

const mapDispatchToProps = {
  updateInterventionName: editInterventionRequest,
};

export const InterventionNavbarWithIntl = injectIntl(InterventionNavbar);

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(InterventionNavbarWithIntl);
