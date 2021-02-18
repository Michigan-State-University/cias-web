import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useInjectSaga } from 'redux-injectors';

import Row from 'components/Row';
import Tabs from 'components/Tabs';
import { StyledInput } from 'components/Input/StyledInput';
import Spinner from 'components/Spinner';
import PreviewButton from 'components/PreviewButton';
import Img from 'components/Img';
import Box from 'components/Box';
import Circle from 'components/Circle';
import ActionIcon from 'components/ActionIcon';
import {
  makeSelectQuestionsLength,
  makeSelectSelectedQuestionId,
} from 'global/reducers/questions';
import {
  editSessionRequest,
  makeSelectSession,
  editSessionSaga,
  makeSelectSessionEditLoader,
} from 'global/reducers/session';
import { makeSelectQuestionGroupsLoader } from 'global/reducers/questionGroups';
import { colors, themeColors } from 'theme';
import check from 'assets/svg/check-green.svg';

import backButton from 'assets/svg/arrow-black.svg';
import { makeSelectInterventionStatus } from 'global/reducers/intervention';
import { canEdit, canPreview } from 'models/Status/statusPermissions';
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
  if (path.includes('/report-templates'))
    return formatMessage(messages.reportTemplates);
  return formatMessage(messages.sharing);
};

const InterventionNavbar = ({
  session: { name, reportsCount },
  updateSessionName,
  intl: { formatMessage },
  location: { pathname },
  questionsLength,
  selectedQuestion,
  interventionEditing,
  questionGroupsEditing,
  interventionStatus,
  match: { params },
}) => {
  const { interventionId, sessionId } = params;

  useInjectSaga({ key: 'editSession', saga: editSessionSaga });
  const [tabActive, setTabActive] = useState(
    getActiveTab(pathname, formatMessage),
  );
  useEffect(() => {
    setTabActive(getActiveTab(pathname, formatMessage));
  }, [pathname]);

  const previewDisabled = !questionsLength || !canPreview(interventionStatus);

  const editingPossible = canEdit(interventionStatus);

  const isSaving = questionGroupsEditing || interventionEditing;

  return (
    <Row align="center" justify="between" width="100%" mr={35}>
      <Row align="center">
        <ActionIcon
          to={`/interventions/${interventionId}`}
          iconSrc={backButton}
        />
        <StyledInput
          disabled={!editingPossible}
          px={12}
          py={6}
          width="400px"
          value={name}
          fontSize={23}
          placeholder={formatMessage(messages.placeholder)}
          onBlur={val =>
            updateSessionName({ path: 'name', value: val }, ['name'])
          }
          maxWidth={280}
        />
      </Row>
      <Tabs
        display="flex"
        align="center"
        controlledTabActive={tabActive}
        controlledSetTabActive={setTabActive}
        controlled
        minWidth={310}
      >
        <div
          renderAsLink={
            <StyledLink
              to={`/interventions/${interventionId}/sessions/${sessionId}/edit`}
            >
              {formatMessage(messages.content)}
            </StyledLink>
          }
        />
        <div
          renderAsLink={
            <StyledLink
              to={`/interventions/${interventionId}/sessions/${sessionId}/settings`}
            >
              {formatMessage(messages.settings)}
            </StyledLink>
          }
        />
        <div
          linkMatch={formatMessage(messages.reportTemplates)}
          renderAsLink={
            <StyledLink
              to={`/interventions/${interventionId}/sessions/${sessionId}/report-templates`}
            >
              <Row align="center">
                {formatMessage(messages.reportTemplates)}
                <Circle
                  bg={themeColors.secondary}
                  color={colors.white}
                  child={reportsCount ?? 0}
                  size="16px"
                  fontSize={11}
                  ml={5}
                />
              </Row>
            </StyledLink>
          }
        />
      </Tabs>
      <Box display="flex" align="center">
        <SaveInfoContainer>
          {isSaving && (
            <SavingContainer>
              <Spinner color={themeColors.secondary} />
              <FormattedMessage {...messages.saving} />
            </SavingContainer>
          )}
          {!isSaving && (
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
        <PreviewButton
          to={`/interventions/${interventionId}/sessions/${sessionId}/preview/${selectedQuestion}`}
          previewDisabled={previewDisabled}
          text={formatMessage(messages.previewCurrent)}
          target="_blank"
        />
      </Box>
    </Row>
  );
};

InterventionNavbar.propTypes = {
  session: PropTypes.shape({
    name: PropTypes.string,
    reportsCount: PropTypes.number,
    id: PropTypes.string,
  }),
  updateSessionName: PropTypes.func,
  intl: intlShape,
  location: PropTypes.object,
  questionsLength: PropTypes.number,
  selectedQuestion: PropTypes.string,
  interventionEditing: PropTypes.bool,
  questionGroupsEditing: PropTypes.bool,
  match: PropTypes.object,
  interventionStatus: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  session: makeSelectSession(),
  questionsLength: makeSelectQuestionsLength(),
  selectedQuestion: makeSelectSelectedQuestionId(),
  interventionEditing: makeSelectSessionEditLoader(),
  questionGroupsEditing: makeSelectQuestionGroupsLoader(),
  interventionStatus: makeSelectInterventionStatus(),
});

const mapDispatchToProps = {
  updateSessionName: editSessionRequest,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(InterventionNavbar);
