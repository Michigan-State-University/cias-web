import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { useInjectSaga } from 'utils/injectSaga';
import { compose } from 'redux';

import CloseIcon from 'components/CloseIcon';
import Row from 'components/Row';
import Tabs from 'components/Tabs';
import { StyledInput } from 'components/Input/StyledInput';
import Spinner from 'components/Spinner';
import PreviewButton from 'components/PreviewButton';
import Img from 'components/Img';
import {
  makeSelectQuestionsLength,
  makeSelectSelectedQuestionIndex,
} from 'global/reducers/questions';

import {
  editInterventionRequest,
  makeSelectIntervention,
  editInterventionSaga,
  makeSelectInterventionEditLoader,
} from 'global/reducers/intervention';

import { themeColors } from 'theme';
import check from 'assets/svg/check.svg';
import messages from './messages';
import {
  StyledLink,
  SaveInfoContainer,
  SavingContainer,
  CheckBackground,
} from './styled';

const getActiveTab = (path, formatMessage) => {
  if (path.includes('/edit')) return formatMessage(messages.content);
  if (path.includes('/settings')) return formatMessage(messages.settings);
  return formatMessage(messages.sharing);
};

const InterventionNavbar = ({
  intervention: { name },
  updateInterventionName,
  intl: { formatMessage },
  location: { pathname },
  questionsLength,
  selectedQuestion,
  interventionEditing,
  match: { params },
}) => {
  const { problemId, interventionId } = params;

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
        <CloseIcon to={`/interventions/${problemId}`} />
        <SaveInfoContainer>
          {interventionEditing && (
            <SavingContainer>
              <Spinner color={themeColors.secondary} />
              <FormattedMessage {...messages.saving} />
            </SavingContainer>
          )}
          {!interventionEditing && (
            <SaveInfoContainer
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <CheckBackground>
                <Img src={check} />
              </CheckBackground>
              <FormattedMessage {...messages.saved} />
            </SaveInfoContainer>
          )}
        </SaveInfoContainer>
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
            <StyledLink
              to={`/interventions/${problemId}/sessions/${interventionId}/edit`}
            >
              {formatMessage(messages.content)}
            </StyledLink>
          }
        />
        <div
          renderAsLink={
            <StyledLink
              to={`/interventions/${problemId}/sessions/${interventionId}/settings`}
            >
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
      <PreviewButton
        to={`/interventions/${problemId}/sessions/${interventionId}/preview/${selectedQuestion}`}
        previewDisabled={previewDisabled}
        text={formatMessage(messages.previewCurrent)}
        target="_blank"
      />
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
  location: PropTypes.object,
  questionsLength: PropTypes.number,
  selectedQuestion: PropTypes.number,
  interventionEditing: PropTypes.bool,
  match: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  intervention: makeSelectIntervention(),
  questionsLength: makeSelectQuestionsLength(),
  selectedQuestion: makeSelectSelectedQuestionIndex(),
  interventionEditing: makeSelectInterventionEditLoader(),
});

const mapDispatchToProps = {
  updateInterventionName: editInterventionRequest,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(InterventionNavbar);
