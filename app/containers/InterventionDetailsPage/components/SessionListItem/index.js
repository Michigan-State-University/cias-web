/**
 *
 * SessionListItem
 *
 */

import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Draggable } from 'react-beautiful-dnd';
import { useHistory } from 'react-router-dom';

import Row from 'components/Row';
import Column from 'components/Column';
import Dropdown from 'components/Dropdown';
import Divider from 'components/Divider';
import StyledLink from 'components/StyledLink';
import Text from 'components/Text';
import Tooltip from 'components/Tooltip';
import H2 from 'components/H2';
import Img from 'components/Img';
import Box from 'components/Box';
import { VIEWS } from 'components/CopyModal/Components';
import CopyModal from 'components/CopyModal';
import Badge from 'components/Badge';
import BadgeInput from 'components/Input/BadgeInput';
import Input from 'components/Input/StyledInput';

import { SHARE_IDS } from 'containers/SettingsPanel/utils';

import { numericValidator, variableNameValidator } from 'utils/validators';
import globalMessages from 'global/i18n/globalMessages';

import copy from 'assets/svg/copy.svg';
import bin from 'assets/svg/bin-no-bg.svg';
import mail from 'assets/svg/pink-mail.svg';
import mailDisabled from 'assets/svg/pink-mail-disabled.svg';
import { colors, themeColors } from 'theme';

import { InterventionType } from 'models/Intervention/InterventionDto';
import SessionSchedule from '../SessionSchedule';
import messages from './messages';
import { ToggleableBox, StyledRow, SessionIndex } from './styled';
import SessionBranching from '../SessionBranching';

const WCAG_ARIA_LABEL_ID = 'estimate-time-label';

function SessionListItem({
  session,
  index,
  isSelected,
  handleInviteParticipantsClick,
  intl: { formatMessage },
  nextSessionName,
  handleCopySession,
  disabled,
  sharingPossible,
  status,
  deletionPossible,
  handleDeleteSession,
  handleExternalCopySession,
  sharedTo,
  editSession,
  interventionType,
}) {
  const history = useHistory();

  const isModuleIntervention = interventionType !== InterventionType.DEFAULT;

  const [isHovered, setIsHovered] = useState(false);
  const [copyOpen, setCopyOpen] = useState(false);
  const {
    id,
    name,
    intervention_id: interventionId,
    formula,
    schedule,
    schedule_at: scheduleAt,
    schedule_payload: schedulePayload,
    settings,
    report_templates_count: reportTemplatesCount,
    days_after_date_variable_name: daysAfterDateVariableName,
    variable,
    estimated_time: estimatedTime,
    estimatedTime: updatedEstimatedTime,
  } = session || {};

  const options = [
    {
      id: 'copy',
      label: formatMessage(messages.copy),
      icon: copy,
      action: () => setCopyOpen(true),
      color: colors.bluewood,
    },
    {
      id: 'duplicate',
      label: formatMessage(messages.duplicate),
      icon: copy,
      action: () => handleCopySession(id),
      color: colors.bluewood,
      disabled,
    },
    {
      id: 'delete',
      label: formatMessage(messages.delete),
      icon: bin,
      action: () => handleDeleteSession(id),
      color: colors.bluewood,
      disabled: !deletionPossible,
    },
  ];

  const closeCopyModal = () => setCopyOpen(false);

  const externalCopy = (params) =>
    handleExternalCopySession({ ...params, sessionId: id });

  const goToReportTemplates = (event) => {
    event.preventDefault();

    const url = `/interventions/${interventionId}/sessions/${id}/report-templates`;

    history.push(url);
  };

  const estimatedTimeValue = useMemo(() => {
    if (estimatedTime || estimatedTime === 0) return `${estimatedTime}`;

    if (updatedEstimatedTime || updatedEstimatedTime === 0)
      return `${updatedEstimatedTime}`;

    return '';
  }, [estimatedTime, updatedEstimatedTime]);

  const handleUpdateVariable = (value) => {
    editSession({ path: 'variable', value }, ['variable'], id);
  };

  const handleUpdateEstimatedTime = (value) => {
    editSession(
      { path: 'estimated_time', value: +value },
      ['estimated_time'],
      id,
    );
  };

  const preventVariableInputRedirect = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const isSchedulingPossible =
    sharedTo !== SHARE_IDS.anyoneWithTheLink &&
    interventionType !== InterventionType.FLEXIBLE &&
    index !== 0;

  const isSessionBranchingPossible =
    interventionType === InterventionType.DEFAULT;

  return (
    <Draggable
      isDragDisabled={disabled}
      key={`accordion-${index}`}
      draggableId={`accordion-${index}`}
      index={index}
    >
      {(provided) => (
        <Box
          width="100%"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <ToggleableBox
            isSelected={isSelected}
            isHovered={isHovered}
            role="group"
            aria-label={formatMessage(messages.wcagDescription, { name })}
          >
            <Row py={21} px={16} align="center" justify="between">
              <CopyModal
                visible={copyOpen}
                onClose={closeCopyModal}
                copyAction={externalCopy}
                disableQuestionGroupCopy
                disableSessionCopy
                pasteText={formatMessage(messages.pasteSession)}
                defaultView={VIEWS.INTERVENTION}
              />
              <StyledRow align="center" justify="between" width="100%">
                <StyledLink
                  data-cy={`enter-session-${index}`}
                  to={`/interventions/${interventionId}/sessions/${id}/edit`}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  width="100%"
                  justify="start"
                >
                  <SessionIndex>{index + 1}</SessionIndex>
                  <Column px={15}>
                    <H2>{name}</H2>
                    <BadgeInput
                      mt={5}
                      disabled={disabled}
                      textAlign="center"
                      validator={variableNameValidator}
                      placeholder={formatMessage(
                        globalMessages.variables.variableNamePlaceholder,
                      )}
                      value={variable}
                      color={colors.jungleGreen}
                      onBlur={handleUpdateVariable}
                      onClick={preventVariableInputRedirect}
                      autoComplete="off"
                    />
                    <Badge
                      mt={5}
                      bg={themeColors.secondary}
                      onClick={goToReportTemplates}
                    >
                      {formatMessage(messages.reportsCount, {
                        count: reportTemplatesCount ?? 0,
                      })}
                    </Badge>
                  </Column>
                </StyledLink>
              </StyledRow>
              <Row width="40%" xs={1} align="center" justify="around">
                <Tooltip
                  id={`tooltip-${id}`}
                  visible={!sharingPossible}
                  content={formatMessage(
                    messages[`tooltip-${status}`] ?? messages.tooltip,
                  )}
                >
                  {!isModuleIntervention && (
                    <Row
                      justify="end"
                      disabled={!sharingPossible}
                      onClick={handleInviteParticipantsClick}
                      minWidth={110}
                    >
                      <Text
                        fontSize={13}
                        clickable
                        disabled={!sharingPossible}
                        textAlign="center"
                        fontWeight="bold"
                        color={themeColors.secondary}
                        mr={5}
                      >
                        {formatMessage(messages.inviteLabel)}
                      </Text>
                      <Img
                        clickable
                        disabled={!sharingPossible}
                        src={sharingPossible ? mail : mailDisabled}
                        alt="emails"
                        data-cy={`share-session-modal-open-button-${index}`}
                      />
                    </Row>
                  )}
                </Tooltip>
                <Box mb={8}>
                  <Dropdown options={options} clickable id={id} />
                </Box>
              </Row>
            </Row>

            <Row px={62} mb={20}>
              <Divider />
            </Row>

            {interventionType !== InterventionType.DEFAULT && (
              <Row px={62} mb={20} display="flex" align="center">
                <Text id={WCAG_ARIA_LABEL_ID}>
                  {formatMessage(messages.estimateTime)}
                </Text>
                <Input
                  transparent={false}
                  aria-labelledby={WCAG_ARIA_LABEL_ID}
                  value={estimatedTimeValue}
                  onBlur={handleUpdateEstimatedTime}
                  mx={5}
                  width={60}
                  validator={numericValidator}
                  placeholder="0"
                />
                <Text>{formatMessage(messages.min)}</Text>
              </Row>
            )}
            {isSchedulingPossible && (
              <Row px={62}>
                <SessionSchedule
                  disabled={disabled}
                  sessionId={id}
                  selectedScheduleOption={schedule}
                  scheduleAt={scheduleAt}
                  schedulePayload={schedulePayload}
                  daysAfterDateVariableName={daysAfterDateVariableName}
                  session={session}
                />
              </Row>
            )}
            {isSessionBranchingPossible && (
              <SessionBranching
                disabled={disabled}
                formula={formula}
                session={session}
                nextSessionName={nextSessionName}
                status={settings.formula}
              />
            )}
          </ToggleableBox>
        </Box>
      )}
    </Draggable>
  );
}

SessionListItem.propTypes = {
  session: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  isSelected: PropTypes.bool,
  handleInviteParticipantsClick: PropTypes.func,
  nextSessionName: PropTypes.string,
  intl: PropTypes.object,
  handleCopySession: PropTypes.func,
  disabled: PropTypes.bool,
  sharingPossible: PropTypes.bool,
  deletionPossible: PropTypes.bool,
  handleDeleteSession: PropTypes.func,
  handleExternalCopySession: PropTypes.func,
  status: PropTypes.string,
  sharedTo: PropTypes.string,
  editSession: PropTypes.func,
  interventionType: PropTypes.string,
};

export default injectIntl(SessionListItem);
