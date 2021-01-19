/**
 *
 * SessionListItem
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Draggable } from 'react-beautiful-dnd';

import Row from 'components/Row';
import Dropdown from 'components/Dropdown';
import Divider from 'components/Divider';
import StyledLink from 'components/StyledLink';
import Text from 'components/Text';
import Tooltip from 'components/Tooltip';
import H2 from 'components/H2';

import copy from 'assets/svg/copy.svg';
import mail from 'assets/svg/pink-mail.svg';
import mailDisabled from 'assets/svg/pink-mail-disabled.svg';
import { colors, themeColors } from 'theme';

import Img from 'components/Img';
import Box from 'components/Box';
import SessionSchedule from '../SessionSchedule';
import messages from './messages';
import { ToggleableBox, StyledRow, SessionIndex } from './styled';
import SessionBranching from '../SessionBranching';

function SessionListItem({
  session,
  index,
  isSelected,
  handleClick,
  intl: { formatMessage },
  nextSessionName,
  handleCopySession,
  disabled,
  sharingPossible,
  status,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const {
    id,
    name,
    intervention_id: interventionId,
    formula,
    schedule,
    schedule_at: scheduleAt,
    schedule_payload: schedulePayload,
    settings,
  } = session || {};

  const options = [
    {
      id: 'duplicate',
      label: formatMessage(messages.duplicate),
      icon: copy,
      action: () => handleCopySession(id),
      color: colors.bluewood,
    },
  ];

  return (
    <Draggable
      isDragDisabled={disabled}
      key={`accordion-${index}`}
      draggableId={`accordion-${index}`}
      index={index}
    >
      {provided => (
        <Box
          width="100%"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <ToggleableBox isSelected={isSelected} isHovered={isHovered}>
            <Row py={21} px={16} align="center" justify="between">
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
                  <H2 ml={15}>{name}</H2>
                </StyledLink>
              </StyledRow>
              <Row width="30%" xs={1} align="center" justify="around">
                <Tooltip
                  id={`tooltip-${id}`}
                  visible={!sharingPossible}
                  content={formatMessage(
                    messages[`tooltip-${status}`] ?? messages.tooltip,
                  )}
                >
                  <Row justify="end" onClick={handleClick} minWidth={110}>
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
                </Tooltip>
                <Box mb={8}>
                  <Dropdown
                    disabled={disabled}
                    options={options}
                    clickable
                    id={id}
                  />
                </Box>
              </Row>
            </Row>
            <Row px={62} mb={20}>
              <Divider />
            </Row>
            {index !== 0 && (
              <Row px={62}>
                <SessionSchedule
                  disabled={disabled}
                  sessionId={id}
                  selectedScheduleOption={schedule}
                  scheduleAt={scheduleAt}
                  schedulePayload={schedulePayload}
                />
              </Row>
            )}
            <SessionBranching
              disabled={disabled}
              formula={formula}
              session={session}
              nextSessionName={nextSessionName}
              status={settings.formula}
            />
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
  handleClick: PropTypes.func,
  nextSessionName: PropTypes.string,
  intl: PropTypes.object,
  handleCopySession: PropTypes.func,
  disabled: PropTypes.bool,
  sharingPossible: PropTypes.bool,
  status: PropTypes.string,
};

export default injectIntl(SessionListItem);
