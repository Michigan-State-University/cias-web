import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, IntlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useInjectSaga } from 'redux-injectors';

import Row from 'components/Row';
import Tabs from 'components/Tabs';
import { StyledInput } from 'components/Input/StyledInput';
import { selectInputText } from 'components/Input/utils';
import Spinner from 'components/Spinner';
import PreviewButton from 'components/PreviewButton';
import Img from 'components/Img';
import Box from 'components/Box';
import ActionIcon from 'components/ActionIcon';
import Circle from 'components/Circle';

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
import { makeSelectReportsSize } from 'global/reducers/generatedReports';
import { makeSelectQuestionGroupsLoader } from 'global/reducers/questionGroups';
import { makeSelectReportTemplatesLoaders } from 'global/reducers/reportTemplates';
import { makeSelectUserId } from 'global/reducers/auth';

import { colors, themeColors } from 'theme';
import check from 'assets/svg/check-green.svg';

import backButton from 'assets/svg/arrow-black.svg';
import {
  makeSelectTextMessagesSize,
  makeSelectAllLoaders,
} from 'global/reducers/textMessages';
import { redirectToPreview } from 'containers/AnswerSessionPage/actions';
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
  if (path.includes('/generated-reports'))
    return formatMessage(messages.generatedReports);
  if (path.includes('/sms-messaging'))
    return formatMessage(messages.smsMessaging);
  return formatMessage(messages.sharing);
};

const InterventionNavbar = ({
  session: {
    name,
    reportTemplatesCount,
    smsPlansCount,
    generatedReportCount,
    interventionOwnerId,
  },
  reportsLoaders: { updateReportTemplateLoading },
  textLoaders,
  updateSessionName,
  intl: { formatMessage },
  location: { pathname },
  questionsLength,
  selectedQuestion,
  interventionEditing,
  questionGroupsEditing,
  interventionStatus,
  match: { params },
  redirectToPreviewAction,
  textMessagesCount,
  generatedReportsCount,
  userId,
}) => {
  const { interventionId, sessionId } = params;

  const canAccessGeneratedReports = interventionOwnerId === userId;

  useInjectSaga({ key: 'editSession', saga: editSessionSaga });
  const [tabActive, setTabActive] = useState(
    getActiveTab(pathname, formatMessage),
  );

  const [currentReportsCount, setCurrentReportsCount] = useState(
    generatedReportsCount,
  );

  useEffect(() => {
    if (
      generatedReportsCount !== 0 &&
      generatedReportsCount > currentReportsCount
    )
      setCurrentReportsCount(generatedReportsCount);
  }, [generatedReportsCount]);

  useEffect(() => {
    setTabActive(getActiveTab(pathname, formatMessage));
  }, [pathname]);

  const previewDisabled = !questionsLength || !canPreview(interventionStatus);

  const editingPossible = canEdit(interventionStatus);

  const textMessagesCountValue = textMessagesCount || smsPlansCount || '0';

  const generatedReportsCountValue =
    generatedReportCount || currentReportsCount || '0';

  const isSaving =
    questionGroupsEditing ||
    interventionEditing ||
    updateReportTemplateLoading ||
    textLoaders;

  const handleRedirect = () =>
    redirectToPreviewAction(interventionId, sessionId, selectedQuestion);

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
          onFocus={selectInputText}
          maxWidth={280}
          autoComplete="off"
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
              <Row style={{ lineHeight: 'normal' }} align="end">
                {formatMessage(messages.reportTemplates)}
                <Circle
                  bg={themeColors.secondary}
                  color={colors.white}
                  size="20px"
                  child={reportTemplatesCount ?? 0}
                  fontSize={11}
                  ml={5}
                />
              </Row>
            </StyledLink>
          }
        />
        {canAccessGeneratedReports && (
          <div
            linkMatch={formatMessage(messages.generatedReports)}
            renderAsLink={
              <StyledLink
                to={`/interventions/${interventionId}/sessions/${sessionId}/generated-reports`}
              >
                <Row align="end">
                  {formatMessage(messages.generatedReports)}
                  <Circle
                    bg={themeColors.secondary}
                    color={colors.white}
                    child={generatedReportsCountValue}
                    size="20px"
                    fontSize={11}
                    ml={5}
                  />
                </Row>
              </StyledLink>
            }
          />
        )}
        <div
          linkMatch={formatMessage(messages.smsMessaging)}
          renderAsLink={
            <StyledLink
              to={`/interventions/${interventionId}/sessions/${sessionId}/sms-messaging`}
            >
              <Row align="end">
                {formatMessage(messages.smsMessaging)}
                <Circle
                  bg={themeColors.secondary}
                  color={colors.white}
                  size="20px"
                  fontSize={11}
                  ml={5}
                  child={textMessagesCountValue}
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
          previewDisabled={previewDisabled}
          text={formatMessage(messages.previewCurrent)}
          handleClick={handleRedirect}
        />
      </Box>
    </Row>
  );
};

InterventionNavbar.propTypes = {
  session: PropTypes.shape({
    name: PropTypes.string,
    reportTemplatesCount: PropTypes.number,
    smsPlansCount: PropTypes.number,
    id: PropTypes.string,
    interventionOwnerId: PropTypes.string,
    generatedReportCount: PropTypes.number,
  }),
  updateSessionName: PropTypes.func,
  intl: PropTypes.shape(IntlShape),
  location: PropTypes.object,
  questionsLength: PropTypes.number,
  selectedQuestion: PropTypes.string,
  interventionEditing: PropTypes.bool,
  textLoaders: PropTypes.bool,
  questionGroupsEditing: PropTypes.bool,
  match: PropTypes.object,
  interventionStatus: PropTypes.string,
  userId: PropTypes.string,
  reportsLoaders: PropTypes.object,
  redirectToPreviewAction: PropTypes.func,
  textMessagesCount: PropTypes.number,
  generatedReportsCount: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  session: makeSelectSession(),
  questionsLength: makeSelectQuestionsLength(),
  selectedQuestion: makeSelectSelectedQuestionId(),
  interventionEditing: makeSelectSessionEditLoader(),
  questionGroupsEditing: makeSelectQuestionGroupsLoader(),
  reportsLoaders: makeSelectReportTemplatesLoaders(),
  interventionStatus: makeSelectInterventionStatus(),
  textMessagesCount: makeSelectTextMessagesSize(),
  textLoaders: makeSelectAllLoaders(),
  generatedReportsCount: makeSelectReportsSize(),
  userId: makeSelectUserId(),
});

const mapDispatchToProps = {
  updateSessionName: editSessionRequest,
  redirectToPreviewAction: redirectToPreview,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(InterventionNavbar);
