/**
 *
 * InterventionListItem
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Draggable } from 'react-beautiful-dnd';

import Row from 'components/Row';
import H2 from 'components/H2';
import Dropdown from 'components/Dropdown';
import Divider from 'components/Divider';

import copy from 'assets/svg/copy.svg';
import mail from 'assets/svg/pink-mail.svg';
import mailDisabled from 'assets/svg/pink-mail-disabled.svg';
import { colors } from 'theme';
import appStages from 'global/appStages';

import Img from 'components/Img';
import Box from 'components/Box';
import InterventionSchedule from '../InterventionSchedule';
import messages from './messages';
import {
  InterventionIndex,
  ToggleableBox,
  StyledRow,
  StyledLink,
} from './styled';
import InterventionBranching from '../InterventionBranching';

function InterventionListItem({
  intervention,
  index,
  isSelected,
  handleClick,
  intl: { formatMessage },
  nextInterventionName,
  handleCopyIntervention,
  disabled,
  sharingPossible,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const {
    id,
    name,
    problem_id: problemId,
    formula,
    schedule,
    schedule_at: scheduleAt,
    schedule_payload: schedulePayload,
    settings,
  } = intervention || {};

  const options = [
    {
      id: 'duplicate',
      label: formatMessage(messages.duplicate),
      icon: copy,
      action: () => handleCopyIntervention(id),
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
              <StyledRow align="center" justify="between">
                <StyledLink
                  data-cy={`enter-intervention-${index}`}
                  to={`/interventions/${problemId}/sessions/${id}/edit`}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <InterventionIndex>{index + 1}</InterventionIndex>
                  <H2 ml={15}>{name}</H2>
                </StyledLink>
              </StyledRow>
              <Row width={80} xs={1} align="center" justify="between">
                <Img
                  clickable
                  disabled={!sharingPossible}
                  src={sharingPossible ? mail : mailDisabled}
                  onClick={handleClick}
                  alt="emails"
                  data-cy={`share-session-modal-open-button-${index}`}
                />
                {process.env.APP_STAGE === appStages.dev.id && (
                  <Box mb={8}>
                    <Dropdown
                      disabled={disabled}
                      options={options}
                      clickable
                      id={id}
                    />
                  </Box>
                )}
              </Row>
            </Row>
            <Row px={62} mb={20}>
              <Divider />
            </Row>
            {index !== 0 && (
              <Row px={62}>
                <InterventionSchedule
                  disabled={disabled}
                  interventionId={id}
                  selectedScheduleOption={schedule}
                  scheduleAt={scheduleAt}
                  schedulePayload={schedulePayload}
                />
              </Row>
            )}
            <InterventionBranching
              disabled={disabled}
              formula={formula}
              intervention={intervention}
              nextInterventionName={nextInterventionName}
              status={settings.formula}
            />
          </ToggleableBox>
        </Box>
      )}
    </Draggable>
  );
}

InterventionListItem.propTypes = {
  intervention: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  isSelected: PropTypes.bool,
  handleClick: PropTypes.func,
  nextInterventionName: PropTypes.string,
  intl: PropTypes.object,
  handleCopyIntervention: PropTypes.func,
  disabled: PropTypes.bool,
  sharingPossible: PropTypes.bool,
};

export default injectIntl(InterventionListItem);
