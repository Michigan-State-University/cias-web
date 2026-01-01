import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, IntlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useInjectSaga } from 'redux-injectors';

import { RoutePath } from 'global/constants';

import { parametrizeRoutePath } from 'utils/router';

import Row from 'components/Row';
import Tabs from 'components/Tabs';
import { StyledInput } from 'components/Input/StyledInput';
import { selectInputText } from 'components/Input/utils';
import Spinner from 'components/Spinner';
import PreviewButton from 'components/PreviewButton';
import Img from 'components/Img';
import Box from 'components/Box';
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
  makeSelectSessionLanguageCode,
} from 'global/reducers/session';
import { makeSelectReportsSize } from 'global/reducers/generatedReports';
import { makeSelectQuestionGroupsLoader } from 'global/reducers/questionGroups';
import { makeSelectReportTemplatesLoaders } from 'global/reducers/reportTemplates';

import { themeColors } from 'theme';
import check from 'assets/svg/check-green.svg';

import backButton from 'assets/svg/arrow-black.svg';
import {
  makeSelectTextMessagesSize,
  makeSelectAllLoaders,
} from 'global/reducers/textMessages';
import { redirectToPreview } from 'containers/AnswerSessionPage/actions';
import {
  makeSelectCanCurrentUserAccessParticipantsData,
  makeSelectEditingPossible,
  makeSelectInterventionStatus,
} from 'global/reducers/intervention';
import { canPreview } from 'models/Status/statusPermissions';
import { SessionTypes } from 'models/Session';
import messages from './messages';
import {
  StyledLink,
  SaveInfoContainer,
  SavingContainer,
  CheckBackground,
  StyledCircle,
} from './styled';

// eslint-disable-next-line no-unused-vars
const TabItem = ({ renderAsLink, linkMatch, children }) => children || null;

TabItem.propTypes = {
  renderAsLink: PropTypes.node,
  linkMatch: PropTypes.string,
  children: PropTypes.node,
};

const getActiveTab = (path, formatMessage) => {
  if (path.includes('/edit')) return formatMessage(messages.content);
  if (path.includes('/settings')) return formatMessage(messages.settings);
  if (path.includes('/report-templates'))
    return formatMessage(messages.reportTemplates);
  if (path.includes('/generated-reports'))
    return formatMessage(messages.generatedReports);
  if (path.includes('/sms-messaging'))
    return formatMessage(messages.smsMessaging);
  if (path.includes('/map')) return formatMessage(messages.sessionMap);
  return formatMessage(messages.sharing);
};

const InterventionNavbar = ({
  session: {
    name,
    reportTemplatesCount,
    smsPlansCount,
    generatedReportCount,
    type,
  },
  reportsLoaders: {
    updateReportTemplateLoading,
    uploadReportTemplateLogoLoading,
    deleteReportTemplateLogoLoading,
    uploadCoverLetterCustomLogoLoading,
    deleteCoverLetterCustomLogoLoading,
  },
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
  canAccessParticipantsData,
  editingPossible,
  sessionLanguageCode,
}) => {
  const { interventionId, sessionId } = params;

  const isClassicSession = type === SessionTypes.CLASSIC_SESSION;

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

  const previewDisabled =
    !questionsLength || !canPreview(interventionStatus) || !isClassicSession;

  const textMessagesCountValue = smsPlansCount ?? textMessagesCount ?? '0';

  const generatedReportsCountValue =
    generatedReportCount ?? currentReportsCount ?? '0';

  const isSaving =
    questionGroupsEditing ||
    interventionEditing ||
    updateReportTemplateLoading ||
    uploadReportTemplateLogoLoading ||
    deleteReportTemplateLogoLoading ||
    uploadCoverLetterCustomLogoLoading ||
    deleteCoverLetterCustomLogoLoading ||
    textLoaders;

  const handleRedirect = () =>
    redirectToPreviewAction(
      interventionId,
      sessionId,
      selectedQuestion,
      sessionLanguageCode,
    );

  return (
    <Row align="center" justify="between" width="100%" mr={35}>
      <Row align="center">
        <ActionIcon
          to={parametrizeRoutePath(RoutePath.INTERVENTION_DETAILS, {
            interventionId,
          })}
          iconSrc={backButton}
          ariaText={formatMessage(messages.goBackToDetails)}
        />

        <StyledInput
          disabled={!editingPossible}
          px={12}
          py={6}
          width="400px"
          value={name}
          fontSize={23}
          placeholder={formatMessage(messages.placeholder)}
          onBlur={(val) =>
            updateSessionName({ path: 'name', value: val }, ['name'])
          }
          onFocus={selectInputText}
          maxWidth={280}
          autoComplete="off"
          data-cy="session-name-input"
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
        <TabItem
          renderAsLink={
            <StyledLink
              to={parametrizeRoutePath(RoutePath.EDIT_SESSION, {
                interventionId,
                sessionId,
              })}
            >
              {formatMessage(messages.content)}
            </StyledLink>
          }
        />
        <TabItem
          renderAsLink={
            <StyledLink
              to={parametrizeRoutePath(RoutePath.SESSION_SETTINGS, {
                interventionId,
                sessionId,
              })}
            >
              {formatMessage(messages.settings)}
            </StyledLink>
          }
        />
        {isClassicSession && (
          <TabItem
            linkMatch={formatMessage(messages.reportTemplates)}
            renderAsLink={
              <StyledLink
                to={parametrizeRoutePath(RoutePath.REPORT_TEMPLATES, {
                  interventionId,
                  sessionId,
                })}
              >
                <Row style={{ lineHeight: 'normal' }} align="end">
                  {formatMessage(messages.reportTemplates)}
                  <StyledCircle
                    bg={themeColors.secondary}
                    size="20px"
                    child={reportTemplatesCount ?? 0}
                    fontSize={11}
                    ml={5}
                  />
                </Row>
              </StyledLink>
            }
          />
        )}
        {canAccessParticipantsData && isClassicSession && (
          <TabItem
            linkMatch={formatMessage(messages.generatedReports)}
            renderAsLink={
              <StyledLink
                to={parametrizeRoutePath(RoutePath.GENERATED_REPORTS, {
                  interventionId,
                  sessionId,
                })}
              >
                <Row align="end">
                  {formatMessage(messages.generatedReports)}
                  <StyledCircle
                    bg={themeColors.secondary}
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
        {isClassicSession && (
          <TabItem
            linkMatch={formatMessage(messages.smsMessaging)}
            renderAsLink={
              <StyledLink
                to={parametrizeRoutePath(RoutePath.TEXT_MESSAGES, {
                  interventionId,
                  sessionId,
                })}
              >
                <Row align="end">
                  {formatMessage(messages.smsMessaging)}
                  <StyledCircle
                    bg={themeColors.secondary}
                    size="20px"
                    fontSize={11}
                    ml={5}
                    child={textMessagesCountValue}
                  />
                </Row>
              </StyledLink>
            }
          />
        )}
        {isClassicSession && (
          <TabItem
            renderAsLink={
              <StyledLink
                to={parametrizeRoutePath(RoutePath.SESSION_MAP, {
                  interventionId,
                  sessionId,
                })}
              >
                {formatMessage(messages.sessionMap)}
              </StyledLink>
            }
          />
        )}
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
                <Img src={check} role="presentation" />
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
    type: PropTypes.string,
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
  reportsLoaders: PropTypes.object,
  redirectToPreviewAction: PropTypes.func,
  textMessagesCount: PropTypes.number,
  generatedReportsCount: PropTypes.number,
  canAccessParticipantsData: PropTypes.bool,
  editingPossible: PropTypes.bool,
  sessionLanguageCode: PropTypes.string,
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
  canAccessParticipantsData: makeSelectCanCurrentUserAccessParticipantsData(),
  editingPossible: makeSelectEditingPossible(),
  sessionLanguageCode: makeSelectSessionLanguageCode(),
});

const mapDispatchToProps = {
  updateSessionName: editSessionRequest,
  redirectToPreviewAction: redirectToPreview,
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(
  InterventionNavbar,
);
