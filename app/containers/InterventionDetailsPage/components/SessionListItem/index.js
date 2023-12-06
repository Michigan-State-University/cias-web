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
import { Markup } from 'interweave';
import dayjs from 'dayjs';

import Row from 'components/Row';
import Column from 'components/Column';
import Dropdown from 'components/Dropdown';
import Divider from 'components/Divider';
import StyledLink from 'components/StyledLink';
import Text from 'components/Text';
import H2 from 'components/H2';
import Box from 'components/Box';
import { VIEWS } from 'components/CopyModal/Components';
import CopyModal from 'components/CopyModal';
import Badge from 'components/Badge';
import BadgeInput from 'components/Input/BadgeInput';
import Input from 'components/Input/StyledInput';
import {
  useHenryFordBranchingInfoModal,
  HenryFordBranchingInfoType,
} from 'components/HenryFordBrachingInfoModal';

import globalMessages from 'global/i18n/globalMessages';
import { RoutePath } from 'global/constants';

import { numericValidator, variableNameValidator } from 'utils/validators';
import { parametrizeRoutePath } from 'utils/router';

import duplicateInternally from 'assets/svg/duplicate-internally.svg';
import copy from 'assets/svg/copy.svg';
import bin from 'assets/svg/bin-no-bg.svg';
import { colors, themeColors } from 'theme';

import { InterventionType } from 'models/Intervention';

import SessionSchedule from '../SessionSchedule';
import messages from './messages';
import { ToggleableBox, SessionIndex } from './styled';
import SessionBranching from '../SessionBranching';
import { formatSessionName } from './utils';
import { Alert, AlertType } from '../../../../components/Alert';

const WCAG_ARIA_LABEL_ID = 'estimate-time-label';

function SessionListItem({
  session,
  index,
  isSelected,
  intl: { formatMessage },
  nextSessionName,
  handleCopySession,
  disabled,
  deletionPossible,
  handleDeleteSession,
  handleExternalCopySession,
  sharedTo,
  editSession,
  interventionType,
  hfhsAccess,
}) {
  const history = useHistory();

  const [isHovered, setIsHovered] = useState(false);
  const [copyOpen, setCopyOpen] = useState(false);

  const {
    id,
    name,
    interventionId,
    formulas,
    schedule,
    scheduleAt,
    schedulePayload,
    settings,
    reportTemplatesCount,
    daysAfterDateVariableName,
    variable,
    estimatedTime,
    updatedEstimatedTime,
    autocloseEnabled,
    autocloseAt,
  } = session || {};

  const {
    Modal: HenryFordBranchingInfoModal,
    openModal: openHenryFordBranchingInfoModal,
  } = useHenryFordBranchingInfoModal(HenryFordBranchingInfoType.SESSION, () =>
    setCopyOpen(true),
  );

  const onDuplicateInternally = () => {
    if (hfhsAccess) {
      openHenryFordBranchingInfoModal();
    } else {
      setCopyOpen(true);
    }
  };

  const options = [
    {
      id: 'duplicate',
      label: formatMessage(messages.duplicateHere),
      icon: copy,
      action: () => handleCopySession(id),
      color: colors.bluewood,
      disabled,
    },
    {
      id: 'copy',
      label: formatMessage(messages.copy),
      icon: duplicateInternally,
      action: onDuplicateInternally,
      color: colors.bluewood,
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

    const url = parametrizeRoutePath(RoutePath.REPORT_TEMPLATES, {
      interventionId,
      sessionId: id,
    });

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
    interventionType !== InterventionType.FLEXIBLE && index !== 0;

  const isSessionBranchingPossible =
    interventionType === InterventionType.DEFAULT;

  const isSessionClosed =
    autocloseEnabled && autocloseAt && !dayjs().isBefore(dayjs(autocloseAt));

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
            <Row pt={24} pb={16} px={24} align="center" justify="between">
              <HenryFordBranchingInfoModal />
              <CopyModal
                visible={copyOpen}
                onClose={closeCopyModal}
                copyAction={externalCopy}
                disableQuestionGroupCopy
                disableSessionCopy
                disableCurrentInterventionCopy
                pasteText={formatMessage(messages.pasteSession)}
                defaultView={VIEWS.INTERVENTION}
              />
              <Row align="center" justify="between" width="100%">
                <StyledLink
                  data-cy={`enter-session-${index}`}
                  to={parametrizeRoutePath(RoutePath.EDIT_SESSION, {
                    interventionId,
                    sessionId: id,
                  })}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  width="100%"
                  justify="start"
                >
                  <SessionIndex isSessionClosed={isSessionClosed}>
                    {index + 1}
                  </SessionIndex>
                  <Column px={15}>
                    <Markup
                      attributes={{
                        dir: 'auto',
                      }}
                      content={formatSessionName(name)}
                      tagName={H2}
                    />
                    <Row marginBlockStart={5} gap={8}>
                      <BadgeInput
                        disabled={disabled}
                        textAlign="center"
                        validator={variableNameValidator}
                        placeholder={formatMessage(
                          globalMessages.variableNamePlaceholder,
                        )}
                        value={variable}
                        color={colors.jungleGreen}
                        onBlur={handleUpdateVariable}
                        onClick={preventVariableInputRedirect}
                        autoComplete="off"
                      />
                      <Badge
                        bg={themeColors.secondary}
                        onClick={goToReportTemplates}
                      >
                        {formatMessage(messages.reportsCount, {
                          count: reportTemplatesCount ?? 0,
                        })}
                      </Badge>
                    </Row>
                  </Column>
                </StyledLink>
              </Row>
              <Box mb={8}>
                <Dropdown
                  id={`session-list-item-options-${id}`}
                  options={options}
                  clickable
                />
              </Box>
            </Row>

            {isSessionClosed && (
              <Alert
                content={formatMessage(messages.sessionClosedAlertContent)}
                type={AlertType.WARNING_LIGHT}
                noIcon
                centered
                mx={24}
                mb={16}
                py={8}
                contentProps={{
                  fontSize: 15,
                  fontWeight: 'medium',
                }}
              />
            )}

            <Row px={24} mb={16}>
              <Divider />
            </Row>

            {interventionType !== InterventionType.DEFAULT && (
              <Row px={24} mb={24} display="flex" align="center">
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
                  disabled={disabled}
                />
                <Text>{formatMessage(messages.min)}</Text>
              </Row>
            )}
            {isSchedulingPossible && (
              <Row px={24}>
                <SessionSchedule
                  disabled={disabled}
                  sessionId={id}
                  selectedScheduleOption={schedule}
                  scheduleAt={scheduleAt}
                  schedulePayload={schedulePayload}
                  daysAfterDateVariableName={daysAfterDateVariableName}
                  session={session}
                  sharedTo={sharedTo}
                />
              </Row>
            )}
            {isSessionBranchingPossible && (
              <SessionBranching
                disabled={disabled}
                formulas={formulas}
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
  nextSessionName: PropTypes.string,
  intl: PropTypes.object,
  handleCopySession: PropTypes.func,
  disabled: PropTypes.bool,
  deletionPossible: PropTypes.bool,
  handleDeleteSession: PropTypes.func,
  handleExternalCopySession: PropTypes.func,
  sharedTo: PropTypes.string,
  editSession: PropTypes.func,
  interventionType: PropTypes.string,
  hfhsAccess: PropTypes.bool,
};

export default injectIntl(SessionListItem);
