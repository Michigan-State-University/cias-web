/**
 *
 * InterventionListItem
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import Row from 'components/Row';
import Column from 'components/Column';
import H2 from 'components/H2';
import Dropdown from 'components/Dropdown';
import Divider from 'components/Divider';

import copy from 'assets/svg/copy.svg';
import { colors } from 'theme';
import appStages from 'global/appStages';

import InterventionSchedule from '../InterventionSchedule';
import messages from './messages';
import { InterventionIndex, StyledLink, ToggleableBox } from './styled';
import InterventionBranching from '../InterventionBranching';

function InterventionListItem({
  intervention,
  index,
  isSelected,
  handleClick,
  intl: { formatMessage },
  nextInterventionName,
  handleCopyIntervention,
}) {
  const {
    id,
    name,
    problem_id: problemId,
    formula,
    schedule,
    schedule_at: scheduleAt,
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
    <ToggleableBox isSelected={isSelected} onClick={handleClick} clickable>
      <Row py={21} px={16} align="center" justify="between">
        <Column xs={1}>
          <InterventionIndex>{index + 1}</InterventionIndex>
        </Column>
        <Column pl={8} xs={10} width="100%">
          <StyledLink to={`/interventions/${problemId}/sessions/${id}/edit`}>
            <H2>{name}</H2>
          </StyledLink>
        </Column>
        {process.env.APP_STAGE === appStages.dev.id && (
          <Column xs={1} align="center">
            <Dropdown options={options} clickable id={id} />
          </Column>
        )}
      </Row>
      {index !== 0 && (
        <Row px={62}>
          <InterventionSchedule
            interventionId={id}
            selectedScheduleOption={schedule}
            scheduleAt={scheduleAt}
          />
        </Row>
      )}
      <Row px={62}>
        <Divider />
      </Row>
      <InterventionBranching
        formula={formula}
        id={id}
        nextInterventionName={nextInterventionName}
        status={settings.formula}
      />
    </ToggleableBox>
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
};

export default injectIntl(InterventionListItem);
